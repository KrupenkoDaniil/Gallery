import * as consts from './consts.js';
import { applyFilters } from './start.js';
import { createModalWindow } from './work-with-modal-window.js';

// Setting showing messages
export function createMessageWindow(title) {
    consts.MAIN_OVERLAY.style.display = 'block';
    consts.MAIN_OVERLAY.addEventListener('click', removeMessageWindow);

    // Setting Message Template 
    const messageTemplate = document.getElementById('message-template');
    const messageTitle = messageTemplate.content.querySelector('.message__title');
    messageTitle.textContent = title;

    // Creating Message Clone
    const messageClone = messageTemplate.content.cloneNode(true);
    document.body.insertBefore(messageClone, document.body.children[0]);

    // Setting Events
    const messageButton = document.body.children[0].querySelector('.message__success-button');
    messageButton.addEventListener('click', removeMessageWindow);

}

export function removeMessageWindow() {
    const message = document.querySelector('.message__window');
    document.body.removeChild(message);
    consts.MAIN_OVERLAY.style.display = 'none';
    consts.MAIN_OVERLAY.removeEventListener('click', removeMessageWindow);
}

let signUpButton;
function blockSubmitButton(button) {
    if (button) {
        button.textContent = 'in process...';
        button.disabled = true;
        button.style.cursor = 'not-allowed';
    }

}
function unblockSubmitButton(button) {
    if (button) {
        button.textContent = 'Sign Up';
        button.disabled = false;
        button.style.cursor = 'initial';
    }
}

//! Manipulating with Data

let OPTIONS;
// Get Data from the server
export const getData = (onSuccess) => {
    if (localStorage.getItem('token')) {
        OPTIONS = {
            headers: {
                Authorization: `Basic ${btoa(window.localStorage.getItem('token') + ':')}`
            }
        }
        const requests = consts.GET_URLS.map(url => fetch(url, OPTIONS));

        Promise.all(requests)
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then(data => onSuccess(data))
            .catch((error) => {
                createMessageWindow('There is some problem on the server!');
            })
    } else {
        createModalWindow('signUp');
    }

}

// Send Data to the server
const sendData = (postName, onSuccess, body, targetButton) => {
    let responseIsOk;
    if (['tokens', 'users'].includes(postName)) {
        fetch(consts.POST_URLS[postName], {
            method: 'POST',
            body,
        })
            .then(response => {
                responseIsOk = response.ok;
                return response.json()
            })
            .then(data => {
                if (responseIsOk) {
                    postName === 'tokens' && createMessageWindow('You have log in!');
                    onSuccess(data);
                } else {
                    createMessageWindow(postName === 'users' ? 'Sorry, probably such email or avatar already exists!' : 'Sorry, but your email or password is wrong')
                }
            })
            .finally(() => {
                unblockSubmitButton(targetButton);
            });

    } else {
        fetch(consts.POST_URLS[postName], {
            headers: {
                Authorization: `Basic ${btoa(window.localStorage.getItem('token') + ':')}`
            },
            method: 'POST',
            body,
        })
            .then(response => response.json())
            .then(data => onSuccess(data))
            .finally(() => {
                unblockSubmitButton(targetButton);
            });
    }

}

export const setForm = (postName, postForm, additionalIds, onSuccess, eventName = 'submit') => {
    postForm.addEventListener(eventName, (event) => {
        event.preventDefault();
        let data = new FormData(postForm);
        additionalIds.map((idName) => {
            data.append(`${idName[0]}`, idName[1])
        });
        let targetButton = postForm.querySelector('button[type="submit"]');
        blockSubmitButton(targetButton);
        sendData(postName, onSuccess, data, targetButton);
    }, { once: true });
}

// Delete Data from server
export const deleteData = (deleteURL, header = true) => {
    if (header) {
        fetch(deleteURL, {
            headers: {
                Authorization: `Basic ${btoa(window.localStorage.getItem('token') + ':')}`
            },
            method: 'DELETE',
        })
    } else {
        fetch(deleteURL, {
            method: 'DELETE',
        })
    }

}

// Set WebSocket
const socket = new WebSocket('ws://127.0.0.1:2346');
socket.addEventListener('open', () => {
    getData(() => {
        let message = JSON.stringify(applyFilters.pictures);
        socket.send(message);
    });
});
socket.addEventListener('message', () => {
    applyFilters('1');
});