import { setForm, getData, deleteData, createMessageWindow } from './server-api.js';
import { submitNewComment } from './submit-new-comment.js'
import { setRange, checkEffects } from "./noUiSlider.js";
import { setEvent, removeEvents } from "./set-events";
import { createDesk } from './create-desk';
import { applyFilters } from './start.js';
import * as consts from './consts.js';

let targetElement, modalWindowImg, userLike, likesSpan, scaleValue;
let appliedEffect = 1;
const tabs = document.querySelectorAll('.tab__item');
const tegsArray = [];
const targetElementComments = [];
document.addEventListener('keydown', (event) => {
    if (createModalWindow.modalWindow !== undefined) {
        switch (event.code) {
            case 'Escape':
                if (document.querySelector('.message__window')) {
                    removeMessageWindow();
                } else if (!document.querySelector('#description:focus')
                    && !document.querySelector('.hashtags-section__input:focus')) { // check if new-port
                    closeModalWindow();
                }
                break;
            case 'Enter':
                if (document.querySelector('.add-comment__textarea:focus')) {
                    event.preventDefault();
                    createModalWindow.modalWindow.querySelector('button[type="submit"]').click();
                }
                if (document.querySelector('.setting-section__textarea:focus')) {
                    event.preventDefault();
                    createModalWindow.modalWindow.querySelector('button[type="submit"]').click();
                }
                if (document.querySelector('.hashtags-section__input:focus')) {
                    event.preventDefault();
                    addNewTeg();
                }
                break;
            case 'Backspace':
                if (document.querySelector('.hashtags-section__input:focus') && consts.INPUT_TEG.value == '#') {
                    consts.INPUT_TEG.setCustomValidity('You can\'t delete #');
                    event.preventDefault();
                } else {
                    consts.INPUT_TEG.setCustomValidity('');
                }
                consts.INPUT_TEG.reportValidity();
                break;
        }
    }
});

export function createModalWindow(windowType, eventTarget) {
    switch (windowType) {
        case 'signUp': {
            createModalWindow.modalWindow = document.querySelector('.signup-window');
            setBasics();

            // Set Tabs
            const tabList = createModalWindow.modalWindow.querySelector('.tab__list');
            setEvent('click', tabList, setTabs);

            // Set Upload Avatar button
            setEvent('change', consts.INPUT_AVATAR, uploadAvatar);

            // Set Post Button
            const signUpButton = createModalWindow.modalWindow.querySelector('.signup__button');
            setEvent('click', signUpButton, signUp)

            const logInButton = createModalWindow.modalWindow.querySelector('.login-form__button');
            setEvent('click', logInButton, logIn);
            break;
        }
        case 'post': {
            targetElement = applyFilters.pictures[eventTarget.getAttribute('id')];
            createModalWindow.modalWindow = document.querySelector('.post-window');
            setBasics();

            // Set Hashtags section
            showHashTags(targetElement['hashtags']);

            // Set Image section
            likesSpan = createModalWindow.modalWindow.querySelector('.image-section__likes-label span');
            modalWindowImg = createModalWindow.modalWindow.querySelector('.image-section__img');
            const modalWindowDescription = createModalWindow.modalWindow.querySelector('.image-section__text');
            targetElement['description'] ? modalWindowDescription.textContent = `${targetElement['description']}` : null;
            modalWindowImg.src = `http://localhost:80/uploads/${targetElement['url']}`;
            let pictureEffect = checkEffects(targetElement['effect_id'], targetElement['effect_level']);
            modalWindowImg.style.filter = `${pictureEffect[0]}(${pictureEffect[1]})`;
            modalWindowImg.style.setProperty('--scale', targetElement['scale']);

            // Set Likes
            checkLikes();
            setEvent('change', consts.INPUT_LIKE, setLike);

            // Set comments section
            targetElement['comments'].forEach((item) => {
                targetElementComments.push(item);
            })
            targetElementComments.reverse();

            const setCommentsButton = document.querySelector('.comments-section__show-comments-button');

            setComments(consts.COMENTS_TO_SHOW_AMOUNT, setCommentsButton);
            setEvent('click', setCommentsButton, () => setComments(consts.COMENTS_TO_SHOW_AMOUNT, setCommentsButton));

            // Set submit Button
            const submitCommentButton = createModalWindow.modalWindow.querySelector('button[type="submit"]');
            submitCommentButton.id = targetElement.id;
            setEvent('click', submitCommentButton, submitNewComment);
            break;
        }
        case 'add': {
            createModalWindow.modalWindow = document.querySelector('.add-window');
            setEvent('change', consts.INPUT_FILE, uploadPicture);
            // Change photo's scale
            modalWindowImg = createModalWindow.modalWindow.querySelector('.image-section__img');
            const increaseScaleButton = document.querySelector('.scale-control-settings__increase-button');
            const decreaseScaleButton = document.querySelector('.scale-control-settings__decrease-button');

            // Set default scale 
            scaleValue = 1;
            modalWindowImg.style.setProperty('--scale', scaleValue);

            // Set scale addEventListeners
            setEvent('click', increaseScaleButton, () => {
                if (scaleValue < 1) {
                    scaleValue = scaleValue + 0.25;
                    modalWindowImg.style.setProperty('--scale', String(scaleValue));
                    // scaleValue = +getComputedStyle(modalWindowImg).getPropertyValue('--scale');

                }
            });
            setEvent('click', decreaseScaleButton, () => {
                if (scaleValue > 0.25) {
                    scaleValue = scaleValue - 0.25;
                    modalWindowImg.style.setProperty('--scale', String(scaleValue));
                    // scaleValue = +getComputedStyle(modalWindowImg).getPropertyValue('--scale');
                }
            });

            // Remove Tegs
            const tegsContainer = createModalWindow.modalWindow.querySelector('.hashtags-section__hashtags-container');
            setEvent('click', tegsContainer, (event) => {
                if (event.target.classList.contains('hashtags-section__close-button')) {
                    tegsContainer.removeChild(event.target.parentNode);
                    const tegText = event.target.parentNode.childNodes[1].textContent;
                    tegsArray.splice(tegsArray.indexOf(tegText), 1);
                }
            });

            // Put effect on photo
            const effectsField = document.querySelector('.setting-section__effects');
            setEvent('click', effectsField, applyEffects);

            // Set Submit button
            const submitButton = document.querySelector('.setting-section__submit-button');
            setEvent('click', submitButton, submitPost);
            break;
        }
    }
}

function setBasics() {
    // Set Attributes and Styles
    createModalWindow.modalWindow.classList.add('active');
    createModalWindow.modalWindow.style.top = '0';
    consts.MAIN_OVERLAY.style.display = 'block';

    // Set Exit Button
    const exitButton = createModalWindow.modalWindow.querySelector('.modal-window__exit-button');
    setEvent('click', exitButton, closeModalWindow);
}

export function closeModalWindow() {
    createModalWindow.modalWindow.classList.remove('active');

    // Null Tegs
    consts.INPUT_TEG.value = '#';
    tegsArray.length = 0;
    document.querySelector('.hashtags-section__hashtags-container').textContent = '';

    // Null effects
    modalWindowImg ? modalWindowImg.style.filter = 'none' : null;
    const activeLabel = document.querySelector('.setting-section__label--active');
    const originalEffectLabel = document.querySelector('#original_effect');
    createModalWindow.modalWindow ? createModalWindow.modalWindow.style.filter = 'none' : null;
    appliedEffect = 1;

    if (activeLabel !== originalEffectLabel) {
        activeLabel.classList.remove('setting-section__label--active');
        originalEffectLabel.classList.add('setting-section__label--active');
    }

    const activeRange = document.querySelector('.range');
    activeRange ? activeRange.classList.remove('active') : null;

    // Null Comments
    document.querySelector('.comments-container').textContent = '';
    targetElementComments.length = 0;

    // Null textareas
    const commentDescription = document.querySelector('.add-comment__textarea');
    commentDescription.value = '';

    const postDescription = document.querySelector('.setting-section__textarea');
    postDescription.value = '';

    // Null Styles
    createModalWindow.modalWindow.style.top = '-100%';
    consts.MAIN_OVERLAY.style.display = 'none';
    consts.INPUT_FILE.value = '';

    removeEvents();
}

function setTabs(event) {
    let currentTab = createModalWindow.modalWindow.querySelector('.tab__item--active');
    let currentForm = createModalWindow.modalWindow.querySelector(`#${currentTab.getAttribute('data-form')}`);

    if (currentTab) {
        currentTab.classList.remove('tab__item--active');
        currentForm.style.display = 'none';
    }

    const newTab = event.target;
    const newForm = createModalWindow.modalWindow.querySelector(`#${newTab.getAttribute('data-form')}`);
    newTab.classList.add('tab__item--active');
    newForm.style.display = 'flex';
}

function setComments(commentsNumber, showCommentsButton) {
    const commentSection = document.querySelector('.comments-container');
    const commentTemplate = document.querySelector('#comment-template');

    // Check if we have enough comments
    showCommentsButton.classList.remove('hidden');
    if (targetElementComments.length <= consts.COMENTS_TO_SHOW_AMOUNT) {
        commentsNumber = targetElementComments.length;
        showCommentsButton.classList.add('hidden');
    }

    const commentNickname = commentTemplate.content.querySelector('.comments-section__nickname');
    const commentAvatar = commentTemplate.content.querySelector('.comments-section__avatar');
    const commentText = commentTemplate.content.querySelector('.comments-section__text');
    for (let i = 0; i < commentsNumber; i++) {
        // Comment header
        commentNickname.textContent = `${targetElementComments[0]['user']['name']}`;
        commentAvatar.src = `http://localhost:80/uploads/avatars/${targetElementComments[0]['user']['avatar']}`;
        commentAvatar.alt = `${targetElementComments[0]['user']['name']}`;
        // Comment text
        commentText.textContent = `${targetElementComments[0]['message']}`;
        // Comment clone
        const commentTextClone = commentTemplate.content.cloneNode(true);
        commentSection.appendChild(commentTextClone);
        targetElementComments.shift();
    }
}

function showHashTags(hashtags) {
    const hashtagsContainer = document.querySelector('.image-section__hashtags-container');
    hashtagsContainer.textContent = '';
    hashtags.map((hashtag) => {
        const newHashtag = document.createElement('li');
        newHashtag.classList.add('image-section__hashtag-item');
        newHashtag.textContent = hashtag['name'] || hashtag;
        hashtagsContainer.appendChild(newHashtag);
    });
}

function checkLikes() {
    userLike = targetElement['likes'].filter(like => like['user_id'] === localStorage.getItem('user_id'))[0]; // find user's like
    likesSpan.textContent = targetElement['likes'].length;
}

function setLike() {
    let likeSVG = createModalWindow.modalWindow.querySelector('.image-section__like-svg');
    if (userLike) {
        targetElement['likes'].splice(targetElement['likes'].indexOf(userLike), 1);
        deleteData(`http://localhost:80/likes/${userLike.id}`);
        likeSVG.classList.remove('image-section__like-svg___liked');
        likeSVG.classList.add('image-section__like-svg___disliked');
        checkLikes();
    } else {
        setForm('likes', consts.LIKE_FORM, [
            ['user_id', window.localStorage.getItem('user_id')],
            ['picture_id', targetElement.id],
        ], (response) => {
            targetElement['likes'].push(response);
            checkLikes();
        }, 'change');
        likeSVG.classList.remove('image-section__like-svg___disliked');
        likeSVG.classList.add('image-section__like-svg___liked');
    }
}

function uploadPicture() {
    modalWindowImg = createModalWindow.modalWindow.querySelector('.image-section__img');
    const reader = new FileReader();
    const selectedFile = consts.INPUT_FILE.files[0];
    const extension = selectedFile.name.split('.').pop();

    if (selectedFile && consts.PICTURE_FORMATS.includes(extension)) {
        reader.addEventListener('load', () => {
            modalWindowImg.src = reader.result;
        });
        reader.readAsDataURL(selectedFile);

        setBasics();
    } else {
        createMessageWindow('Sorry, this extension is not allowed!');
    }
}

function addNewTeg() {
    // Create New Teg
    if (consts.INPUT_TEG.value.length < 2) {
        alert('You can\'t add empty hahtag!');
    } else if (consts.INPUT_TEG.value.length > consts.MAX_TEG_LENGTH) {
        alert('You hashtag is too long!');
    } else if (tegsArray.includes(consts.INPUT_TEG.value.toLowerCase())) { // check if you already have such teg
        alert('You already have such tag!');
    } else if (consts.INPUT_TEG.validity.customError) { // check if you have forbidden symbols
        alert('You can\'t use #, @, $, etc symbols and spaces in hashtag!');
    } else if (tegsArray.length >= 5) {
        alert('You can add only 5 hashtags!');
    } else {
        const tegsContainer = createModalWindow.modalWindow.querySelector('.hashtags-section__hashtags-container');
        const tegTemplate = document.querySelector('#hashtag-template');
        const newTegText = tegTemplate.content.querySelector('.hashtags-section__text');
        newTegText.textContent = consts.INPUT_TEG.value;
        const tegClone = tegTemplate.content.cloneNode(true);
        tegsContainer.appendChild(tegClone);
        tegsArray.push(consts.INPUT_TEG.value.toLowerCase());
        consts.INPUT_TEG.value = '#';
    }
}

function applyEffects(event) {
    if (event.target.classList.contains('setting-section__label')) {
        let activeLabel = document.querySelector('.setting-section__label--active');
        activeLabel ? activeLabel.classList.remove('setting-section__label--active') : null;
        event.target.classList.add('setting-section__label--active');
    }
    if (event.target.classList.contains('setting-section__effect')) {
        modalWindowImg.classList.length > 1 ? modalWindowImg.classList.remove(modalWindowImg.classList[1]) : null;
        appliedEffect = event.target.value;
        setRange(appliedEffect, modalWindowImg);
    }
}

function submitPost() {
    // Set Value input for form
    document.querySelector('.scale-control-settings__value').setAttribute('value', `${scaleValue * 100}%`);
    document.querySelector('.setting-section__effect-id').setAttribute('value', appliedEffect);
    setForm('pictures', consts.POST_FORM, [
        ['user_id', window.localStorage.getItem('user_id')],
        ['hashtags', tegsArray.join(' ')]
    ], (response) => {
        response.hashtags = tegsArray;
        applyFilters.pictures.push(response);
        createDesk(applyFilters.pictures, applyFilters.effects);
        createMessageWindow('Your post has been submited!')
        closeModalWindow();
        removeEvents();
    });
}

function uploadAvatar() {
    modalWindowImg = createModalWindow.modalWindow.querySelector('.signup-avatar__img');
    const reader = new FileReader();
    const selectedFile = consts.INPUT_AVATAR.files[0];

    if (selectedFile) {
        reader.addEventListener('load', () => {
            modalWindowImg.src = reader.result;
        });
        reader.readAsDataURL(selectedFile);
    }
}

function signUp() {
    setForm('users', consts.SIGNUP_FORM, [], (response) => {
        consts.LOGIN_FORM.querySelector('.login-form__email').value = consts.SIGNUP_FORM.querySelector('.signup-form__email').value;
        consts.LOGIN_FORM.querySelector('.login-form__password').value = consts.SIGNUP_FORM.querySelector('.signup-form__password').value;
        createModalWindow.modalWindow.querySelector('.login-form__button').click();
    });
}

export function logIn() {
    setForm('tokens', consts.LOGIN_FORM, [], (response) => {
        window.localStorage.setItem('token', response.token);
        window.localStorage.setItem('user_id', response.user.id);
        window.localStorage.setItem('token_id', response.id);
        window.localStorage.setItem('user_name', response.user.name);
        window.localStorage.setItem('user_avatar', response.user.avatar);
        getData((response) => {
            applyFilters(consts.FILTER_MODES.ID_UP, response);
            closeModalWindow();
        });
    });
}