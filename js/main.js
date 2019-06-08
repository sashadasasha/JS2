const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     }
// };

//getRequest with Promise
// let getRequest = url => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject('error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }

//             }
//         }
//     })
// }
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this._getProducts()
            .then(() => this._render());
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log('error'));
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum + item.price, 0)
    }
    _render() {
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.product_name}">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" id=${this.id_product}>Купить</button>
                 </div>
             </div>`
    }
}
class CartItem {
    constructor(cartProd) {
        this.id_product = cartProd.id_product;
        this.product_name = cartProd.product_name;
        this.price = cartProd.price;
        this.quantity = cartProd.quantity;

    }

    render() {

        return `
        <div class ="infoCart">
            <h4>${this.product_name}</h4>
            <p>${this.price}</p>
            <p>${this.quantity}</p>
            <button class="rmv-cart-item" id=${this.id_product}><i class="far fa-times-circle"></i></button>
        </div>
        `
    }
}

class CartList {
    constructor(container = ".cart") {
        this.container = container;
        this.cartData = [];
        this.allCartProd = [];
        this._getCart()
            .then(() => this._renderCart());
        this.cartVisibility();
        this.addCart();
        this.removeCart();

    }

    _getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(cartDataObj => cartDataObj.contents)
            .then(cartData => {
                this.cartData = [...cartData];
            })
    }


    _renderCart() {
        const block = document.querySelector(this.container);
        for (let item of this.cartData) {
            const cartProd = new CartItem(item);
            this.allCartProd.push(cartProd);
            block.insertAdjacentHTML('beforeend', cartProd.render());
        }
    }

    cartVisibility() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            const block = document.querySelector('.hidden');
            block.classList.toggle('hiddenNo');
        })
    }

    addCart() {
        window.addEventListener('load', () => {
            let buyButton = document.querySelector('.products');
            buyButton.addEventListener('click', () => {
                const block = document.querySelector(this.container);
                block.remove();
                let hidden = document.querySelector('.hidden');
                hidden.insertAdjacentHTML('beforeend', `<div class="cart"></div>`)
                if (event.target.classList.value === "buy-btn") {
                    for (let i = 0; i < this.cartData.length; i++) {
                        if (this.cartData[i].id_product == event.target.id) {
                            this.cartData[i].quantity += 1;
                            this._renderCart();
                        } 
                    }
                    }
                })
            })
    }


    removeCart() {
        window.addEventListener('load', () => {
            let removeButton = document.querySelector('.hidden');
            removeButton.addEventListener('click', () => {
                const block = document.querySelector(this.container);
                block.remove();
                let hidden = document.querySelector('.hidden');
                hidden.insertAdjacentHTML('beforeend', `<div class="cart"></div>`)
                if (event.target.classList.value === "rmv-cart-item") {
                    for (let i = 0; i < this.cartData.length; i++) {
                        if (this.cartData[i].id_product == event.target.id) {
                            this.cartData[i].quantity -= 1;
                            if (this.cartData[i].quantity === 0) {
                                this.cartData.splice(i,1);
                            }
                            this._renderCart();
                        }
                    }
                }
            })

        })

    }

}

const products = new ProductsList();
const cart = new CartList;

//const cart = new Cart();
// console.log(products.calcSum());

// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 30},
//     {id: 3, title: 'Keyboard', price: 55},
//     {id: 4, title: 'Gamepad', price: 65},
// ];
//
// const renderProduct = (title, price, img = `https://placehold.it/200x150`) => {
//     return `<div class="product-item">
//                  <img src="${img}" alt="${title}">
//                  <div class="desc">
//                      <h3>${title}</h3>
//                      <p>${price}</p>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
// };
//
// const renderPage = list => {
//     // document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
//     for (let product of list){
//         document.querySelector('.products').insertAdjacentHTML('beforeend', renderProduct(product.title, product.price));
//     }
// };
//
// renderPage(products);