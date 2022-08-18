var updateBtns = document.getElementsByClassName('update-cart')

for (i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function () {
        var productId = this.dataset.product
        var action = this.dataset.action

        console.log('productId:', productId, 'Action:', action)

        console.log('User:', user)
        if (user === 'AnonymousUser') {
            addCookieItem(productId, action)
        } else {
            upateUserOrder(productId, action)

        }

    })
}

function addCookieItem(productId, action) {
    console.log('User is not authenticated')

    if (action == 'add') {
        if (cart[productId] == undefined) {
            cart[productId] = {
                'quantity': 1
            }
        } else {
            cart[productId]['quantity'] += 1
        }
    }

    if (action == 'remove') {
        cart[productId]['quantity'] -= 1

        if (cart[productId]['quantity'] <= 0) {
            console.log('Item should be deleted')
            delete cart[productId];
        }
    }
    console.log('Cart:', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    // window.location.reload()
}


function upateUserOrder(productId, action) {
    console.log('User is logged in, sending data..')

    var url = '/update_item/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': csrftoken,
        },
        body: JSON.stringify({
            'productId': productId, 'action': action
        })

    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('data: ', data)
            location.reload()
        })
}

