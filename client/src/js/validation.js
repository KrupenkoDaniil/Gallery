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
const tegInput = document.querySelector('.hashtags-section__input');
const TegReg = new RegExp('^#[A-Za-zА-Яа-я0-9]{0,20}$');

tegInput.addEventListener('input', () => {
    let inputValue = tegInput.value;
    if (inputValue[0] !== '#') {
        tegInput.setCustomValidity('You can\'t add hashtag without # at the first place!');
    } else if (inputValue.length > MAX_TEG_LENGTH) {
        tegInput.setCustomValidity(`Your hashtag name can\' be longer then ${MAX_TEG_LENGTH} words!`);
    } else if (!TegReg.test(inputValue)) {
        tegInput.setCustomValidity(`You can\'t use #, @, $, etc symbols and spaces in hashtag!`);
    }
    else {
        tegInput.setCustomValidity('');
    }
    tegInput.reportValidity();
});

// Set signUp form validation
const emailInput = document.querySelector('.signup-form__email');
const passwordInput = document.querySelector('.signup-form__password');
const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
const emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

emailInput.addEventListener('input', () => {
    let emailValue = emailInput.value;
    if (!emailReg.test(emailValue)) {
        emailInput.setCustomValidity('Your email is incorect!');
    } else {
        emailInput.setCustomValidity('');
    }
    emailInput.reportValidity();
})

passwordInput.addEventListener('input', () => {
    let passwordValue = passwordInput.value;
    if (!passwordReg.test(passwordValue)) {
        passwordInput.setCustomValidity('Your password is unexeptable!')
    } else {
        passwordInput.setCustomValidity('');
    }
    passwordInput.reportValidity();
});