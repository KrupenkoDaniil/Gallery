import * as consts from './variables.js';

// Get Data from the server
export const getData = (onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:80/pictures?expand=comments');

    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            onSuccess(JSON.parse(xhr.response));
        }
    })
    xhr.send();
}

// Send Data to the server
const sendData = (onSuccess, body) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:80/pictures');

    xhr.addEventListener('load', () => {
        if (xhr.status == 201) {
            onSuccess(JSON.parse(xhr.response));
        }
    })
    xhr.send(body);
}

export const setForm = (filter_id, onSuccess) => {
    consts.POST_FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        data.append('user_id', 1);
        console.log(+Object.keys(consts.filters).find(key => consts.filters[key] === filter_id));
        data.append('effect_id', +Object.keys(consts.filters).find(key => consts.filters[key] === filter_id));

        sendData(onSuccess, data);
    }, { once: true });
} 