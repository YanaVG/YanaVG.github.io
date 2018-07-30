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
grid.innerHTML = showList();

function getRandom10pc(num) {
    return Math.random() * num / 10;
};
  
function getRandomSign() {
   return Math.random() > 0.5 ? -1 : 1;
};
  
function randomData (arr) {
    return arr.map(el => ({
    "pair": el["pair"],
    "buy": (el["buy"] + getRandomSign() * getRandom10pc(el["buy"])).toFixed(5),
    "sell": (el["sell"] + getRandomSign() * getRandom10pc(el["sell"])).toFixed(5)
  }));
};

window.setInterval(randomData(posts) , 1000); 

function showList() {
    const list =` 
            ${randomData(posts).reduce((acc, {pair, buy, sell}) => 
                acc + 
                    `
                    <div class="grid_item">
                    <h2 class="grid_item-pair">${pair}</h2>
                    <div class="wrap_usd">
                        <div class="wrap_sell">
                            <h6>Sell USD</h6>
                             <div class="wrap_value">
                            <p>${sell}</p>
                            </div>
                        </div>
                        <div class="arrow"></div>
                        <div class="wrap_buy">
                            <h6>Buy USD</h6>
                            <div class="wrap_value wrap_buy-value">
                                <p>${buy}</p>
                            </div>
                        </div>
                        </div>
                    </div>`,
                ''    
            )}
      `;
    return list;
  };

//   function randomData(posts) {
//     posts.forEach(post => {
//         let buyVal = post.buy;
//         if(Math.random() > 0.5) {
//             buyVal = buyVal * 1.1;
//             arrow.classList.add("green_arrow");
//         } else {
//             buyVal = buyVal * 0.9;
//             arrow.classList.add("red_arrow");
//         }
//         console.log(buyVal);
//         return buyVal;
//     });
// };
// setInterval(randomData, 1000);
// randomData(posts);
