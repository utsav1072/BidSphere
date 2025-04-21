from api.models import User, Bid, Item, Auction, Review
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone_number', 'address', 'full_name', 'bio', 'image', 'verified', 'balance')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Adding custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['verified'] = user.verified
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')  # Remove password2 field
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    


# ✅ Serializer for Item Model (Optional, if you need item details)
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'  # Modify as needed


class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'

    def validate(self, data):
        """Ensure the bid amount is higher than the current price."""
        item = data['item']
        bid_amount = data['bid_amount']

        if bid_amount <= item.current_price:
            raise serializers.ValidationError({"bid_amount": "Bid must be higher than the current price."})

        return data

    def create(self, validated_data):
        """Create bid, update item's current price, and update auction's highest bid."""
        item = validated_data['item']
        bid = Bid.objects.create(**validated_data)
        
        # Update item's current price to the latest bid amount
        item.current_price = bid.bid_amount
        item.save()

        # Update the auction's highest bid
        try:
            auction = Auction.objects.get(item=item)
            auction.highest_bid = bid
            auction.save()
        except Auction.DoesNotExist:
            pass  # No auction found for the item

        return bid


# ✅ Serializer for Auction Model
class AuctionSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    highest_bid = serializers.PrimaryKeyRelatedField(queryset=Bid.objects.all(), allow_null=True)  # Nested serializer for read-only display
    class Meta:
        model = Auction
        fields = '__all__'  # Includes 'item', 'highest_bid', 'winner', 'auction_status'

    def create(self, validated_data):
        item_data = validated_data.pop('item')  # Extract item data
        starting_price = item_data.get('starting_price', 0)
        item_data['current_price'] = starting_price
        item = Item.objects.create(**item_data)  # Create Item object
        auction = Auction.objects.create(item=item, **validated_data)  # Create Auction object
        return auction

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.CharField(source='reviewer.username', read_only=True)  # Get reviewer's username
    seller_name = serializers.CharField(source='seller.username', read_only=True)  # Get seller's username

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'reviewer_name', 'seller', 'seller_name', 'rating', 'review_text', 'review_date']
        read_only_fields = ['review_date']


