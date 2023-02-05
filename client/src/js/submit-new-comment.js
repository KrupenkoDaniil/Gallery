import { createMessageWindow } from './server-api.js';
import { applyFilters } from './start.js';
import { setForm } from "./server-api";
import * as consts from './consts.js';

export function submitNewComment(event) {
    // Check if textarea has any content
    const textarea = document.querySelector('.add-comment__textarea');
    if (textarea.value !== '') {
        // Find necessary elements
        const commentContainer = document.querySelector('.comments-container');
        const commentTemplate = document.getElementById('comment-template');
        const eventTarget = applyFilters.pictures.filter(pic => pic.id == event.target.id)[0];

        // Set basics
        const commentName = commentTemplate.content.querySelector('.comments-section__nickname');
        const commentAvatar = commentTemplate.content.querySelector('.comments-section__avatar');
        commentAvatar.src = `http://localhost:80/uploads/avatars/${window.localStorage.getItem('user_avatar')}`;
        commentName.textContent = window.localStorage.getItem('user_name');

        // Comment text
        const commentText = commentTemplate.content.querySelector('.comments-section__text');
        commentText.textContent = textarea.value;

        // Creating a new comment clone
        const commentTextClone = commentTemplate.content.cloneNode(true);


        setForm('comments', consts.COMMENT_FORM, [
            ['user_id', window.localStorage.getItem('user_id')],
            ['picture_id', eventTarget.id]
        ], (response) => {
            commentContainer.insertBefore(commentTextClone, commentContainer.children[0]);
            eventTarget.comments.push(response);
            textarea.value = '';
            textarea.blur();
        });
    }
}