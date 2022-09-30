import { randomInt } from "/randoming.js";
import { generatePicsArray, PICS } from "/generatePics.js";

export function createDesk(number, containerWidth = 800, containerMargin = 15) {
    // get new pics array
    const picsArray = generatePicsArray(number);

    // prepare main elements
    const body = document.querySelector('body');
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');
    mainContainer.style.maxWidth = containerWidth + 'px';
    body.appendChild(mainContainer);

    // Set parameters
    const frameSize = containerWidth / 5 - containerMargin * 2;
    const addButtonYPos = Math.ceil((number / 5 + 0.1) / 2);

    // Start loop
    for (let i = 0; i < number; i++) {
        if (i == (addButtonYPos * 5 - 3)) { // if next element is button
            mainContainer.appendChild(createNewElement(
                'label', // tag
                ['add-button'], // classes
                'Add new', // test
                frameSize, // width
                frameSize, // height
                undefined, // color
                undefined, // url
                containerMargin // margin
            ));
        } else {
            const nextElement = picsArray[i];
            mainContainer.appendChild(createNewElement(
                'div',
                ['frame'],
                `
                ${nextElement['descripction']} 
                😀${nextElement['likes']}😀
                `,
                frameSize,
                frameSize,
                `${nextElement['url']}`,
                `${PICS[nextElement['url']]}`,
                containerMargin
            ));
        };
    };
};

function createNewElement(tag, classes = [], text = '', width = 1, height = 1, color, url = '', margin = 0) {
    const newElement = document.createElement(`${tag}`);
    for (let i = 0; i < classes.length; i++) {
        newElement.classList.add(`${classes[i]}`);
    };
    newElement.innerText = `${text}`;
    newElement.style.width = width + 'px';
    newElement.style.height = height + 'px';
    newElement.style.color = color;
    newElement.style.backgroundImage = `url(./img/${url})`;
    newElement.style.margin = margin + 'px';
    return newElement;
}

createDesk(randomInt(3, 30));