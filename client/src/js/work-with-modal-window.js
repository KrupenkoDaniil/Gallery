import { PICS, generatePic } from './generate-pics-array.js';
import { submitNewComment } from './submit-new-comment.js';
import { setEvent, removeEvents } from './set-events.js';
import { setRange, checkFilters } from "./noUiSlider.js";
import { setForm } from "./server-api.js";
// import { LoaderTargetPlugin } from 'webpack';

// Set main Constants
const mainOverlay = document.querySelector('.overlay');
const inputFile = document.querySelector('#file');
const tegInput = document.querySelector('.hesh-tegs-section__input');
const COMENTS_TO_SHOW_AMOUNT = 5;
const MAX_TEG_LENGTH = 20;

// Set main Vars
let targetElement, modalWindow, modalWindowImg;
let targetElementComments = [];
let tegsArray = [];

// Set event for exeting modal window by pressing "Escape" button 
document.addEventListener('keydown', (event) => {
    if (modalWindow !== undefined) {
        switch (event.code) {
            case 'Escape':
                if (!document.querySelector('#description:focus')
                    && !document.querySelector('.hesh-tegs-section__input:focus')) { // check if new-port
                    closeModalWindow(modalWindow);
                }
                break;
            case 'Enter':
                if (document.querySelector('.add-comment__textarea:focus')) {
                    createNewComment(targetElement);
                }
                if (document.querySelector('.setting-section__textarea:focus')) {
                    submitPost();
                }
                if (document.querySelector('.hesh-tegs-section__input:focus')) {
                    addNewTeg();

                }
                break;
            case 'Backspace':
                if (document.querySelector('.hesh-tegs-section__input:focus') && tegInput.value == '#') {
                    tegInput.setCustomValidity('You can\'t delete #');
                    event.preventDefault();
                } else {
                    tegInput.setCustomValidity('');
                }
                tegInput.reportValidity();
                break;
        }
    }
});

export function openModalWindow(event, picsArray) {
    if (event.target.classList.contains('post')) { //! if we target post
        targetElement = picsArray[event.target.getAttribute('id')];
        modalWindow = document.querySelector('.post-window');
        setBasics(submitNewComment);

        // Set Image section
        modalWindowImg = modalWindow.querySelector('.image-section__img');
        const modalWindowText = modalWindow.querySelector('.image-section__text');
        const modalWindowLikes = modalWindow.querySelector('.image-section__likes');
        modalWindowText.textContent = `${targetElement['description']}`;
        modalWindowLikes.textContent = `Likes: ${targetElement['likes']}`;
        modalWindowImg.src = `../img/${targetElement['url']}`;

        let pictureFilter = checkFilters(targetElement['effect']['inner_name'], targetElement['effect_level']);
        modalWindowImg.style.filter = `${pictureFilter[0]}(${pictureFilter[1]})`;
        modalWindowImg.style.setProperty('--scale', targetElement['scale']);

        // Set comments section
        targetElement['comments'].forEach((item) => {
            targetElementComments.push(item);
        })
        const showCommentsButton = document.querySelector('.comments-section__show-comments-button');
        showComments(COMENTS_TO_SHOW_AMOUNT, showCommentsButton);
        setEvent('click', showCommentsButton, () => showComments(COMENTS_TO_SHOW_AMOUNT, showCommentsButton))

    } else if (event.target.classList.contains('add-button')) { //! if we target add button
        modalWindow = document.querySelector('.add-window');
        setEvent('change', inputFile, uploadPicture);

        // Change photo's scale
        modalWindowImg = modalWindow.querySelector('.image-section__img');
        const increaseScaleButton = document.querySelector('.scale-control-settings__increase-button');
        const decreaseScaleButton = document.querySelector('.scale-control-settings__decrease-button');

        // Set default scale 
        let scaleValue = 1;
        modalWindowImg.style.setProperty('--scale', scaleValue);

        // Set scale addEventListeners
        setEvent('click', increaseScaleButton, () => {
            if (scaleValue < 1) {
                modalWindowImg.style.setProperty('--scale', String(scaleValue + 0.25));
                scaleValue = +getComputedStyle(modalWindowImg).getPropertyValue('--scale');
            }
        })
        setEvent('click', decreaseScaleButton, () => {
            if (scaleValue > 0.25) {
                modalWindowImg.style.setProperty('--scale', String(scaleValue - 0.25));
                scaleValue = +getComputedStyle(modalWindowImg).getPropertyValue('--scale');
            }
        })

        // Remove Tegs
        const tegsContainer = modalWindow.querySelector('.hesh-tegs-section__hesh-tegs-container');
        setEvent('click', tegsContainer, (event) => {
            if (event.target.classList.contains('hesh-tegs-section__close-button')) {
                tegsContainer.removeChild(event.target.parentNode);
                const tegText = event.target.parentNode.childNodes[1].textContent;
                tegsArray.splice(tegsArray.indexOf(tegText), 1);
            }
        });

        // Put filter on photo
        const filtersField = document.querySelector('.setting-section__filters');
        setEvent('click', filtersField, applyFilters);

        // Set Submit button

        const submitButton = document.querySelector('.setting-section__submit-button');
        setEvent('submit', submitButton, submitPost)

    } else if (modalWindow !== undefined // if modal window is set
        && modalWindow.classList.contains('active') // if modal window is active
        && event.target.classList.contains('overlay')) { //! if we target overlay
        closeModalWindow();
    }
}

function setBasics(submitButtonFunc) {
    // Set Attributes and Styles
    modalWindow.classList.add('active');
    modalWindow.style.top = '0';
    mainOverlay.style.display = 'block';

    // Set Exit Button
    const exitButton = modalWindow.querySelector('.modal-window__exit-button');
    setEvent('click', exitButton, closeModalWindow);

    // Set Submit Button
    const submitButton = modalWindow.querySelector('button');
    setEvent('click', submitButton, submitButtonFunc);
}

function closeModalWindow() {
    modalWindow.classList.remove('active');

    // Null Tegs
    tegInput.value = '#';
    tegsArray = [];
    document.querySelector('.hesh-tegs-section__hesh-tegs-container').textContent = '';

    // Null Filters
    const activeLabel = document.querySelector('.setting-section__label--active');
    const activeRange = document.querySelector('.range');
    activeLabel ? activeLabel.classList.remove('setting-section__label--active') : null;
    activeRange ? activeRange.classList.remove('active') : null;

    // Null Comments
    document.querySelector('.comments-container').textContent = '';
    targetElementComments = [];

    // Null Styles
    modalWindow.style.top = '-100%';
    mainOverlay.style.display = 'none';
    inputFile.value = '';

    removeEvents();
}

function showComments(commentsNumber, showCommentsButton) {
    const commentSection = document.querySelector('.comments-container');
    const commentTemplate = document.getElementById('comment-template');

    // Check if we have enough comments
    showCommentsButton.classList.remove('hidden');
    if (targetElementComments.length <= 5) {
        commentsNumber = targetElementComments.length;
        showCommentsButton.classList.add('hidden');
    }
    for (let i = 0; i < commentsNumber; i++) {
        // Comment header
        const commentNickname = commentTemplate.content.querySelector('.comments-section__nickname');
        commentNickname.textContent = `${targetElementComments[0]['user']['name']}`;
        const commentAvatar = commentTemplate.content.querySelector('.comments-section__avatar');
        commentAvatar.src = `${targetElementComments[0]['user']['avatar']}`;
        commentAvatar.alt = `${targetElementComments[0]['user']['name']}`;
        // Comment text
        const commentText = commentTemplate.content.querySelector('.comments-section__text');
        commentText.textContent = `${targetElementComments[0]['message']}`;
        // Comment clone
        const commentTextClone = commentTemplate.content.cloneNode(true);
        commentSection.appendChild(commentTextClone);
        targetElementComments.shift();
    }
}

function uploadPicture() {
    const modalWindowImg = modalWindow.querySelector('.image-section__img');
    const reader = new FileReader();
    const selectedFile = inputFile.files[0];

    if (selectedFile) {
        reader.addEventListener('load', () => {
            modalWindowImg.src = reader.result;
        });
        reader.readAsDataURL(selectedFile);

        setBasics(submitPost);
    }
}

function addNewTeg() {
    // Create New Teg
    if (tegInput.value.length < 2) {
        alert('You can\'t add empty hesh-teg!');
    } else if (tegInput.value.length > MAX_TEG_LENGTH) {
        alert('You hesh-tag is too long!');
    } else if (tegsArray.includes(tegInput.value.toLowerCase())) { // check if you already have such teg
        alert('You already have such teg!');
    } else if (tegInput.validity.customError) { // check if you have forbidden symbols
        alert('You can\'t use #, @, $, etc symbols and spaces in hesh-teg!');
    } else if (tegsArray.length >= 5) {
        alert('You can add only 5 hesh-tegs!')
    } else {
        const tegsContainer = modalWindow.querySelector('.hesh-tegs-section__hesh-tegs-container');
        const tegTemplate = document.querySelector('#hesh-teg-template');
        const newTegText = tegTemplate.content.querySelector('.hesh-tegs-section__text');
        newTegText.textContent = tegInput.value;
        const tegClone = tegTemplate.content.cloneNode(true);
        tegsContainer.appendChild(tegClone);
        tegsArray.push(tegInput.value.toLowerCase());
        tegInput.value = '#';
    }
}

function applyFilters(event) {
    if (event.target.classList.contains('setting-section__label')) {
        let activeLabel = document.querySelector('.setting-section__label--active');
        activeLabel ? activeLabel.classList.remove('setting-section__label--active') : null;
        event.target.classList.add('setting-section__label--active');
    }
    if (event.target.classList.contains('setting-section__input')) {
        modalWindowImg.classList.length > 1 ? modalWindowImg.classList.remove(modalWindowImg.classList[1]) : null;
        let settings = {};
        switch (event.target.id) {
            case 'chrome':
                modalWindowImg.classList.add('filter-chrome');
                settings = {
                    min: 0,
                    max: 1,
                    step: 0.1,
                };
                break;
            case 'sepia':
                modalWindowImg.classList.add('filter-sepia');
                settings = {
                    min: 0,
                    max: 1,
                    step: 0.1,
                };
                break;
            case 'marvin':
                modalWindowImg.classList.add('filter-marvin');
                settings = {
                    min: 0,
                    max: 100,
                    step: 1,
                };
                break;
            case 'fobos':
                modalWindowImg.classList.add('filter-fobos');
                settings = {
                    min: 0,
                    max: 3,
                    step: 0.1,
                };
                break;
            case 'heat':
                modalWindowImg.classList.add('filter-heat');
                settings = {
                    min: 1,
                    max: 3,
                    step: 0.1,
                };
                break;
            case 'original':
                modalWindowImg.classList.add('filter-original');
                settings = {};
                break;
        }
        setRange(settings, event.target.id, modalWindowImg);
    }
}

function submitPost() {
    // // Check if textarea has any content
    // const textarea = document.querySelector('.setting-section__textarea');
    // if (textarea.value !== '' && modalWindowImg.src !== '') { //! we can create new post only if it has discription and img
    //     // Set active radio button
    //     let checkedRadioButton = modalWindow.querySelector('.setting-section__label--active').childNodes[1];

    //     //TODO: Add new post in general PICS object and set it in viewport
    //     const nextPostId = generatePic.maxPicId + 1;

    //     textarea.value = '';
    //     textarea.blur();
    // } else {
    //     alert("Fill in all necessities!")
    // }

    setForm((response) => {
        console.log(response);
    });

}