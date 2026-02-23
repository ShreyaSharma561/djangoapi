
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('blog/create/', views.create_blog, name='create_blog'),
    path('blog/<int:pk>/edit/', views.edit_blog, name='edit_blog'),
    path('posts/<int:id>/', views.blog_detail, name='blog_detail')
]

