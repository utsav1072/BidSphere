from django.shortcuts import render
from django.http import JsonResponse
from api.models import User
from rest_framework import status

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer

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
    
