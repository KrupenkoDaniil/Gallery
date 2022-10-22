import { generateComment } from "./generatePics.js";

export function createNewComment(targetElement) {

    // Check if textarea has any content
    const textarea = document.getElementById('comment');
    const commenterName = document.querySelector('.comment__name');
    if (textarea.value !== '' && commenterName.value.length > 1) {

        // Find necessary elements
        const commentSection = document.querySelector('.comments-section');
        const commentTemplate = document.getElementById('comment-template');

        // Set basics
        const commentName = commentTemplate.content.querySelector('.comment-section__nickname');
        const commentAvatar = commentTemplate.content.querySelector('.comment-section__avatar');
        commentAvatar.src = '../img/avatars/avatar-4.png';
        commentName.textContent = commenterName.value;

        // Comment text
        const commentText = commentTemplate.content.querySelector('.comment-section__text');
        commentText.textContent = textarea.value;

        // Creating new comment object
        const newComment = {
            id: generateComment.maxCommentId++ + 1, //? don't know how it works but it does!
            avatar: commentAvatar.src,
            message: textarea.value,
            name: commenterName.value
        };
        targetElement['comments'].push(newComment);

        // Creating a new comment clone
        const commentTextClone = commentTemplate.content.cloneNode(true);
        commentSection.appendChild(commentTextClone);

        textarea.value = '';
    } else {
        alert("Fill in all the fields!");
    }

}