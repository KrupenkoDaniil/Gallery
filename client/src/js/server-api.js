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

const sendData = (onSuccess, body) => {
    const formDataObj = {};
    body.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:80/pictures?expand=comments');

    xhr.addEventListener('load', () => {
        if (xhr.status == 201) {
            onSuccess(JSON.parse(xhr.response));
        }
    })
    xhr.send(body);
}

const form = document.querySelector('#new-post-form');
export const setForm = (onSuccess) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendData(onSuccess, new FormData(event.target));
    });
} 