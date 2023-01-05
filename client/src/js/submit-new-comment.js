import * as consts from './variables.js';
import { setForm } from "./server-api";
import { openModalWindow } from "./work-with-modal-window.js";
import { applyFilters } from './create-desk.js';

export function submitNewComment(event) {
    // Check if textarea has any content
    const textarea = document.querySelector('.add-comment__textarea');
    // const commenterName = document.querySelector('.add-comment__name');
    if (textarea.value !== '') {
        // Find necessary elements
        const commentContainer = document.querySelector('.comments-container');
        const commentTemplate = document.getElementById('comment-template');
        const eventTarget = applyFilters.pictures.filter(pic => pic.id == event.target.id)[0];

        // Set basics
        const commentName = commentTemplate.content.querySelector('.comments-section__nickname');
        const commentAvatar = commentTemplate.content.querySelector('.comments-section__avatar');
        commentAvatar.src = '../img/avatars/avatar-4.png';
        commentName.textContent = 'Daniil';

        // Comment text
        const commentText = commentTemplate.content.querySelector('.comments-section__text');
        commentText.textContent = textarea.value;

        // Creating a new comment clone
        const commentTextClone = commentTemplate.content.cloneNode(true);


        setForm('comments', consts.COMMENT_FORM, [
            ['user_id', '1'],
            ['picture_id', eventTarget.id]
        ], (response) => {
            commentContainer.insertBefore(commentTextClone, commentContainer.children[0]);
            eventTarget.comments.push(response);
            textarea.value = '';
            textarea.blur();
        });


    } else {
        alert("Fill in all the fields!");
    }

}