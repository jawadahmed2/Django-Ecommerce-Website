from django.shortcuts import render
from .models import *
from django.http import JsonResponse
import json

# Make function to operate Store Functionality
def store(request):
    products = Product.objects.all()
    context = {'products':products}
    return render(request, 'store/store.html',context)


# Make function to operate Cart Functionality
def cart(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer = customer, complete = False)
        items = order.orderitem_set.all()
    else:
        items = []
        order = {'get_cart_total':0,'get_cart_items':0}
    context = {'items':items, 'order': order}
    return render(request, 'store/cart.html',context)


# Make function to operate Checkout Functionality
def checkout(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer = customer, complete = False)
        items = order.orderitem_set.all()
    else:
        items = []
        order = {'get_cart_total':0,'get_cart_items':0}
    context = {'items':items, 'order': order}
    return render(request, 'store/checkout.html',context)

def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    print('Action', action)
    print('Product:', productId)