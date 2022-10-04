import { randomInt } from "/randoming.js";
import { openModalWindow } from "/modalWindow.js";
import { generatePicsArray, PICS } from "/generatePics.js";

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
            const newElement = document.createElement('div');
            newElement.setAttribute('id', i);
            newElement.classList.add('frame');
            newElement.innerText = ` 
            Comments: ${nextElement['comments'].length} 
            Likes: ${nextElement['likes']} <3
            `;
            newElement.style.width = frameSize + 'px';
            newElement.style.height = frameSize + 'px';
            newElement.style.color = nextElement['url'];
            newElement.style.backgroundImage = `url(./img/${PICS[nextElement['url']]})`;
            newElement.style.margin = containerMargin + 'px';
            mainContainer.appendChild(newElement);
        }
    }
}

createDesk(randomInt(3, 30));