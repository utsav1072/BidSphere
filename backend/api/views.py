from django.shortcuts import render
from django.http import JsonResponse
from api.models import User, Category, Item, Watchlist, Bid, Auction, Review
from rest_framework import status

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, AuctionSerializer, ReviewSerializer, ItemSerializer, BidSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404






class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        user_profile = request.user.username
        userId = request.user.id
        name = user_profile if user_profile else 'Anonymous'  # Assuming 'full_name' is the username
        return Response({'name': name,'userId': userId}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        full_name = request.data.get('full_name')
        bio = request.data.get('bio')
        image = request.data.get('image')

        user_profile = request.user.profile
        if full_name:
            user_profile.full_name = full_name
        if bio:
            user_profile.bio = bio
        if image:
            user_profile.image = image

        user_profile.save()

        data = f'Profile Saved'
        return Response({'response': data}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Assuming you want only authenticated users to access this endpoint
def userProfile(request):
    if request.method == 'GET':
        user_profile = request.user.profile
        fullname = user_profile.full_name if user_profile else 'Anonymous'
        bio = user_profile.bio
        return Response({'fullname': fullname,'bio' : bio }, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def getCategory(request):
    if request.method == 'GET':
        categories = Category.objects.values_list('category_name', flat=True)
        return Response({'category_name': list(categories)}, status=status.HTTP_200_OK)

@api_view(['GET'])
def getItems(request):
    if request.method == 'GET':
        items = Item.objects.values('id', 'title', 'description', 'current_price', 'category__category_name', 'image_url')
        return Response({'items': list(items)}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getWatchlist(request):
    user_id = request.user.id
    watchlist_items = Watchlist.objects.filter(user_id=user_id).select_related('item')

    data = [
        {
            'id': entry.item.id,
            'title': entry.item.title,
            'description': entry.item.description,
            'current_price': entry.item.current_price,
            'category': entry.item.category.category_name if entry.item.category else None,
            'image_url': entry.item.image_url,
            'added_on': entry.added_on
        }
        for entry in watchlist_items
    ]

    return Response({'watchlist': data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_bids(request):
    user = request.user
    bids = Bid.objects.filter(bidder=user).select_related('item')

    data = [
        {
            'bid_id': bid.id,
            'item_id': bid.item.id,
            'item_title': bid.item.title,
            'bid_amount': bid.bid_amount,
            'bid_time': bid.bid_time
        }
        for bid in bids
    ]

    return Response({'bids': data}, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_all_auctions(request):
    auctions = Auction.objects.select_related('item', 'highest_bid', 'winner').all()
    serializer = AuctionSerializer(auctions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# ✅ 2. Get a Specific Auction by ID
@api_view(['GET'])
def get_auction(request, auction_id):
    try:
        auction = Auction.objects.select_related('item', 'highest_bid', 'winner').get(id=auction_id)
        serializer = AuctionSerializer(auction)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Auction.DoesNotExist:
        return Response({"error": "Auction not found"}, status=status.HTTP_404_NOT_FOUND)

# ✅ 3. Create a New Auction
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_auction(request):
    serializer = AuctionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ 4. Update an Auction (Status, Highest Bid, Winner)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_auction(request, auction_id):
    try:
        auction = Auction.objects.get(id=auction_id)
    except Auction.DoesNotExist:
        return Response({"error": "Auction not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = AuctionSerializer(auction, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ 5. Delete an Auction
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_auction(request, auction_id):
    try:
        auction = Auction.objects.get(id=auction_id)
        auction.delete()
        return Response({"message": "Auction deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Auction.DoesNotExist:
        return Response({"error": "Auction not found"}, status=status.HTTP_404_NOT_FOUND)


class SellerReviewsListView(generics.ListAPIView):
    serializer_class = ReviewSerializer 
    
    def get_queryset(self):
        seller_id = self.kwargs.get('seller_id')  # Get seller ID from the URL
        return Review.objects.filter(seller_id=seller_id)  # Fetch reviews for this seller
    
@api_view(["GET"])
def item_search_view(request):
    query = request.GET.get("q", "").strip()
    category = request.GET.get("category", "").strip()  
    seller = request.GET.get("seller","").strip()
    sort_by = request.GET.get("sort_by") 
    order = request.GET.get("order", "asc")  

    results = Item.objects.filter(title__icontains=query) if query else Item.objects.all()

    if category:
        results = results.filter(category__category_name__iexact=category) 
    if seller:
        results = results.filter(seller__username__iexact=seller) 

    
    if sort_by:
        if order == "desc":
            sort_by = f"-{sort_by}"  
        results = results.order_by(sort_by)

    serializer = ItemSerializer(results, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_bid(request):
    serializer = BidSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

