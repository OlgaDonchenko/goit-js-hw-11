
import iconRejected from '../img/octagon.png';
export function getPictures(name) {
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
        });
}

export { iconRejected };