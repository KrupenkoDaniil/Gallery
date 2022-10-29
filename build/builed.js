/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Document</title>\r\n</head>\r\n<body>\r\n    <div class=\"overlay\"></div>\r\n    \r\n    <section class=\"post-window\"> \r\n        <div class=\"post-window__image-section image-section\">\r\n            <img class=\"image-section__img\" src=\"#\" alt=\"picture\">\r\n            <a href=\"#\" class=\"image-section__exit-button\"></a>\r\n            <div class=\"image-section__title\">\r\n                <p class=\"image-section__text\"></p>\r\n                <div class=\"image-section__likes\"></div>\r\n            </div>\r\n        </div>\r\n        <hr>\r\n        <div class=\"post-window__comment-container\">\r\n            <div class=\"post-window__comments-section comments-section\">\r\n            </div>\r\n            <div class=\"post-window__show-comments-button button\">Show More Comments</div>\r\n        </div>\r\n        <form class=\"post-window__add-comment add-comment\" method=\"GET\">\r\n            <input class=\"add-comment__name\" type=\"text\" list=\"names\" placeholder=\"Your name\" required>\r\n            <datalist id=\"names\">\r\n                <option value=\"Daniil Krupenko\"></option>\r\n                <option value=\"Vasia Pypkin\"></option>\r\n            </datalist>\r\n            <textarea class=\"add-comment__textarea textarea\" name=\"comment\" id=\"comment\" placeholder=\"Your comment here\" required></textarea>\r\n            <div class=\"add-comment__submit-button button\">Submit</div>\r\n        </form>\r\n    </section>\r\n\r\n    <section class=\"add-window\">\r\n        <div class=\"add-window__image-section image-section\">\r\n            <div class=\"add-window__img-container\">\r\n                <img class=\"add-window__img\" src=\"#\" alt=\"new-pic\">\r\n            </div>\r\n            <input id=\"file\" name=\"file\" type=\"file\" accept=\"image/png, image/jpeg\" class=\"add-window__upload-input\">\r\n            <a href=\"#\" class=\"add-window__exit-button\"></a>\r\n        </div>\r\n        <hr>\r\n        <form method=\"GET\" class=\"setting-section\">\r\n            <label class=\"setting-section__label\" for=\"filter\">Choose filters:</label>\r\n            <input class=\"setting-section__radiobutton\" type=\"radio\" name=\"filter\" id=\"\">\r\n            <input class=\"setting-section__radiobutton\" type=\"radio\" name=\"filter\" id=\"\">\r\n            <input class=\"setting-section__radiobutton\" type=\"radio\" name=\"filter\" id=\"\">\r\n            <input class=\"setting-section__radiobutton\" type=\"radio\" name=\"filter\" id=\"\">\r\n            <input class=\"setting-section__radiobutton\" type=\"radio\" name=\"filter\" id=\"\">\r\n            <input class=\"setting-section__radiobutton\" type=\"radio\" name=\"filter\" id=\"\">\r\n            <input class=\"setting-section__radiobutton\" type=\"radio\" name=\"filter\" id=\"\">\r\n            <br>\r\n            <textarea class=\"setting-section__textarea textarea\" name=\"description\" id=\"description\" placeholder=\"Write description\" required></textarea>\r\n            <!-- make it anchor -->\r\n            <div class=\"setting-section__submit-button\">Upload new post</div>\r\n        </form>\r\n    </section>\r\n\r\n    <template id='comment-template'>\r\n        <div class=\"comments-section__comment\">\r\n            <div class=\"comment-section__title\">\r\n                <img class=\"comment-section__avatar\" src=\"#\" alt=\"picture\">\r\n                <p class=\"comment-section__nickname\"></p>\r\n            </div>\r\n            <p class=\"comment-section__text\"></p>\r\n        </div>\r\n    </template>\r\n\r\n    <template id=\"post-template\" type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\">\r\n        <div class=\"post\">\r\n            <h5>Comments:<span></span></h5>\r\n            <h5>Likes:<span></span></h5>\r\n        </div>\r\n    </template>\r\n</body>\r\n</html>\r\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/click-events.js":
/*!********************************!*\
  !*** ./src/js/click-events.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeEvents": () => (/* binding */ removeEvents),
/* harmony export */   "setEvent": () => (/* binding */ setEvent)
/* harmony export */ });

function setEvent(eventName, eventElement, eventFunction) {
    if (setEvent.activeEvents == undefined) {
        setEvent.activeEvents = [];
    }
    eventElement.addEventListener(eventName, eventFunction);
    setEvent.activeEvents.push([eventElement, eventFunction]);
}

function removeEvents(eventName) {
    for (let i = 0; i < setEvent.activeEvents.length; i++) {
        let eventElement = setEvent.activeEvents[i][0];
        let eventFunction = setEvent.activeEvents[i][1];
        eventElement.removeEventListener(eventName, eventFunction);
    }
}

/***/ }),

/***/ "./src/js/create-desk.js":
/*!*******************************!*\
  !*** ./src/js/create-desk.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDesk": () => (/* binding */ createDesk)
/* harmony export */ });
/* harmony import */ var _randoming_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randoming.js */ "./src/js/randoming.js");
/* harmony import */ var _create_modal_window_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-modal-window.js */ "./src/js/create-modal-window.js");
/* harmony import */ var _generate_pics_array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generate-pics-array.js */ "./src/js/generate-pics-array.js");




function createDesk(picsArray, containerWidth = 800, RowSize = 5, containerMargin = 15) {
    // Prepare main container
    const body = document.querySelector('body');
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');
    mainContainer.style.maxWidth = containerWidth + 'px';

    // Set all modal windows' appearance
    body.addEventListener('click', (event) => (0,_create_modal_window_js__WEBPACK_IMPORTED_MODULE_1__.openModalWindow)(event, picsArray));
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
            newPost.style.color = nextElement['url'];
            newPost.style.backgroundImage = `url(./img/${_generate_pics_array_js__WEBPACK_IMPORTED_MODULE_2__.PICS[nextElement['url']]})`;

            // change template content
            const newPostSpans = postTemplate.content.querySelectorAll('span');
            newPostSpans[0].textContent = `${nextElement['comments'].length}`;
            newPostSpans[1].textContent = `${nextElement['likes']}`;

            const postClone = postTemplate.content.cloneNode(true);
            mainContainer.appendChild(postClone);
        }
    }
}

createDesk((0,_generate_pics_array_js__WEBPACK_IMPORTED_MODULE_2__.generatePicsArray)((0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(10, 30)));

/***/ }),

/***/ "./src/js/create-modal-window.js":
/*!***************************************!*\
  !*** ./src/js/create-modal-window.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openModalWindow": () => (/* binding */ openModalWindow)
/* harmony export */ });
/* harmony import */ var _generate_pics_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generate-pics-array.js */ "./src/js/generate-pics-array.js");
/* harmony import */ var _create_new_comment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-new-comment.js */ "./src/js/create-new-comment.js");
/* harmony import */ var _click_events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./click-events.js */ "./src/js/click-events.js");




// Set main Constants
const mainOverlay = document.querySelector('.overlay');
const inputFile = document.querySelector('#file');

// Set event for exeting modal window by pressing "Escape" button 
let targetElement, modalWindow;
document.addEventListener('keydown', (event,) => {
    if (modalWindow !== undefined) {
        switch (event.code) {
            case 'Escape':
                closeModalWindow(modalWindow);
                break
            case 'Enter':
                if (document.querySelector('.add-comment__textarea:focus')) {
                    (0,_create_new_comment_js__WEBPACK_IMPORTED_MODULE_1__.createNewComment)(targetElement);
                }
                if (document.querySelector('.setting-section__textarea:focus')) {
                    submitPost();
                }
        }
    }
});
function openModalWindow(event, picsArray) {
    if (event.target.classList.contains('post')) { //! if we target post
        targetElement = picsArray[event.target.getAttribute('id')];
        modalWindow = document.querySelector('.post-window');

        // Set attributes and styles
        modalWindow.classList.add('active');
        modalWindow.style.top = '0';
        mainOverlay.style.display = 'block';

        // Set Image section
        let modalWindowImg = modalWindow.querySelector('img');
        let modalWindowText = modalWindow.querySelector('.image-section__text');
        let modalWindowLikes = modalWindow.querySelector('.image-section__likes');
        modalWindowText.textContent = `${targetElement['descripction']}`;
        modalWindowLikes.textContent = `Likes: ${targetElement['likes']}`;
        modalWindowImg.src = `../img/${_generate_pics_array_js__WEBPACK_IMPORTED_MODULE_0__.PICS[targetElement['url']]}`;


        // Set exit button
        const exitButton = modalWindow.querySelector('.image-section__exit-button');
        (0,_click_events_js__WEBPACK_IMPORTED_MODULE_2__.setEvent)('click', exitButton, closeModalWindow);

        // Set comment section
        const targetElementComments = targetElement['comments'];
        const commentSection = document.querySelector('.comments-section');
        const commentTemplate = document.getElementById('comment-template');
        for (let i = 0; i < targetElementComments.length; i++) {
            // Comment header
            const commentNickname = commentTemplate.content.querySelector('.comment-section__nickname');
            const commentAvatar = commentTemplate.content.querySelector('.comment-section__avatar');
            commentAvatar.src = `${targetElementComments[i]['avatar']}`;
            commentAvatar.alt = `${targetElementComments[i]['avatar'].slice(14, 22)}`;
            commentNickname.textContent = `${targetElementComments[i]['name']}`;
            // Comment text
            const commentText = commentTemplate.content.querySelector('.comment-section__text');
            commentText.textContent = `${targetElementComments[i]['message']}`;
            // Comment clone
            const commentTextClone = commentTemplate.content.cloneNode(true);
            commentSection.appendChild(commentTextClone);
        }

        // Create new comment
        const newCommentButton = document.querySelector('.add-comment__submit-button');
        const createNewCommentEvent = () => (0,_create_new_comment_js__WEBPACK_IMPORTED_MODULE_1__.createNewComment)(targetElement);
        (0,_click_events_js__WEBPACK_IMPORTED_MODULE_2__.setEvent)('click', newCommentButton, createNewCommentEvent);



    } else if (event.target.classList.contains('add-button')) { //! if we target add button
        modalWindow = document.querySelector('.add-window');

        (0,_click_events_js__WEBPACK_IMPORTED_MODULE_2__.setEvent)('change', inputFile, uploadPicture);

        // Set exit button
        const exitButton = modalWindow.querySelector('.add-window__exit-button');
        (0,_click_events_js__WEBPACK_IMPORTED_MODULE_2__.setEvent)('click', exitButton, closeModalWindow);

        // Set submit button
        const submitButton = document.querySelector('.setting-section__submit-button');
        (0,_click_events_js__WEBPACK_IMPORTED_MODULE_2__.setEvent)('click', submitButton, submitPost)

    } else if (modalWindow !== undefined // if modal window is set
        && modalWindow.classList.contains('active') // if modal window is active
        && event.target.closest('section') === null) { //! if we target any other part of the viewport
        closeModalWindow();
    }
}

function closeModalWindow() {
    modalWindow.classList.remove('active');
    document.querySelector('.comments-section').innerHTML = '';
    modalWindow.style.top = '-100%';
    mainOverlay.style.display = 'none';
    (0,_click_events_js__WEBPACK_IMPORTED_MODULE_2__.removeEvents)('click');
    (0,_click_events_js__WEBPACK_IMPORTED_MODULE_2__.removeEvents)('change');
}

function uploadPicture() {
    const modalWindowImg = modalWindow.querySelector('img');
    const reader = new FileReader();
    const selectedFile = inputFile.files[0];

    if (selectedFile) {
        reader.addEventListener('load', () => {
            modalWindowImg.src = reader.result;
        });
        reader.readAsDataURL(selectedFile);

        // Set attributes and styles
        modalWindow.classList.add('active');
        modalWindow.style.top = '0';
        mainOverlay.style.display = 'block';
    }
}

function submitPost() {

    // Check if textarea has any content
    const textarea = document.querySelector('.setting-section__textarea');

    if (textarea.value !== '' && fileInput.value !== '') { //! we can create new post only if it has discription and img
        // Set active radio button
        let radioButton;
        document.querySelectorAll('.setting-section__radiobutton').forEach((button) => {
            if (button.checked) {
                radioButton = button;
            }
        });
        //TODO: Add setting different filters on photo

        //TODO: Add new post in general PICS object and set it in viewport
        const nextPostId = _generate_pics_array_js__WEBPACK_IMPORTED_MODULE_0__.generatePic.maxPicId + 1;

        textarea.value = '';
    } else {
        alert("Fill in all necessities!")
    }
}


/***/ }),

/***/ "./src/js/create-new-comment.js":
/*!**************************************!*\
  !*** ./src/js/create-new-comment.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNewComment": () => (/* binding */ createNewComment)
/* harmony export */ });
/* harmony import */ var _generate_pics_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generate-pics-array.js */ "./src/js/generate-pics-array.js");


function createNewComment(targetElement) {

    // Check if textarea has any content
    const textarea = document.getElementById('comment');
    const commenterName = document.querySelector('.add-comment__name');
    if (textarea.value !== '' && commenterName.value.length > 1) {

        // Find necessary elements
        const commentSection = document.querySelector('.comments-section');
        const commentTemplate = document.getElementById('comment-template');

        // Set basics
        const commentName = commentTemplate.content.querySelector('.comment-section__nickname');
        const commentAvatar = commentTemplate.content.querySelector('.comment-section__avatar');
        commentAvatar.src = '../img/avatars/avatar-4.png';
        commentName.textContent = commenterName.value;

        // Comment text
        const commentText = commentTemplate.content.querySelector('.comment-section__text');
        commentText.textContent = textarea.value;

        // Creating new comment object
        const newComment = {
            id: _generate_pics_array_js__WEBPACK_IMPORTED_MODULE_0__.generateComment.maxCommentId++ + 1, //? don't know how it works but it does!
            avatar: commentAvatar.src,
            message: textarea.value,
            name: commenterName.value
        };
        targetElement['comments'].push(newComment);

        // Creating a new comment clone
        const commentTextClone = commentTemplate.content.cloneNode(true);
        commentSection.appendChild(commentTextClone);

        textarea.value = '';
    } else {
        alert("Fill in all the fields!");
    }

}

/***/ }),

/***/ "./src/js/generate-pics-array.js":
/*!***************************************!*\
  !*** ./src/js/generate-pics-array.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PICS": () => (/* binding */ PICS),
/* harmony export */   "generateComment": () => (/* binding */ generateComment),
/* harmony export */   "generatePic": () => (/* binding */ generatePic),
/* harmony export */   "generatePicsArray": () => (/* binding */ generatePicsArray)
/* harmony export */ });
/* harmony import */ var _randoming_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randoming.js */ "./src/js/randoming.js");


const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MAX_COMMENT_COUNT = 10;
const PICS = {
    'gold': 'section_pic_winter.jpg',
    'white': 'section_pic_summer.jpg',
    'darkgreen': 'section_pic_spring.jpg',
    'lime': 'section_pic_2.jpg',
    'darkred': 'section_pic_1.jpeg',
    'red': 'winter_scenery.jpg',
    'orange': 'fly_me_to_the_moon.jpg',
    'purple': 'cat.jpg',
    'blue': 'Man_drinking_cocoa.jpg',
    'black': 'Man_drinking_tea.jpg',
};
const DESCRIPTIONS = [
    'This is my food',
    'Me and my family',
    'Look, my cat is so dump <3 <3 <3',
    'Just a reg com for reg pic',
    'I <3 pizza'
];
const MESSAGES = [
    'Wow, really cool!',
    'Hey, thats awesome!!!',
    'Picture, I choose YOU1',
    'I like you',
    'Like&Subscribe',
    'This is the best photo I\'ve ever seen!'
];
const NAMES = [
    'Dima',
    'Vlad',
    'Lesha',
    'Daniil',
    'Masha',
    'Lena',
    'Gena',
    'Natasha'
];

function generatePicsArray(picturesNumber) {
    const maxCommentId = MAX_COMMENT_COUNT * picturesNumber;

    // Generate an array with certain amount of objects within
    // using Array.from:
    const pictures = Array.from({ length: picturesNumber }, () => generatePic(picturesNumber, maxCommentId));

    // using new Array(n).fill().map(() => func)
    // let pictures_fill = new Array(picturesNumber).fill().map(() => generatePic(picturesNumber, maxComId));

    return pictures;
}

function generatePic(maxPicId, maxCommentId) {
    if (generatePic.maxPicId === undefined) {
        generatePic.maxPicId = maxPicId;
    }

    const newPic = {
        id: getUniqueId.call(generatePic, maxPicId),
        // url: `./photos/${nextId}.jpg`,
        url: `${(0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomKey)(PICS)}`,
        descripction: (0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomElem)(DESCRIPTIONS),
        likes: (0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(MIN_LIKE_COUNT, MAX_LIKE_COUNT), //! 15 - 200
        comments: Array.from({ length: (0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, MAX_COMMENT_COUNT) }, () => generateComment(maxCommentId)) //! 0 - 10
    };
    return newPic;
}

function generateComment(maxCommentId) {
    if (generateComment.maxCommentId === undefined) {
        generateComment.maxCommentId = maxCommentId;
    }

    const commenter = (0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, 5);
    const newComment = {
        id: getUniqueId.call(generateComment, maxCommentId),
        avatar: `./img/avatars/avatar-${commenter + 1}.png`,
        message: (0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomElem)(MESSAGES),
        name: NAMES[commenter]
    };
    return newComment;
}

function getUniqueId(maxId) {
    // Static var immitation
    if (this.usedIds === undefined) {
        this.usedIds = [];
    }

    // Generate new id
    let nextId = (0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, maxId);
    while (this.usedIds.includes(nextId)) {
        nextId = (0,_randoming_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, maxId);
    }
    this.usedIds.push(nextId);

    return nextId;
}

/***/ }),

/***/ "./src/js/randoming.js":
/*!*****************************!*\
  !*** ./src/js/randoming.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomElem": () => (/* binding */ getRandomElem),
/* harmony export */   "getRandomInt": () => (/* binding */ getRandomInt),
/* harmony export */   "getRandomKey": () => (/* binding */ getRandomKey)
/* harmony export */ });
// random number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

// get random number
function getRandomElem(list) {
    if (list.length) {
        return list[getRandomInt(0, list.length - 1)];
    };
};

function getRandomKey(dic) {
    const list = [];
    for (let key in dic) {
        list.push(key);
    };
    return list[getRandomInt(0, list.length - 1)];
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _js_create_desk_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/create-desk.js */ "./src/js/create-desk.js");




})();

/******/ })()
;
//# sourceMappingURL=builed.js.map