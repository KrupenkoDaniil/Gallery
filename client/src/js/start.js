import { createModalWindow, closeModalWindow } from "./work-with-modal-window.js";
import { createMessageWindow, getData } from "./server-api.js";
import { createDesk } from "./create-desk.js";
import { shuffle } from "../js/randoming.js";
import * as consts from './consts.js';
import './validation.js';

consts.MAIN_CONTAINER.addEventListener('click', (event) => {
    const eventTarget = event.target;
    if (eventTarget.closest('.post')) {
        createModalWindow('post', event.target);
    } else if (eventTarget.closest('.add-button')) {
        createModalWindow('add-button');
    }
});

function setSignUpButton() {
    const signUpButton = document.querySelector('.navigation__signup-button');
    signUpButton.addEventListener('click', () => {
        localStorage.getItem('token') ? null : createModalWindow('signUp');
    })
}

function setOverlay() {
    consts.MAIN_OVERLAY.addEventListener('click', () => {
        closeModalWindow();
    })
}

let currentFilter;
function setFilters() {
    const filterContainer = document.querySelector('.filters-list');
    filterContainer.classList.add('hidden');
    currentFilter = filterContainer.querySelector('.filters-list__filter-item--active').id;
    filterContainer.addEventListener('click', (event) => {
        const eventTarget = event.target;
        if (eventTarget.classList.contains('filters-list__filter-item')) {
            document.querySelector('.filters-list__filter-item--active').classList.remove('filters-list__filter-item--active');
            eventTarget.classList.add('filters-list__filter-item--active');
            currentFilter = eventTarget.id;
            applyFilters(currentFilter);
        }
    })
}

function setScalePreserve() {
    const scaleButton = document.querySelector('.navigation__preserve-scale-input');
    const scaleButtonLabel = document.querySelector('.navigation__preserve-scale-label');
    scaleButtonLabel.classList.add('hidden');

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
                applyFilters.pictures.sort((post, next) => next.hashtags.length - post.hashtags.length);
                break;
            }
        }
        createDesk(applyFilters.pictures, applyFilters.effects);
    } catch (er) {
        console.log(er);
        createMessageWindow('There are problems with filters');
    }

}

export function start() {
    setSignUpButton();
    setScalePreserve();
    setOverlay();
    setFilters();
    getData((response) => {
        applyFilters(consts.FILTER_MODES.ID_UP, response);
    });
};