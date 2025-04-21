from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    full_name = models.CharField(max_length=1000, default="Anonymous User")
    bio = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to="user_images",default = 'image.png' ,null=True)
    verified = models.BooleanField(default=False)
    balance = models.IntegerField(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class Category(models.Model):
    category_name = models.CharField(max_length=255, unique=True)
    ## description = models.TextField()

class Item(models.Model):
    id = models.AutoField(primary_key=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    bid_increment = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=50, choices=[('active', 'Active'), ('closed', 'Closed')])
    image_url = models.ImageField(upload_to="item_images",default = 'item_default.jpeg' ,null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Bid(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    bidder = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    bid_time = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    winner = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')])
    payment_date = models.DateTimeField(default=timezone.now)
    payment_method = models.CharField(max_length=100)

class Auction(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    highest_bid = models.ForeignKey(Bid, on_delete=models.SET_NULL, null=True, blank=True)
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    auction_status = models.CharField(max_length=50, choices=[('ongoing', 'Ongoing'), ('completed', 'Completed'), ('cancelled', 'Cancelled')])

class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_given')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_received')
    rating = models.IntegerField()
    review_text = models.TextField()
    review_date = models.DateTimeField(default=timezone.now)

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    added_on = models.DateTimeField(default=timezone.now)
    
