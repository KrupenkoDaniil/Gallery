import { randomInt } from "./randoming.js";
import { openModalWindow } from "./createModalWindow.js";
import { generatePicsArray, PICS } from "./generatePics.js";

export function createDesk(number, containerWidth = 800, RowSize = 5, containerMargin = 15) {
    // Get new pics array
    const picsArray = generatePicsArray(number);
    // Prepare main container
    const body = document.querySelector('body');
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');
    mainContainer.style.maxWidth = containerWidth + 'px';
    body.addEventListener('click', (event) => openModalWindow(event, picsArray));
    body.appendChild(mainContainer);

    // Set parameters
    const frameSize = containerWidth / RowSize - containerMargin * 2;
    const addButtonYPos = Math.ceil((number / RowSize + 0.1) / 2);
    const rowHalf = Math.ceil(RowSize / 2);

    // Start loop
    let buttonSet = false;
    for (let i = 0; i < number; i++) {
        if (i == (addButtonYPos * RowSize - rowHalf) && !buttonSet) { // if next element is button
            const newElement = document.createElement(`label`);
            newElement.classList.add('add-button')
            newElement.innerText = 'Add new';
            newElement.style.width = frameSize + 'px';
            newElement.style.height = frameSize + 'px';
            newElement.style.margin = containerMargin + 'px';
            mainContainer.appendChild(newElement);
            buttonSet = true;
            i--;
        } else { // if next element is regular frame

            const nextElement = picsArray[i];

            // Create new frame
            const frameTemplate = document.getElementById('frame-template');
            const newFrame = frameTemplate.content.querySelector('.frame');
            newFrame.style.margin = containerMargin + 'px';
            newFrame.setAttribute('id', i);
            newFrame.style.width = frameSize + 'px';
            newFrame.style.height = frameSize + 'px';
            newFrame.style.color = nextElement['url'];
            newFrame.style.backgroundImage = `url(../img/${PICS[nextElement['url']]})`;

            const newFrameSpans = frameTemplate.content.querySelectorAll('span');
            newFrameSpans[0].textContent = `${nextElement['comments'].length}`;
            newFrameSpans[1].textContent = `${nextElement['likes']}`;

            const frameClone = frameTemplate.content.cloneNode(true);
            mainContainer.appendChild(frameClone);
        }
    }
}

createDesk(randomInt(3, 30));