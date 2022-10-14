import { PICS, generatePic } from './generatePics.js';
import { createNewComment } from './createNewComment.js';

export function openModalWindow(event, picsArray) {
    const mainContainer = document.querySelector('.container');
    const frameModalWindow = document.querySelector('.frame-window')
    const addModalWindow = document.querySelector('.add-window')

    if (event.target.classList.contains('frame')
        && !frameModalWindow.classList.contains('active')
        && !addModalWindow.classList.contains('active')) { //! if we target frame
        const targetElement = picsArray[event.target.getAttribute('id')];

        // Set attributes and styles
        frameModalWindow.classList.add('active');
        frameModalWindow.style.top = '0';
        mainContainer.style.opacity = '.5';

        // Set Image section
        let windowText = frameModalWindow.querySelector('.image-section__text');
        let windowLikes = frameModalWindow.querySelector('.image-section__likes');
        let mainImg = frameModalWindow.querySelector('img');
        windowText.textContent = `${targetElement['descripction']}`;
        windowLikes.textContent = `Likes: ${targetElement['likes']}`;
        mainImg.src = `../img/${PICS[targetElement['url']]}`;


        // Set exit button
        const windowExitButton = frameModalWindow.querySelector('.image-section__exit-button');
        windowExitButton.addEventListener('click', () => {
            frameModalWindow.classList.remove('active');
            document.querySelector('.comments-section').innerHTML = '';
            frameModalWindow.style.top = '-100%';
            mainContainer.style.opacity = '1';
        })

        // Set comment section
        const targetElementComments = targetElement['comments'];
        const commentSection = document.querySelector('.comments-section');
        const commentTemplate = document.getElementById('comment-template');
        for (let i = 0; i < targetElementComments.length; i++) {
            // Comment header
            const commentNickname = commentTemplate.content.querySelector('.comment-section__nickname');
            const commentAvatar = commentTemplate.content.querySelector('.comment-section__avatar');
            commentAvatar.src = `${targetElementComments[i]['avatar']}`;
            commentAvatar.alt = `${targetElementComments[i]['avatar'].slice(6, 14)}`;
            commentNickname.textContent = `${targetElementComments[i]['name']}`;
            // Comment text
            const commentText = commentTemplate.content.querySelector('.comment-section__text');
            commentText.textContent = `${targetElementComments[i]['message']}`;
            // Comment clone
            const commentTextClone = commentTemplate.content.cloneNode(true);
            commentSection.appendChild(commentTextClone);
        }

        // Create new comment
        const newComment = document.querySelector('.comment__submit-button');
        newComment.addEventListener('click', (event) => createNewComment(event, targetElement));
        document.addEventListener('keydown', (event) => {
            if (event.code == 'Enter') {
                createNewComment(event, targetElement);
            }
        })

        // Set keydown event
        document.addEventListener('keydown', (event) => closeModalWindow(event, frameModalWindow, mainContainer));

    } else if (event.target.classList.contains('add-button')
        && !frameModalWindow.classList.contains('active')
        && !addModalWindow.classList.contains('active')) { //! if we target add button
        // Set attributes and styles
        addModalWindow.classList.add('active');
        addModalWindow.style.top = '0';
        mainContainer.style.opacity = '.5';

        // Set image section
        const uploadButton = document.querySelector('.add-window__upload-label');
        uploadButton.addEventListener('click', uploadPicture);
        //TODO: write function for uploading new pic

        // Set exit button
        const windowExitButton = addModalWindow.querySelector('.add-window__exit-button');
        windowExitButton.addEventListener('click', () => {
            addModalWindow.classList.remove('active');
            addModalWindow.style.top = '-100%';
            mainContainer.style.opacity = '1';
        })

        // Set upload button
        const submitButton = document.querySelector('.setting-section__submit-button');
        submitButton.addEventListener('click', submitPost);
        //TODO: Add submitting post by pressing ENTER


        // Set keydown event
        document.addEventListener('keydown', (event) => closeModalWindow(event, addModalWindow, mainContainer));

    } else if ((event.target.closest('section') === null)) { //! if we target any other part of the viewport
        // Null add window
        addModalWindow.classList.remove('active');

        // Null frame window
        frameModalWindow.classList.remove('active');
        document.querySelector('.comments-section').innerHTML = '';
        frameModalWindow.style.top = '-100%';
        addModalWindow.style.top = '-100%';
        mainContainer.style.opacity = '1';
    }
}

function closeModalWindow(event, modalWindow, mainContainer) {
    if (event.code == 'Escape') {
        modalWindow.classList.remove('active');
        document.querySelector('.comments-section').innerHTML = '';
        modalWindow.style.top = '-100%';
        mainContainer.style.opacity = '1';
        document.removeEventListener('keydown', closeModalWindow);
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
