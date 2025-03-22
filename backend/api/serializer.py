from api.models import User, Bid, Item, Auction, Review
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone_number', 'address', 'full_name', 'bio', 'image', 'verified')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Adding custom claims
        token['full_name'] = user.full_name
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
    
    # ✅ Serializer for Bid Model
class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'  # Includes 'item', 'bidder', 'bid_amount', 'bid_time'

# ✅ Serializer for Item Model (Optional, if you need item details)
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'  # Modify as needed

# ✅ Serializer for Auction Model
class AuctionSerializer(serializers.ModelSerializer):
    highest_bid = BidSerializer(read_only=True)  # Nested serializer for read-only display
    item = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all())  # Allow setting item

    class Meta:
        model = Auction
        fields = '__all__'  # Includes 'item', 'highest_bid', 'winner', 'auction_status'

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.CharField(source='reviewer.username', read_only=True)  # Get reviewer's username
    seller_name = serializers.CharField(source='seller.username', read_only=True)  # Get seller's username

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'reviewer_name', 'seller', 'seller_name', 'rating', 'review_text', 'review_date']
        read_only_fields = ['review_date']
