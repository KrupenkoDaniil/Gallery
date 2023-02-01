
import { deleteData } from "./server-api.js";
import { checkEffects } from "./noUiSlider.js";
import * as consts from './consts.js';

export function createDesk(picsArray, effects, containerWidth = 800, RowSize = 5, containerMargin = 15) {

    // Prepare main container
    consts.MAIN_CONTAINER.innerHTML = '';
    consts.MAIN_CONTAINER.style.maxWidth = containerWidth + 'px';

    // Set all modal windows' appearance
    consts.BODY.appendChild(consts.MAIN_CONTAINER);


    const filtersList = document.querySelector('.filters-list');
    const scaleButtonLabel = document.querySelector('.navigation__preserve-scale-label');
    const userSection = document.querySelector('.navigation__signup-button');
    userSection.innerHTML = '';
    if (localStorage.getItem('token')) {
        // Set filters & preserve btn
        filtersList.classList.remove('hidden');
        scaleButtonLabel.classList.remove('hidden');

        // Set user info
        const userAvatar = document.createElement('img');
        userAvatar.src = `http://localhost:80/uploads/avatars/${window.localStorage.getItem('user_avatar')}`;
        userAvatar.classList.add('navigation__user-avatar');
        userSection.appendChild(userAvatar);

        const userName = document.createElement('h3');
        userName.classList.add('navigation__username');
        userName.textContent = window.localStorage.getItem('user_name');
        userSection.appendChild(userName);

        const userLogOutButton = document.createElement('h3');
        userLogOutButton.type = 'submit';
        userLogOutButton.textContent = 'Log Out';
        userLogOutButton.classList.add('navigation__signup-text');
        userSection.appendChild(userLogOutButton);
        userLogOutButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (confirm('Do you want to log out?')) {
                deleteData(consts.POST_URLS['tokens'] + '/' + localStorage.getItem('token_id'), false);
                localStorage.clear();
                createDesk([], []);
            }
        });
    } else {
        // Set filters & preserve btn
        filtersList.classList.add('hidden');
        scaleButtonLabel.classList.add('hidden');

        const signUpButton = document.createElement('h3');
        signUpButton.classList.add('navigation__signup-text');
        signUpButton.textContent = 'SignUp!';
        userSection.appendChild(signUpButton);
    }

    // Set parameters
    const postSize = containerWidth / RowSize - containerMargin * 2;
    const addButtonYPos = Math.ceil((picsArray.length / RowSize + 0.1) / 2);
    const rowHalf = Math.ceil(RowSize / 2);

    // Start loop
    let buttonSet = false;

    for (let i = 0; i < picsArray.length; i++) {
        if (i == (addButtonYPos * RowSize - rowHalf) && !buttonSet) { // if next element is button
            const newElement = document.createElement('label');
            newElement.classList.add('add-button');
            newElement.setAttribute('for', 'file');
            newElement.innerText = 'Add new';
            newElement.style.width = postSize + 'px';
            newElement.style.height = postSize + 'px';
            newElement.style.margin = containerMargin + 'px';
            consts.MAIN_CONTAINER.appendChild(newElement);
            buttonSet = true;
            i--;
        } else { // if next element is regular frame
            const nextElement = picsArray[i];

            // Create new post
            const postTemplate = document.getElementById('post-template');
            const newPost = postTemplate.content.querySelector('.post');
            newPost.style.margin = containerMargin + 'px';
            newPost.setAttribute('id', i);
            newPost.style.width = postSize + 'px';
            newPost.style.height = postSize + 'px';
            newPost.style.color = consts.PICS[nextElement['url']];

            // Set post image
            newPost.style.backgroundImage = `url(http://localhost:80/uploads/${nextElement['url']})`;
            let pictureFilter = checkEffects(nextElement['effect_id'], nextElement['effect_level'], effects);
            pictureFilter[0] === null ? newPost.style.filter = 'none' : newPost.style.filter = `${pictureFilter[0]}(${pictureFilter[1]})`;

            // change template content
            const newPostSpans = postTemplate.content.querySelectorAll('span');
            newPostSpans[0].textContent = `${nextElement['comments'].length}`;
            newPostSpans[1].textContent = `${nextElement['likes'].length}`;

            const postClone = postTemplate.content.cloneNode(true);
            consts.MAIN_CONTAINER.appendChild(postClone);
        }
    }

    if (picsArray.length < 3 && !buttonSet && localStorage.getItem('token')) { // delete < !buttonSet >
        const newElement = document.createElement('label');
        newElement.classList.add('add-button');
        newElement.setAttribute('for', 'file');
        newElement.innerText = 'Add new';
        newElement.style.width = postSize + 'px';
        newElement.style.height = postSize + 'px';
        newElement.style.margin = containerMargin + 'px';
        consts.MAIN_CONTAINER.appendChild(newElement);
        checkEffects(1, 0, effects);
        buttonSet = true;
    }
}