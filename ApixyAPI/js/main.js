'use strict'

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const grid = document.querySelector('.grid');
const wrapCity = document.querySelector('.wrap_city');
const cityName = document.querySelector('.city_name');

const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.js-modal-backdrop');
const modalCloseBtn = document.querySelector('.js-close-modal');
const modalContent = document.querySelector('.js-modal--content');

const API_KEY = '4e16a6ee00ab4b349b374218181507';

let inputTown = '';
//================= FETCH WEATHER BY ID ==================
// const fetchWeatherById = query => {
// let url = `http://api.apixu.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=2`;
//  return fetch(url)
//     .then(response => {
//         if(response.ok) return response.json();

//         throw new Error('Error', response.statusText);
//     })
//     .then(data => console.log(data));
// };
// const getUserIP = () => {
//   return fetch('https://api.ipify.org?format=json')
//     .then(response => {
//       if (response.ok) return response.json();

//       throw Error('Error while fetching' + response.statusText);
//     })
//     .then(data => data.ip)
//     .catch(err => console.log(err));
// };

//     getUserIP().then(fetchWeatherById)
//   .then(data => console.log(data));

//===================== MODAL ===========================
function handleBackdropClick (event) {
    if(this !== event.target) return;

    hideModal();
};

const showModal = () => modal.classList.remove('modal--hidden');

const hideModal = () => modal.classList.add('modal--hidden');

//================= FETCH WEATHER ==================
const fetchWeather = ({town, day}) => {
    let url = `http://api.apixu.com/v1/forecast.json?key=${API_KEY}&q=${town}&days=${day}`;
    
    return fetch(url)
        .then(response => {
            if(response.ok) return response.json();

            throw new Error('Error: ', response.statusText)
        })
        .then(data => {
            return data.forecast
        })
        .then(data => {
            console.log(data.forecastday)
            return data.forecastday
        })
        .catch(error => console.log("Error: ", error))
};

//================= CREATE GRID ITEMS ==================
const createGridItem = items => {
    return items.reduce((markup, item) => 
        markup +
        `<div class="grid-item">
           <p class="weather_date">${item.date}</p>
           <img class="weather_icon" src='https:${item.day.condition.icon}' alt="photo">
           <p>Max: <span class="weather_degree">${item.day.maxtemp_c} C</span></p>
           <p>Min: <span class="weather_degree">${item.day.mintemp_c} C</span></p>
           <p>Sunrise:  <span class="weather_sun">${item.astro.sunrise}</span></p>
           <p>Sunset:  <span class="weather_sun">${item.astro.sunset}</span></p>
           <p>Humidity: ${item.day.avghumidity} %</p>
           <p>Condition: ${item.day.condition.text}</p>
        </div>`
    ,'')
};

//================= UPDATE GRID ITEMS ==================
const updateGridItems = markup => {
    grid.insertAdjacentHTML('beforeend', markup);
};

//================= RESET WEATHER GRID  ==================
const resetWetherGrid = () => {
    grid.innerHTML = '';
};

//================= HANDLE FETCH ==================
const handleFetch = params => {
    
    fetchWeather(params).then(items => {
        const markup = createGridItem(items);      
        updateGridItems(markup);
    })

};

//================= CAPITALIZE FIRST LETTER IN WORD ==================
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

//================= SUBMIT FORM ==================
const handleFormSubmit = e => {
    e.preventDefault();
   
    resetWetherGrid();
    
    inputTown = input.value;
    wrapCity.style.display = 'flex';
    cityName.innerHTML = capitalizeFirstLetter(inputTown);
    handleFetch({
        town: inputTown,
        day: 7
    })

    form.reset();
};

//================= MODAL ==================
// function handleModalContent(e) {
//     e.preventDefault;
//     const target = e.target;

//     const nodeName = target.classList.contains('grid-item');

//     if(nodeName !== true) return;
//     // console.log(target.textContent);
//     let innerContent = target.textContent;
//         showModal();
//     modalContent.innerHTML = innerContent;
//     console.log(innerContent);
// }

const createGridItemForModal = items => {
    console.log(typeof items)
    return items.reduce((markup, item) => 
        markup +
        `<div class="grid-item grid-item__modal">
           <p class="weather_date">${item.date}</p>
           <img class="weather_icon" src='https:${item.day.condition.icon}' alt="photo">
           <p class="weather_condition">${item.day.condition.text}</p>
           <p>Max: <span class="weather_degree">${item.day.maxtemp_c} C</span></p>
           <p>Min: <span class="weather_degree">${item.day.mintemp_c} C</span></p>
           <p>Avg: <span class="weather_degree">${item.day.avgtemp_c} C</span></p>
           <p>Sunrise:  <span class="weather_sun">${item.astro.sunrise}</span></p>
           <p>Sunset:  <span class="weather_sun">${item.astro.sunset}</span></p>
           <p>Moonrise:  <span class="weather_sun">${item.astro.moonrise}</span></p>
           <p>Moomset:  <span class="weather_sun">${item.astro.moonset}</span></p>
           <p>Humidity: ${item.day.avghumidity} %</p>
           <p>Max wind: ${item.day.maxwind_kph} km</p>
           <p>Min wind: ${item.day.maxwind_mph} km</p>
        </div>`
    ,'')
};

const updateGridItemsModl = markup => {
    modalContent.insertAdjacentHTML('beforeend', markup);
};

function handleMoreInformation (params) {
    
    fetchWeather(params).then(items => {
        const markup = createGridItemForModal(items);      
        updateGridItemsModl(markup);
    })
}; 

const handleFetchModal = e => {
    // e.preventDefault();
    const target = event.target;
    const nodeName = target.classList.contains('grid-item');
    console.log(target);
    if(nodeName !== true) return;
    handleMoreInformation({
        town: inputTown,
        // day: target.
    })
}


function showModalWithMoreInfo (event) {
    

    showModal();
    modalContent.innerHTML = handleFetchModal();
    // target.innerHTML;
};

grid.addEventListener('click', showModalWithMoreInfo);
form.addEventListener('click', handleFormSubmit);
modalBackdrop.addEventListener('click', handleBackdropClick);
modalCloseBtn.addEventListener('click', hideModal);