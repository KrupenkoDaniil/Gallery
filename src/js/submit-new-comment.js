export function submitNewComment() {

    // Check if textarea has any content
    const textarea = document.getElementById('comment');
    const commenterName = document.querySelector('.add-comment__name');
    if (textarea.value !== '' && commenterName.value.length > 1) {

        // Find necessary elements
        const commentContainer = document.querySelector('.comments-container');
        const commentTemplate = document.getElementById('comment-template');

        // Set basics
        const commentName = commentTemplate.content.querySelector('.comment-section__nickname');
        const commentAvatar = commentTemplate.content.querySelector('.comment-section__avatar');
        commentAvatar.src = '../img/avatars/avatar-4.png';
        commentName.textContent = commenterName.value;

        // Comment text
        const commentText = commentTemplate.content.querySelector('.comment-section__text');
        commentText.textContent = textarea.value;


        // Creating a new comment clone
        const commentTextClone = commentTemplate.content.cloneNode(true);
        commentContainer.appendChild(commentTextClone);

        textarea.value = '';
        textarea.blur();
    } else {
        alert("Fill in all the fields!");
    }

}