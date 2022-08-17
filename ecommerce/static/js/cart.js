var updateBtns = document.getElementsByClassName('update-cart')

for (i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function () {
        var productId = this.dataset.product
        var action = this.dataset.action

        console.log('productId:', productId, 'Action:', action)

        console.log('User:', user)
        if (user === 'AnonymousUser') {
            console.log('Not Logged In')
        } else {
            upateUserOrder(productId, action)

        }

    })
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
        })
}