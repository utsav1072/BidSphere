from django.contrib import admin
from .models import User, Category, Item, Bid, Payment, Auction, Review, Watchlist

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'full_name', 'verified']
    list_editable = ['verified']
    search_fields = ['username', 'email', 'full_name']
    list_filter = ['verified']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['category_name']
    search_fields = ['category_name']

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'seller', 'starting_price', 'current_price', 'status']
    search_fields = ['title', 'seller__username']
    list_filter = ['status', 'category']

@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ['item', 'bidder', 'bid_amount', 'bid_time']
    search_fields = ['item__title', 'bidder__username']

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['winner', 'item', 'amount', 'payment_status', 'payment_date']
    list_filter = ['payment_status']
    search_fields = ['winner__username', 'item__title']

@admin.register(Auction)
class AuctionAdmin(admin.ModelAdmin):
    list_display = ['item', 'highest_bid', 'winner', 'auction_status']
    list_filter = ['auction_status']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['reviewer', 'seller', 'rating', 'review_date']
    list_filter = ['rating']

@admin.register(Watchlist)
class WatchlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'item', 'added_on']
