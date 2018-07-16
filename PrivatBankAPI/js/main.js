const btn = document.querySelector("#js-btn");
const tBody = document.querySelector("#js-tbody");
const htmlTpl = document.querySelector("#table-row").textContent.trim();
const compiled = _.template(htmlTpl);
const tableHead = document.querySelector(".table_head");

const updateView = currencies => {
  let htmlString = "";

  currencies.forEach(currency => {
    htmlString += compiled(currency);
  });

  tBody.innerHTML = htmlString;
};

const getCurrencyRates = () =>
  fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .catch(err => {
      console.error("Error: ", err);
    });

const onClick = () => {
  getCurrencyRates().then(currencies => {
    updateView(currencies);
    tableHead.style.backgroundColor = "#26a69a";
    tableHead.style.color = "#fff";
  });
};

btn.addEventListener("click", onClick);
