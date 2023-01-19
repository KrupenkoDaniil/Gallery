import { getData } from "./server-api.js";
import { openModalWindow, showMessage } from "./work-with-modal-window.js";
import './validation.js';
import { checkEffects } from "./noUiSlider.js";
import { generatePicsArray } from "./generate-pics-array.js"
import { shuffle } from "./randoming.js";
import * as consts from './consts.js';

let bodyEventsHandler = (event) => {
    openModalWindow(event, []);
}; // primarally listener
consts.BODY.addEventListener('click', bodyEventsHandler);

export function createDesk(picsArray, effects, containerWidth = 800, RowSize = 5, containerMargin = 15) {
    consts.BODY.removeEventListener('click', bodyEventsHandler); // get rid of previous listener

    bodyEventsHandler = (event) => openModalWindow(event, picsArray);

    // Prepare main container
    consts.MAIN_CONTAINER.innerHTML = '';
    consts.MAIN_CONTAINER.style.maxWidth = containerWidth + 'px';

    // Set all modal windows' appearance
    consts.BODY.addEventListener('click', bodyEventsHandler);
    consts.BODY.appendChild(consts.MAIN_CONTAINER);

    // Set user info
    let userAvatar = document.querySelector('.navigation__user-avatar');
    let userName = document.querySelector('.navigation__username');
    userAvatar.src = `../img/avatars/${window.localStorage.getItem('user_avatar')}`;
    userName.textContent = window.localStorage.getItem('user_name');

    // Set parameters
    const postSize = containerWidth / RowSize - containerMargin * 2;
    const addButtonYPos = Math.ceil((picsArray.length / RowSize + 0.1) / 2);
    const rowHalf = Math.ceil(RowSize / 2);

    // Start loop
    let buttonSet = false;
    for (let i = 0; i < picsArray.length; i++) {
        if (i == (addButtonYPos * RowSize - rowHalf) && !buttonSet) { // if next element is button
            const newElement = document.createElement('label');
            newElement.classList.add('add-button');
            newElement.setAttribute('for', 'file');
            newElement.innerText = 'Add new';
            newElement.style.width = postSize + 'px';
            newElement.style.height = postSize + 'px';
            newElement.style.margin = containerMargin + 'px';
            consts.MAIN_CONTAINER.appendChild(newElement);
            buttonSet = true;
            i--;
        } else { // if next element is regular frame
            const nextElement = picsArray[i];

            // Create new post
            const postTemplate = document.getElementById('post-template');
            const newPost = postTemplate.content.querySelector('.post');
            newPost.style.margin = containerMargin + 'px';
            newPost.setAttribute('id', i);
            newPost.style.width = postSize + 'px';
            newPost.style.height = postSize + 'px';
            newPost.style.color = consts.PICS[nextElement['url']];

            // Set post image
            newPost.style.backgroundImage = `url(http://localhost:80/uploads/${nextElement['url']})`;
            let pictureFilter = checkEffects(nextElement['effect_id'], nextElement['effect_level'], effects);
            pictureFilter[0] === null ? newPost.style.filter = 'none' : newPost.style.filter = `${pictureFilter[0]}(${pictureFilter[1]})`;

            // change template content
            const newPostSpans = postTemplate.content.querySelectorAll('span');
            newPostSpans[0].textContent = `${nextElement['comments'].length}`;
            newPostSpans[1].textContent = `${nextElement['likes'].length}`;

            const postClone = postTemplate.content.cloneNode(true);
            consts.MAIN_CONTAINER.appendChild(postClone);
        }
    }
}

let currentFilter;
function setFilters() {
    const filterContainer = document.querySelector('.filters-list');
    currentFilter = filterContainer.querySelector('.filters-list__filter-item--active').id;
    filterContainer.addEventListener('click', (event) => {
        const eventTarget = event.target;
        if (eventTarget.classList.contains('filters-list__filter-item')) {
            document.querySelector('.filters-list__filter-item--active').classList.remove('filters-list__filter-item--active');
            eventTarget.classList.add('filters-list__filter-item--active');
            currentFilter = eventTarget.id;
            consts.BODY.removeEventListener('click', bodyEventsHandler);
            applyFilters(currentFilter);
        }
    })
}
function setScalePreserve() {
    const scaleButton = document.querySelector('.navigation__preserve-scale-input');
    scaleButton.addEventListener('click', () => {
        consts.MAIN_CONTAINER.classList.toggle('scale-preverved');
        scaleButton.parentElement.classList.toggle('navigation__preserve-scale-button--active')
    });
}

export function applyFilters(filterMode, response = []) {
    if (applyFilters.pictures === undefined) {
        applyFilters.pictures = response[0];
        applyFilters.effects = response[1];
    }
    try {
        switch (filterMode) {
            case consts.FILTER_MODES.ID_UP: {
                applyFilters.pictures.sort((next, post) => next.id - post.id);
                break;
            }
            case consts.FILTER_MODES.ID_DOWN: {
                applyFilters.pictures.sort((next, post) => post.id - next.id);
                break;
            }
            case consts.FILTER_MODES.RANDOM: {
                shuffle(applyFilters.pictures);
                break;
            }
            case consts.FILTER_MODES.BYLIKES: {
                applyFilters.pictures.sort((next, post) => post.likes.length - next.likes.length);
                break;
            }
            case consts.FILTER_MODES.BYCOMMENTS: {
                applyFilters.pictures.sort((next, post) => post.comments.length - next.comments.length);
                break;
            }
            case consts.FILTER_MODES.EFFECTS: {
                applyFilters.pictures.sort((post, next) => post.effect_id - next.effect_id);
                break;
            }
            case consts.FILTER_MODES.TAG: {
                //TODO: add seatching part
                applyFilters.pictures.sort((post, next) => next.hashtags.length - post.hashtags.length);
                break;
            }
        }
        createDesk(applyFilters.pictures, applyFilters.effects);
    } catch (er) {
        showMessage('filters');
        consts.BODY.addEventListener('click', bodyEventsHandler);
    }

}

setScalePreserve();
setFilters();
getData((response) => {
    response ? applyFilters(currentFilter, response) : showMessage('getData');
});

// createDesk(generatePicsArray(10));