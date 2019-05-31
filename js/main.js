"use strict";

const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 75},
];

const renderProduct = (title, price = "Товара нет в наличии") => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
   // Можно сократить запись до одной строки, join превращает массив в строку, и можно выбрать разделители, 
   //в нашем случае просто уберем разделители
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join(' ');
};

renderPage(products);