import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPictures, iconRejected } from './js/pixabay-api';
import { createMarkup, initializeLightbox } from './js/render-functions';

const formSearch = document.querySelector('.form-search');
const listImages = document.querySelector('.gallery');
const loader = document.querySelector('.lds-heart');

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
            initializeLightbox();

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