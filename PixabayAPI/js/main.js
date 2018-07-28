'use strict'

const grid = document.querySelector('.grid');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const spiner = document.querySelector('.spinner-overlay');
const loadMoreBtn = document.querySelector('.load-more');

const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.js-modal-backdrop');
const modalCloseBtn = document.querySelector('.js-close-modal');
const modalContent = document.querySelector('.js-modal--content');


let currantPage = 1;
let currentQuery = '';

const API_KEY = '9552477-12ba33627c44819466016adeb';

//===================== SPINER ===========================
const toggleSpiner = () => spiner.classList.toggle("visible");

//===================== SHOW MORE PAGES ===========================
const resetCurrantPage = () => {
    currantPage = 1;  
};

const incrimentCurrantPage = () => {
    currantPage += 1;
};

const showLoadMoreBtn = () => {
    if(!loadMoreBtn.classList.contains('visible')) {
        loadMoreBtn.classList.add('visible');
    }
};

//===================== SCROLLTO ===========================
const scrollToBottom = () => scrollTo(0, document.body.scrollHeight);

//===================== MODAL ===========================
function handleBackdropClick (event) {
    if(this !== event.target) return;

    hideModal();
};

const showModal = () => modal.classList.remove('modal--hidden');

const hideModal = () => modal.classList.add('modal--hidden');

//===================== GET IMAGES ===========================
const fetchImg = ({ query, count, page }) => {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=${count}&page=${page}&image_type=photo`;

    return fetch(url) 
        .then(response => {
            if(response.ok) return response.json();
            throw new Error('Error: ' + response.statusText)
        })
        .then(data => {
            console.log(typeof data.hits)
            return data.hits
        })
        .catch(error => console.log('Error: ', error))
};

const createGridItems = items => { 
    console.log(typeof items)
    console.log(items)
    return items.reduce((markup, item) => 
    markup + 
    `<div class='grid-item'>
        <img src='${item.largeImageURL} alt='photo'>
    </div>`, 
    '');
};

const updatePhotosGrid = markup => {
    grid.insertAdjacentHTML('beforeend', markup);
};

const resetPhotosGrid = () => {
    grid.innerHTML = '';
}
const handleFetch = params => {
    toggleSpiner();

    fetchImg(params).then(photos => {
        const markup = createGridItems(photos);
        updatePhotosGrid(markup);
        toggleSpiner();
        scrollToBottom(); 
    })
};

const handleFormSubmit = e => {
    e.preventDefault();

    resetPhotosGrid();
    resetCurrantPage();

    currentQuery = input.value;

    handleFetch({
        query: currentQuery,
        count: 9,
        page: currantPage
    });

    form.reset();
    showLoadMoreBtn();
};

//===================== GET MORE IMAGES ===========================
const handleLoadMoreClick = () => {
    incrimentCurrantPage();

    handleFetch({
        query: currentQuery,
        count: 9,
        page: currantPage
    });
};

//===================== SHOW BIGGER IMAGES ===========================
function showBiggerImg (event) {
    const target = event.target;
    const nodeName = target.nodeName;

    if(nodeName !== 'IMG') return;

    showModal();
    modalContent.src = target.src;
};

//===================== ADD EVENT LISTENER ===========================
loadMoreBtn.addEventListener('click', handleLoadMoreClick);
form.addEventListener('submit', handleFormSubmit);
grid.addEventListener('click', showBiggerImg);
modalBackdrop.addEventListener('click', handleBackdropClick);
modalCloseBtn.addEventListener('click', hideModal);