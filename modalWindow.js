import { PICS } from './generatePics.js';

export function openModalWindow(event, picsArray) {
    const modalWindow = document.querySelector('.modal-window');

    if (event.target.classList.contains('frame')) {
        const targetElement = picsArray[event.target.getAttribute('id')];

        // set Image section
        const windowExitButton = modalWindow.querySelector('.image-section__exit-button');
        let windowText = modalWindow.querySelector('.image-section__text');
        let windowLikes = modalWindow.querySelector('.image-section__likes');
        let mainImg = modalWindow.querySelector('img');
        windowText.textContent = `${targetElement['descripction']}`;
        windowLikes.textContent = `Likes: ${targetElement['likes']}`;
        mainImg.src = `/img/${PICS[targetElement['url']]}`;

        // Set comment section
        const targetElementComments = targetElement['comments'];
        for (let i = 0; i < targetElementComments.length; i++) {
            const commentSection = document.querySelector('.comments-section');
            const commentTemplate = document.getElementById('comment-template');
            // Comment header
            const commentNickname = commentTemplate.content.querySelector('.comment-section__nickname');
            const commentAvatar = commentTemplate.content.querySelector('.comment-section__avatar');
            commentAvatar.url = `${targetElementComments[i]['avatar']}`;
            commentAvatar.alt = `${targetElementComments[i]['avatar'].slice(6, 14)}`;
            commentNickname.textContent = `${targetElementComments[i]['name']}`;
            // Comment text
            const commentText = commentTemplate.content.querySelector('.comment-section__text');
            commentText.textContent = `${targetElementComments[i]['message']}`;
            // Creating a clone
            const commentTextClone = commentTemplate.content.cloneNode(true);
            commentSection.appendChild(commentTextClone);
        }

        windowExitButton.addEventListener('click', () => {
            modalWindow.classList.remove('active');
        })

        modalWindow.classList.toggle('active');

    } else if ((event.target.closest('section') === null) || (!event.target.closest('section').classList.contains('modal-window'))) {
        modalWindow.classList.remove('active');
    }
}