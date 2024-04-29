const cartBtn = document.getElementById('cart-icon')
const sideBar = document.getElementById('sidebar')
const sideBarClose = document.getElementById('sidebar-close')
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const totalPrice = document.getElementById('total')
const empty = document.getElementById('empty-cart')
const sup = document.getElementById('sup')
const complete = document.getElementById('complete')

cartBtn.addEventListener('click', () => {
    sideBar.classList.add('open-side-bar')
})

sideBarClose.addEventListener('click', () => {
    sideBar.classList.remove('open-side-bar')
})

const data = [{
        id: 1,
        image: './images/airpods.jpg',
        title: 'Apple Airpods Pro | Ultra Noise Cancelling',
        price: 100
    },
    {
        id: 2,
        image: './images/headphone.jpg',
        title: 'Logitech Headphones | Best for Gaming',
        price: 150
    },
    {
        id: 3,
        image: './images/imac.jpg',
        title: 'Apple iMac | Ultra high speed processor',
        price: 900
    },
    {
        id: 4,
        image: './images/iphone.jpg',
        title: 'iPhone 12 Pro | Only for the Best',
        price: 750
    },
    {
        id: 5,
        image: './images/keyboard.jpg',
        title: 'Apple Wireless Keyboards | Code like a Pro',
        price: 78
    },
    {
        id: 6,
        image: './images/macbook.jpg',
        title: 'Macbook M1 Laptop | Fastest speed Laptop',
        price: 850
    },
    {
        id: 7,
        image: './images/mixer.jpg',
        title: 'KITCHENMATE Mixer Grinder | Best quality',
        price: 50
    },
    {
        id: 8,
        image: './images/mouse.jpg',
        title: 'Logitech Gaming Mouse | Become a Pro Gamer',
        price: 70
    }
]

let cartItems = localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart-items')) : []

const exchangeRate = 15.50; // 1 USD = 15.50 ZAR (example rate)

const loadProducts = () => {
    data.map((item) => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
        <img src="${item.image}" alt="">
        <h3>${item.title}</h3>
        <div class="button">
            <p>R${(item.price * exchangeRate).toFixed(2)}</p> <!-- Convert price to ZAR -->
            <button><i class="fa fa-cart-plus fa-2x" aria-hidden="true" onclick='addToCart(${item.id})'></i></button>
        </div>
        `
        cards.appendChild(card)
    })
}

loadProducts()

const addToCart = (id) => {
    const cartItem = data.find((item) => {
        return item.id === id
    })
    const itemInCart = cartItems.find((item) => {
        return item.id === id
    })
    if (itemInCart) {
        itemInCart.qty = itemInCart.qty + 1
        loadCartItems()
    } else {
        cartItems.push({
            ...cartItem,
            qty: 1
        })
        loadCartItems()
    }
    localStorage.setItem('cart-items', JSON.stringify(cartItems))
}

const updateDOM = () => {
    let total = 0
    cartItems.map((item) => {
        total = total + (item.price * item.qty)
    })
    totalPrice.innerText = `Total: R${total}`
    sup.innerHTML = cartItems.length
}

const loadCartItems = () => {
    items.innerHTML = ''
    cartItems.map((item) => {
        const newCartItem = document.createElement('div')
        newCartItem.classList.add('item')
        newCartItem.innerHTML = `
        <img src="${item.image}" alt="">
        <div class="details">
            <h5>${item.title}</h5>
            <div class="buttons">
                <div class="quantity">
                    <button onclick='decreaseQty(${item.id})'>-</button>
                    <button>${item.qty}</button>
                    <button onclick='increaseQty(${item.id})'>+</button>
                </div>
                <p>$${item.price * item.qty}</p>
                <button onclick='removeItemFromCart(${item.id})'>Remove</button>
            </div>
        </div>
        `
        items.appendChild(newCartItem)
    })
    updateDOM()
}

loadCartItems()

const removeItemFromCart = (id) => {
    cartItems = cartItems.filter(item => {
        return item.id !== id
    })
    loadCartItems()
    localStorage.setItem('cart-items', JSON.stringify(cartItems))
}

const increaseQty = (id) => {
    const obj = cartItems.find(i => i.id === id)
    obj.qty = obj.qty + 1
    loadCartItems()
    localStorage.setItem('cart-items', JSON.stringify(cartItems))
}

const decreaseQty = (id) => {
    const obj = cartItems.find(i => i.id === id)
    if (obj.qty === 1) {
        return
    } else {
        obj.qty = obj.qty - 1
        loadCartItems()
        localStorage.setItem('cart-items', JSON.stringify(cartItems))
    }
}

const emptyCart = () => {
    cartItems = []
    loadCartItems()
    localStorage.removeItem('cart-items')
}

const completePurchase = () => {
    if (cartItems.length === 0) {
        alert('Please add some items to cart before completing the purchase')
    } else {
        cartItems = []
        loadCartItems()
        alert('Purchase Completed')
        localStorage.removeItem('cart-items')
    }
}

empty.addEventListener('click', emptyCart)
complete.addEventListener('click', completePurchase)