// Set New Post Validation 
const newPostDescription = document.querySelector('#description');

newPostDescription.addEventListener('input', () => {
    if (newPostDescription.value.length > 140) {
        newPostDescription.setCustomValidity('Your description can\' be longer then 140 words!');
    } else {
        newPostDescription.setCustomValidity('');
    }
    newPostDescription.reportValidity();
});