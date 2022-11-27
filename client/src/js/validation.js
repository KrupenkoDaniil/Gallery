// Main Constants
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_TEG_LENGTH = 20;

// Set New Post Validation 
const newPostDescription = document.querySelector('#description');

newPostDescription.addEventListener('input', () => {
    if (newPostDescription.value.length > MAX_DESCRIPTION_LENGTH) {
        newPostDescription.setCustomValidity(`Your description can\' be longer then ${MAX_DESCRIPTION_LENGTH} words!`);
    } else {
        newPostDescription.setCustomValidity('');
    }
    newPostDescription.reportValidity();
});

// Set New Teg Validation
const tegInput = document.querySelector('.hesh-tegs-section__input');
const reg = new RegExp('^#[A-Za-zА-Яа-я0-9]{0,20}$');

tegInput.addEventListener('input', () => {
    let inputValue = tegInput.value;
    if (inputValue[0] != '#') {
        tegInput.setCustomValidity('You can\'t add hesh-teg without # at the first place!');
    } else if (inputValue.length > MAX_TEG_LENGTH) {
        tegInput.setCustomValidity(`Your hesh-teg name can\' be longer then ${MAX_TEG_LENGTH} words!`);
    } else if (!reg.test(inputValue)) {
        tegInput.setCustomValidity(`You can\'t use #, @, $, etc symbols and spaces in hesh-teg!`);
    }
    else {
        tegInput.setCustomValidity('');
    }
    tegInput.reportValidity();
});