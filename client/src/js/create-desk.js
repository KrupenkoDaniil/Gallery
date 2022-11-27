import { getData } from "./server-api.js";
import { openModalWindow } from "./work-with-modal-window.js";
import './validation.js';
import { checkFilters } from "./noUiSlider.js";
import { generatePicsArray, PICS } from "./generate-pics-array.js";

export function createDesk(picsArray, containerWidth = 800, RowSize = 5, containerMargin = 15) {
    // Prepare main container
    const body = document.body;
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');
    mainContainer.style.maxWidth = containerWidth + 'px';

    // Set all modal windows' appearance
    body.addEventListener('click', (event) => openModalWindow(event, picsArray));
    body.appendChild(mainContainer);

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
            mainContainer.appendChild(newElement);
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
            newPost.style.color = PICS[nextElement['url']];

            // Set post image
            newPost.style.backgroundImage = `url(../img/${nextElement['url']})`;
            let pictureFilter = checkFilters(nextElement['effect']['inner_name'], nextElement['effect_level']);
            newPost.style.filter = `${pictureFilter[0]}(${pictureFilter[1]})`;

            // change template content
            const newPostSpans = postTemplate.content.querySelectorAll('span');
            newPostSpans[0].textContent = `${nextElement['comments'].length}`;
            newPostSpans[1].textContent = `${nextElement['likes']}`;

            const postClone = postTemplate.content.cloneNode(true);
            mainContainer.appendChild(postClone);
        }
    }
}

// async function fetchPics() {
//     try {
//         const response = await fetch('http://gallery:80/pictures?expand=comments');
//         const data = await response.json();
//         createDesk(data);
//     } catch (error) {
//         console.log(error);
//     }
// }
// fetchPics();

getData((response) => {
    // console.log(response);
    createDesk(response);
})
// createDesk(generatePicsArray(10));