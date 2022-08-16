from django.shortcuts import render
from .models import *

# Make function to operate Store Functionality
def store(request):
    products = Product.objects.all()
    context = {'products':products}
    return render(request, 'store/store.html',context)


# Make function to operate Cart Functionality
def cart(request):
    context = {}
    return render(request, 'store/cart.html',context)


# Make function to operate Checkout Functionality
def checkout(request):
    context = {}
    return render(request, 'store/checkout.html')
