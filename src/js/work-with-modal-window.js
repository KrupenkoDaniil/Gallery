import { PICS, generatePic } from './generate-pics-array.js';
import { createNewComment } from './create-new-comment.js';
import { setEvent, removeEvents } from './set-events.js';
import { setRange } from "./noUiSlider.js";

// Set main Constants
const mainOverlay = document.querySelector('.overlay');
const inputFile = document.querySelector('#file');
const targetElementComments = [];

// Set main Vars
let targetElement, modalWindow, modalWindowImg;

// Set event for exeting modal window by pressing "Escape" button 
document.addEventListener('keydown', (event) => {
    if (modalWindow !== undefined) {
        switch (event.code) {
            case 'Escape':
                closeModalWindow(modalWindow);
                break
            case 'Enter':
                if (document.querySelector('.add-comment__textarea:focus')) {
                    createNewComment(targetElement);
                }
                if (document.querySelector('.setting-section__textarea:focus')) {
                    submitPost();
                }
        }
    }
});
export function openModalWindow(event, picsArray) {
    if (event.target.classList.contains('post')) { //! if we target post
        targetElement = picsArray[event.target.getAttribute('id')];
        modalWindow = document.querySelector('.post-window');

        // Set attributes and styles
        modalWindow.classList.add('active');
        modalWindow.style.top = '0';
        mainOverlay.style.display = 'block';

        // Set Image section
        modalWindowImg = modalWindow.querySelector('img');
        const modalWindowText = modalWindow.querySelector('.image-section__text');
        const modalWindowLikes = modalWindow.querySelector('.image-section__likes');
        modalWindowText.textContent = `${targetElement['descripction']}`;
        modalWindowLikes.textContent = `Likes: ${targetElement['likes']}`;
        modalWindowImg.src = `../img/${PICS[targetElement['url']]}`;


        // Set exit button
        const exitButton = modalWindow.querySelector('.image-section__exit-button');
        setEvent('click', exitButton, closeModalWindow);

        // Set comments section
        targetElement['comments'].forEach((item) => {
            targetElementComments.push(item);
        })
        const showCommentsButton = document.querySelector('.comments-section__show-comments-button');
        showComments(5, showCommentsButton);
        setEvent('click', showCommentsButton, () => showComments(5, showCommentsButton))

        // Create new comment
        const newCommentButton = document.querySelector('.add-comment__submit-button');
        setEvent('click', newCommentButton, createNewComment);



    } else if (event.target.classList.contains('add-button')) { //! if we target add button
        modalWindow = document.querySelector('.add-window');

        setEvent('change', inputFile, uploadPicture);

        // Set exit button
        const exitButton = modalWindow.querySelector('.add-window__exit-button');
        setEvent('click', exitButton, closeModalWindow);

        // Change photo's scale
        modalWindowImg = modalWindow.querySelector('.add-window__img');
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

        // Put filter on photo
        const filtersField = document.querySelector('.setting-section__filters');
        setEvent('click', filtersField, applyFilters);

        // Set submit button
        const submitButton = document.querySelector('.setting-section__submit-button');
        setEvent('click', submitButton, submitPost)

    } else if (modalWindow !== undefined // if modal window is set
        && modalWindow.classList.contains('active') // if modal window is active
        && event.target.closest('section') === null) { //! if we target any other part of the viewport
        closeModalWindow();
    }
}

function closeModalWindow() {
    modalWindow.classList.remove('active');
    document.querySelector('.comments-container').innerHTML = '';
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
        const commentNickname = commentTemplate.content.querySelector('.comment-section__nickname');
        const commentAvatar = commentTemplate.content.querySelector('.comment-section__avatar');
        commentAvatar.src = `${targetElementComments[0]['avatar']}`;
        commentAvatar.alt = `${targetElementComments[0]['name']}`;
        commentNickname.textContent = `${targetElementComments[0]['name']}`;
        // Comment text
        const commentText = commentTemplate.content.querySelector('.comment-section__text');
        commentText.textContent = `${targetElementComments[0]['message']}`;
        // Comment clone
        const commentTextClone = commentTemplate.content.cloneNode(true);
        commentSection.appendChild(commentTextClone);
        targetElementComments.shift();
    }
}

function uploadPicture() {
    const modalWindowImg = modalWindow.querySelector('.add-window__img');
    const reader = new FileReader();
    const selectedFile = inputFile.files[0];

    if (selectedFile) {
        reader.addEventListener('load', () => {
            modalWindowImg.src = reader.result;
        });
        reader.readAsDataURL(selectedFile);
        // Set attributes and styles
        modalWindow.classList.add('active');
        modalWindow.style.top = '0';
        mainOverlay.style.display = 'block';
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
            case 'filter-chrome':
                modalWindowImg.classList.add('filter-chrome');
                settings = {
                    min: 0,
                    max: 1,
                    step: 0.1,
                    filter: 'grayscale'
                };
                break;
            case 'filter-sepia':
                modalWindowImg.classList.add('filter-sepia');
                settings = {
                    min: 0,
                    max: 1,
                    step: 0.1,
                    filter: 'sepia'
                };
                break;
            case 'filter-marvin':
                modalWindowImg.classList.add('filter-marvin');
                settings = {
                    min: 0,
                    max: 100,
                    step: 1,
                    filter: 'invert'
                };
                break;
            case 'filter-fobos':
                modalWindowImg.classList.add('filter-fobos');
                settings = {
                    min: 0,
                    max: 3,
                    step: 0.1,
                    filter: 'blur'
                };
                break;
            case 'filter-znoi':
                modalWindowImg.classList.add('filter-znoi');
                settings = {
                    min: 1,
                    max: 3,
                    step: 0.1,
                    filter: 'brightness'
                };
                break;
            case 'filter-original':
                modalWindowImg.classList.add('filter-original');
                settings = {};
                break;
        }
        setRange(settings, modalWindowImg);

    }
}

function submitPost() {
    // Check if textarea has any content
    const textarea = document.querySelector('.setting-section__textarea');
    if (textarea.value !== '' && modalWindowImg.src !== '') { //! we can create new post only if it has discription and img
        // Set active radio button
        let radioButton;
        document.querySelectorAll('.setting-section__radiobutton').forEach((button) => {
            if (button.checked) {
                radioButton = button;
            }
        });
        //TODO: Add setting different filters on photo

        //TODO: Add new post in general PICS object and set it in viewport
        const nextPostId = generatePic.maxPicId + 1;

        textarea.value = '';
        textarea.blur();
    } else {
        alert("Fill in all necessities!")
    }
}
