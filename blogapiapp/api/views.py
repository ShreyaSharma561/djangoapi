
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import BlogPost
from .serializers import BlogPostSerializer

class BlogPostViewSet(ModelViewSet):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return BlogPost.objects.all()
        return BlogPost.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


