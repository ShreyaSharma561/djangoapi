from django.contrib.auth.decorators import login_required
from django.shortcuts import render


def dashboard(request):
    return render(request, 'frontend/dashboard.html')

@login_required
def create_blog(request):
    return render(request, 'frontend/create_blog.html')

@login_required
def edit_blog(request, pk):
    return render(request, 'frontend/edit_blog.html', {'post_id': pk})

def home(request):
    return render(request , 'frontend/home.html')
    

def blog_detail(request, id):
    return render(request, 'frontend/blog_detail.html', {'post_id': id})
