'use strict'

let posts = [
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

Handlebars.registerHelper("formatValue", function(property) {
    let value = property.toString();
    
    return new Handlebars.SafeString(
        "<p class='value_text'>" + value.substring(0, 4) + "</p>" + 
        "<p class='value_text-bold'>" + value.substring(4, 6) + '</p>' + 
        "<h4>" + value.substring(6, 7) + "<h4>"  
    );
});

const markup = posts.reduce((acc, post) => acc + template(post), '');
grid.insertAdjacentHTML('afterbegin', markup);

const wrapUsd = document.querySelectorAll(".wrap_usd");
const wrapSellValue = Array.from(document.querySelectorAll(".wrap_sell-value"));
const wrapBuyValue = Array.from(document.querySelectorAll(".wrap_buy-value"));
// const arrow = document.querySelector(".arrow");

console.log(wrapBuyValue)
console.log(wrapSellValue); 
const dataSetArr = [];

function getRandom10pc(num){
    return Math.random() * num / 10;
};
  
function getRandomSign() { 
    return Math.random() > 0.5 ? -1 : 1;
};
  
function randomData (arr) {
    return arr.map(el => ({
    "pair": el["pair"],
    "buy": el["buy"] + getRandomSign() * getRandom10pc(el["buy"]),
    "sell": el["sell"] + getRandomSign() * getRandom10pc(el["sell"])
  }));
};

window.setInterval(function() {
    posts = randomData(posts)
}, 1000);

function getDataSell(arr) {
    arr.forEach(item => dataSetArr.push(item.dataset.sell))
};
getDataSell(wrapUsd);

function updateDate() {
    posts.forEach(post => {
        let postKey = post.pair;

        wrapUsd.forEach(item => {
            let dataSetItem = item.dataset.sell;

            if(dataSetItem === postKey) { 
                // console.log(dataSetItem, postKey);
                // console.log(post.sell, post.buy);
                 wrapSellValue.textContent = (post.sell).toFixed(5);
                 wrapBuyValue.textContent = (post.buy).toFixed(5);
            }   
        })
});
}
window.setInterval(function() {
    updateDate();
}, 1000);





        // dataSetArr.find(key => {
        //     if(key === postKey && wrapUsd.dataSet === postKey) {
        //         console.log(key, postKey); 
        //         // wrapSellValue.textContent = (post.sell).toFixed(5);
        //         // wrapBuyValue.textContent = (post.buy).toFixed(5);
        //     } else {
        //         console.log('mistatake');
        //     }
        // }) 