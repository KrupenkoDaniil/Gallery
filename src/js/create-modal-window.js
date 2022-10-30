import { PICS, generatePic } from './generate-pics-array.js';
import { createNewComment } from './create-new-comment.js';
import { setEvent, removeEvents } from './click-events.js';

// Set main Constants
const mainOverlay = document.querySelector('.overlay');
const inputFile = document.querySelector('#file');

// Set event for exeting modal window by pressing "Escape" button 
let targetElement, modalWindow;
document.addEventListener('keydown', (event,) => {
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
        let modalWindowText = modalWindow.querySelector('.image-section__text');
        let modalWindowLikes = modalWindow.querySelector('.image-section__likes');
        modalWindowText.textContent = `${targetElement['descripction']}`;
        modalWindowLikes.textContent = `Likes: ${targetElement['likes']}`;
        modalWindowImg.src = `../img/${PICS[targetElement['url']]}`;


        // Set exit button
        const exitButton = modalWindow.querySelector('.image-section__exit-button');
        setEvent('click', exitButton, closeModalWindow);

        // Set comment section
        const targetElementComments = targetElement['comments'];
        const commentSection = document.querySelector('.comments-section');
        const commentTemplate = document.getElementById('comment-template');
        for (let i = 0; i < targetElementComments.length; i++) {
            // Comment header
            const commentNickname = commentTemplate.content.querySelector('.comment-section__nickname');
            const commentAvatar = commentTemplate.content.querySelector('.comment-section__avatar');
            commentAvatar.src = `${targetElementComments[i]['avatar']}`;
            commentAvatar.alt = `${targetElementComments[i]['avatar'].slice(14, 22)}`;
            commentNickname.textContent = `${targetElementComments[i]['name']}`;
            // Comment text
            const commentText = commentTemplate.content.querySelector('.comment-section__text');
            commentText.textContent = `${targetElementComments[i]['message']}`;
            // Comment clone
            const commentTextClone = commentTemplate.content.cloneNode(true);
            commentSection.appendChild(commentTextClone);
        }

        // Create new comment
        const newCommentButton = document.querySelector('.add-comment__submit-button');
        const createNewCommentEvent = () => createNewComment(targetElement);
        setEvent('click', newCommentButton, createNewCommentEvent);



    } else if (event.target.classList.contains('add-button')) { //! if we target add button
        modalWindow = document.querySelector('.add-window');

        setEvent('change', inputFile, uploadPicture);

        // Set exit button
        const exitButton = modalWindow.querySelector('.add-window__exit-button');
        setEvent('click', exitButton, closeModalWindow);

        // Change photo's scale
        const modalWindowImg = modalWindow.querySelector('.add-window__img');
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
    document.querySelector('.comments-section').innerHTML = '';
    modalWindow.style.top = '-100%';
    mainOverlay.style.display = 'none';
    inputFile.value = '';
    removeEvents();
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

function submitPost() {

    // Check if textarea has any content
    const textarea = document.querySelector('.setting-section__textarea');
    if (textarea.value !== '' && fileInput.value !== '') { //! we can create new post only if it has discription and img
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
    } else {
        alert("Fill in all necessities!")
    }
}
