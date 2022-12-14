import * as consts from './variables.js';
import { createDesk } from './create-desk.js';

// Get Data from the server
export const getData = (onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', consts.GET_URLS['pictures']);

    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            onSuccess(JSON.parse(xhr.response));
        }
    })
    xhr.send();
}

export const getEffects = (onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', consts.GET_URLS['effects']);

    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            onSuccess(JSON.parse(xhr.response));
        }
    })
    xhr.send();
}

// Send Data to the server
const sendData = (postName, onSuccess, body) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', consts.POST_URLS[postName]);

    xhr.addEventListener('load', () => {
        if (xhr.status == 201) {
            onSuccess(JSON.parse(xhr.response));
        }
    })
    xhr.send(body);
}

export const setForm = (postName, postForm, additionalId, onSuccess) => {
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        additionalId.map((idName) => data.append(`${idName[0]}`, idName[1]));
        sendData(postName, onSuccess, data);
    }, { once: true });
}

// Set WebSocket
const socket = new WebSocket('ws://127.0.0.1:2346');

socket.addEventListener('open', () => {
    getData((response) => {
        socket.send(response);
    })
});

socket.addEventListener('message', (event) => {
    createDesk(JSON.parse(event.data));
});