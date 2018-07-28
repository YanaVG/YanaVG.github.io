'use strict'

const posts = [
    {
        "pair": "USD CHF", 
        "buy":  0.99143, 
        "sell": 0.99043
    },
    {
        "pair": "GBP USD", 
        "buy":  1.28495, 
        "sell": 1.2836
    },
    {
        "pair": "GBP CHF", 
        "buy":  1.27378, 
        "sell": 1.27147
    },
    {
        "pair": "EUR SEK", 
        "buy":  9.632, 
        "sell": 9.6055
    },
    {
        "pair": "USD JPY", 
        "buy":  110.467, 
        "sell": 110.417
    },
    {
        "pair": "EUR JPY", 
        "buy":  120.589, 
        "sell": 120.491
    }
  ];

const grid = document.querySelector('.grid');
const list = document.querySelector('#list').innerHTML.trim();

const template = Handlebars.compile(list);

const markup = posts.reduce((acc, post) => acc + template(post), '');
grid.insertAdjacentHTML('afterbegin', markup);

const wrapSell = document.querySelector('.wrap_sell');
const wrapBuy = document.querySelector('.wrap_buy');

wrapSell.addEventListener('mouseover', handleWrapSell);
wrapBuy.addEventListener('mouseover', handleWrapBuy);

function handleWrapSell (event) {
    console.log(event.target);
    // wrapSell.className.add = 'wrap_sell--active';
    // wrapBuy.className.add = 'wrap_sell--disable'; 
};

function handleWrapBuy (event) {
    console.log(event.target);
    // wrapBuy.className.add = 'wrap_sell--active';
    // wrapSell.className.add = 'wrap_sell--disable'; 
};
