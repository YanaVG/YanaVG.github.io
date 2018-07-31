'use strict'

let posts = [
    {
        "pair": "USD CHF",
        "buy": 0.99143,
        "sell": 0.99043
    },
    {
        "pair": "GBP USD",
        "buy": 1.28495,
        "sell": 1.2836
    },
    {
        "pair": "GBP CHF",
        "buy": 1.27378,
        "sell": 1.27147
    },
    {
        "pair": "EUR SEK",
        "buy": 9.632,
        "sell": 9.6055
    },
    {
        "pair": "USD JPY",
        "buy": 110.467,
        "sell": 110.417
    },
    {
        "pair": "EUR JPY",
        "buy": 120.589,
        "sell": 120.491
    }
];

const grid = document.querySelector('.grid');
const list = document.querySelector('#list').innerHTML.trim();
const template = Handlebars.compile(list);

Handlebars.registerHelper("formatValue", function (property) {
    let value = property.toString();
    return new Handlebars.SafeString(
        "<p class='value_begin'>" + value.substring(0, 4) + "</p>" +
        "<p class='value_middle'>" + value.substring(4, 6) + '</p>' +
        "<h4>" + value.substring(6, 7) + "<h4>"
    );
});

const markup = posts.reduce((acc, post) => acc + template(post), '');
grid.insertAdjacentHTML('afterbegin', markup);

const wrapUsd = document.querySelectorAll(".wrap_usd");



/**
 *
 *
 * @param {number} num
 * @returns tenth part of num
 */
function getRandom10pc(num) {
    return Math.random() * num / 10;
};

/**
 *
 *
 * @returns value +/-1
 */
function getRandomSign() {
    return Math.random() > 0.5 ? -1 : 1;
};

/**
 *
 *
 * @param {obj} arr
 * @returns array with new values "buy" & "sell"
 */
function randomData(arr) {
    return arr.map(el => ({
        "pair": el["pair"],
        "buy": el["buy"] + getRandomSign() * getRandom10pc(el["buy"]),
        "sell": el["sell"] + getRandomSign() * getRandom10pc(el["sell"])
    }));
};

/**
 * @description Function update value of buy and sell in every grid_item
 * and show red/green arrow depends on difference between buy and sell values every 1000ms
 */
function update() {
    const arr = randomData(posts);

    Array.from(wrapUsd, el => {
        const key = el.dataset.sell;
        let obj = arr.filter(el => el.pair === key);
        let buy = obj[0].buy;
        let sell = obj[0].sell;
        let buyToString = buy.toString();
        let sellToString = sell.toString();
        el.querySelector('.wrap_sell .value_begin').textContent = sellToString.substring(0, 4);
        el.querySelector('.wrap_sell .value_middle').textContent = sellToString.substring(4, 6);
        el.querySelector('.wrap_sell h4').textContent = sellToString.substring(6, 7);
        el.querySelector('.wrap_buy .value_begin').textContent = buyToString.substring(0, 4);
        el.querySelector('.wrap_buy .value_middle').textContent = buyToString.substring(4, 6);
        el.querySelector('.wrap_buy h4').textContent = buyToString.substring(6, 7);

        let arrow = el.querySelector(".arrow");

        if (buyToString > sellToString) {
            arrow.classList.remove("red_arrow");
            arrow.classList.add("green_arrow");
        } else {
            arrow.classList.remove("green_arrow");
            arrow.classList.add("red_arrow");
        }
    });
};

window.setInterval(function () {
    update();
}, 1000);
