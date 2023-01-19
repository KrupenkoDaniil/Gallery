import * as consts from './consts.js';
import { applyFilters } from './create-desk.js';
import { showMessage } from './work-with-modal-window.js';

let OPTIONS;
// Get Data from the server
export const getData = (onSuccess) => {
    OPTIONS = {
        headers: {
            Authorization: `Basic ${btoa(window.localStorage.getItem('token') + ':')}` // через localstorage
        }

    }
    const requests = consts.GET_URLS.map(url => fetch(url, OPTIONS));

    Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(data => onSuccess(data))
        .catch((error) => {
            onSuccess();
        })
}

// Send Data to the server
const sendData = (postName, onSuccess, body) => {
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', consts.POST_URLS[postName]);
    // xhr.setRequestHeader('Autorization', `Basic ${btoa(window.localStorage.getItem('token') + ':')}`);

    // xhr.addEventListener('load', () => {
    //     if (xhr.status == 201) {
    //         onSuccess(JSON.parse(xhr.response));
    //     }
    //     showMessage(postName, xhr.status);
    // });
    // xhr.addEventListener('error', () => {
    //     showMessage(postName, xhr.status);
    // })

    // xhr.send(body);

    if (['tokens', 'users'].includes(postName)) {
        fetch(consts.POST_URLS[postName], {
            method: 'POST',
            body,
        })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     onSuccess(data)
        // });
    } else {
        fetch(consts.POST_URLS[postName], {
            headers: {
                Authorization: `Basic ${btoa(window.localStorage.getItem('token') + ':')}` 
            },
            method: 'POST',
            body,
        })
            .then(response => response.json())
            .then(data => onSuccess(data));
    }

}

export const setForm = (postName, postForm, additionalIds, onSuccess, eventName = 'submit') => {
    postForm.addEventListener(eventName, (event) => {
        event.preventDefault();
        let data = new FormData(postForm);
        additionalIds.map((idName) => {
            data.append(`${idName[0]}`, idName[1])
        });

        sendData(postName, onSuccess, data);
    }, { once: true });
}

// Delete Data from server
export const deleteData = (deleteURL) => {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", deleteURL);

    xhr.addEventListener('load', () => {
        if (xhr.status == 201) {
            onSuccess(JSON.parse(xhr.response));
        }
    })

    xhr.send();
}

// Set WebSocket
const socket = new WebSocket('ws://127.0.0.1:2346');

socket.addEventListener('open', () => {
    getData((response) => {
        let message = JSON.stringify(applyFilters.pictures);
        socket.send(message);
    });
});
socket.addEventListener('message', (event) => {
    applyFilters('1');
});