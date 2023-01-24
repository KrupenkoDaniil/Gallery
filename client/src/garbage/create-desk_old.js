import { getData, deleteData } from "../js/server-api.js";
import { openModalWindow, showMessage } from "./work-with-modal-window.js";
import '../js/validation.js';
import { checkEffects } from "../js/noUiSlider.js";
import { generatePicsArray } from "../js/generate-pics-array.js"
import { shuffle } from "../js/randoming.js";
import * as consts from '../js/consts.js';



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
            consts.BODY.removeEventListener('click', bodyEventsHandler);
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