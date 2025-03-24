from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('category/', views.getCategory, name = 'category'),
    path('items/', views.getItems, name = 'items'),
    path('watchlist/', views.getWatchlist, name='get-watchlist'),
    path('user/bids/', views.get_user_bids, name='user-bids'),
    path('', views.getRoutes),
    path('auctions/', views.get_all_auctions, name='all-auctions'),
    path('auctions/<int:auction_id>/', views.get_auction, name='get-auction'),
    path('auctions/create/', views.create_auction, name='create-auction'),
    path('auctions/update/<int:auction_id>/', views.update_auction, name='update-auction'),
    path('auctions/delete/<int:auction_id>/', views.delete_auction, name='delete-auction'),
    path('reviews/seller/<int:seller_id>/', views.SellerReviewsListView.as_view(), name='seller-reviews'),
    path("items/search/", views.item_search_view, name="item_search"),
]