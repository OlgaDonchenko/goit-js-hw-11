import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iconRejected from './img/octagon.png'

const formSearch = document.querySelector('.form-search');
const listImages = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

formSearch.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();

    if (formSearch.elements.search.value.trim() === '') {
        iziToast.show({
            message: `The search query cannot be empty`,
            timeout: 5000,
            close: false,
            position: 'bottomLeft',
            backgroundColor: '#ef4040',
            messageSize: 16,
            messageColor: '#fff',
            title: 'Sorry,',
            titleSize: 16,
            titleColor: '#fff',
            iconUrl: iconRejected,
        });
        return;
    }

    loader.style.display = 'block';
    const inputValue = formSearch.elements.search.value.trim();

    listImages.innerHTML = '';

    getPictures(inputValue)
        .then(data => {
            if (!data.hits.length) {
                iziToast.show({
                    title: 'Sorry,',
                    message: 'There are no images matching your search query. Please try again!',
                    position: 'bottomLeft',
                    backgroundColor: '#ef4040',
                    messageSize: 16,
                    messageColor: '#fff',
                    titleSize: 16,
                    titleColor: '#fff',
                    iconUrl: iconRejected,
                });
            }

            listImages.insertAdjacentHTML('afterbegin', createMarkup(data.hits));
            const refreshPage = new SimpleLightbox('.gallery a', {
                captions: true,
                captionsData: 'alt',
                captionDelay: 250,
            });
            refreshPage.refresh();

            formSearch.reset();
        })
        .catch((error) => {
            console.log(error);
            iziToast.show({
                title: 'Sorry,',
                message: 'Try again!',
                position: 'bottomLeft',
                backgroundColor: '#ef4040',
                messageSize: 16,
                messageColor: '#fff',
                titleSize: 16,
                titleColor: '#fff',
                iconUrl: iconRejected,
            });
        })
        .finally(() => loader.style.display = 'none');
}

function getPictures(name) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '42458918-8f01ea81f4ffacec8edc4f5cf';

    const searchParams = new URLSearchParams({
        key: KEY,
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    })

    return fetch(`${BASE_URL}?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
}

function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
                <img
                  class="gallery-image"
                  src="${webformatURL}"
                  alt="${tags}"
                  width="360"
                />
              </a>
              <div class="thumb-block">
                <div class="block">
                  <h2 class="title">Likes</h2>
                  <p class="amount">${likes}</p>
                </div>
                <div class="block">
                  <h2 class="title">Views</h2>
                  <p class="amount">${views}</p>
                </div>
                <div class="block">
                  <h2 class="title">Comments</h2>
                  <p class="amount">${comments}</p>
                </div>
                <div class="block">
                  <h2 class="title">Downloads</h2>
                  <p class="amount">${downloads}</p>
                </div>
              </div>
            </li>`)
        .join('');
}