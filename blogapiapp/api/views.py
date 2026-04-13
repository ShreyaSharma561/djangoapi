
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import BlogPost
from rest_framework.authentication import TokenAuthentication
from .serializers import BlogPostSerializer

class BlogPostViewSet(ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        print("AUTH HEADER:", self.request.headers.get('Authorization'))
        print("USER:", self.request.user)
        print("AUTH:", self.request.auth)
        serializer.save(author=self.request.user)