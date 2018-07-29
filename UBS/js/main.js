// 'use strict'

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


const getRandom10pc = (num) => {
    return Math.random() * num / 10;
};
  
const getRandomSign = () => Math.random() > 0.5 ? -1 : 1;
  
function randomData (arr) {
    return arr.map(el => ({
    "pair": el["pair"],
    "buy": el["buy"] + getRandomSign() * getRandom10pc(el["buy"]),
    "sell": el["sell"] + getRandomSign() * getRandom10pc(el["sell"])
  }));
};

const updatePosts = window.setInterval(function() {
    posts = randomData(posts)
    // console.log('new posts: ', posts);
}, 1000);

const grid = document.querySelector('.grid');
const list = document.querySelector('#list').innerHTML.trim();

const template = Handlebars.compile(list);

Handlebars.registerHelper("formatValue", function(property) {
    let value = property.toString();
    setInterval(function(){
        value = property.toString();
    }, 1000);
    return new Handlebars.SafeString(
        "<p class='value_text'>" + value.substring(0, 4) + "</p>" + 
        "<p class='value_text-bold'>" + value.substring(4, 6) + '</p>' + 
        "<h4>" + value.substring(6, 7) + "<h4>"  
    );
});

Handlebars.registerHelper("changeValue", function(posts) {
    
})

const markup = randomData(posts).reduce((acc, post) => acc + template(post), '');
grid.insertAdjacentHTML('afterbegin', markup);

// console.log();
// posts.forEach()