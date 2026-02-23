from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'content',
            'category',
            'status',
            'featured_image',
            'created_at',
            'author_name'
        ]
