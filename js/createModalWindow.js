import { PICS, generatePic } from './generatePics.js';
import { createNewComment } from './createNewComment.js';

const mainOverlay = document.querySelector('.overlay');
let targetElement, modalWindow;

// Set event for exeting modal window by pressing "Escape" button 
document.addEventListener('keydown', (event,) => {
    if (modalWindow !== undefined) {

        switch (event.code) {
            case 'Escape':
                closeModalWindow(modalWindow);
                break
            case 'Enter':
                if (document.querySelector('.comment__textarea:focus')) {
                    createNewComment(targetElement);
                }
                if (document.querySelector('.setting-section__textarea:focus')) {
                    submitPost();
                }
        }
    }
});
export function openModalWindow(event, picsArray) {
    if (event.target.classList.contains('frame')) { //! if we target frame
        targetElement = picsArray[event.target.getAttribute('id')];
        modalWindow = document.querySelector('.frame-window');

        // Set attributes and styles
        modalWindow.classList.add('active');
        modalWindow.style.top = '0';
        mainOverlay.style.display = 'block';

        // Set Image section
        let modalWindowText = modalWindow.querySelector('.image-section__text');
        let modalWindowLikes = modalWindow.querySelector('.image-section__likes');
        let modalWindowImg = modalWindow.querySelector('img');
        modalWindowText.textContent = `${targetElement['descripction']}`;
        modalWindowLikes.textContent = `Likes: ${targetElement['likes']}`;
        modalWindowImg.src = `../img/${PICS[targetElement['url']]}`;


        // Set exit button
        const exitButton = modalWindow.querySelector('.image-section__exit-button');
        setClickEvent(exitButton, closeModalWindow);

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
        const newCommentButton = document.querySelector('.comment__submit-button');
        const createNewCommentEvent = () => createNewComment(targetElement);
        setClickEvent(newCommentButton, createNewCommentEvent)



    } else if (event.target.classList.contains('add-button')) { //! if we target add button
        modalWindow = document.querySelector('.add-window');

        // Set attributes and styles
        modalWindow.classList.add('active');
        modalWindow.style.top = '0';
        mainOverlay.style.display = 'block';

        // Set image section
        const uploadButton = document.querySelector('.add-window__upload-label');
        uploadButton.addEventListener('click', uploadPicture);
        //TODO: write function for uploading new pic

        // Set exit button
        const exitButton = modalWindow.querySelector('.add-window__exit-button');
        setClickEvent(exitButton, closeModalWindow);

        // Set upload button
        const submitButton = document.querySelector('.setting-section__submit-button');
        setClickEvent(submitButton, submitPost)
        //TODO: Add submitting post by pressing ENTER

    } else if (modalWindow !== undefined // if modal window is set
        && modalWindow.classList.contains('active') // if modal window is active
        && event.target.closest('section') === null) { //! if we target any other part of the viewport
        closeModalWindow();
    }
}

function setClickEvent(eventElement, eventFunction) {
    if (setClickEvent.activeEvents == undefined) {
        setClickEvent.activeEvents = [];
    }
    eventElement.addEventListener('click', eventFunction);
    setClickEvent.activeEvents.push([eventElement, eventFunction]);
}

function closeModalWindow() {
    modalWindow.classList.remove('active');
    document.querySelector('.comments-section').innerHTML = '';
    modalWindow.style.top = '-100%';
    mainOverlay.style.display = 'none';
    for (let i = 0; i < setClickEvent.activeEvents.length; i++) {
        let eventElement = setClickEvent.activeEvents[i][0];
        let eventFunction = setClickEvent.activeEvents[i][1];
        eventElement.removeEventListener('click', eventFunction);
    }
}

function uploadPicture() {
}

function submitPost() {

    // Check if textarea has any content
    const textarea = document.querySelector('.setting-section__textarea');
    const fileInput = document.querySelector('.add-window__upload-input');
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
