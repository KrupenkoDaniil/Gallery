import { getRandomInt, getRandomElem, getRandomKey } from "./randoming.js";

const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MAX_COMMENT_COUNT = 10;
export const PICS = {
    'section_pic_winter.jpg': 'gold',
    'section_pic_summer.jpg': 'white',
    'section_pic_spring.jpg': 'darkgreen',
    'section_pic_2.jpg': 'lime',
    'section_pic_1.jpeg': 'darkred',
    'winter_scenery.jpg': 'red',
    'fly_me_to_the_moon.jpg': 'orange',
    'cat.jpg': 'purple',
    'Man_drinking_cocoa.jpg': 'blue',
    'Man_drinking_tea.jpg': 'black',
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

export function generatePicsArray(picturesNumber) {
    const maxCommentId = MAX_COMMENT_COUNT * picturesNumber;

    // Generate an array with certain amount of objects within
    // using Array.from:
    const pictures = Array.from({ length: picturesNumber }, () => generatePic(picturesNumber, maxCommentId));

    // using new Array(n).fill().map(() => func)
    // let pictures_fill = new Array(picturesNumber).fill().map(() => generatePic(picturesNumber, maxComId));

    return pictures;
}

export function generatePic(maxPicId, maxCommentId) {
    if (generatePic.maxPicId === undefined) {
        generatePic.maxPicId = maxPicId;
    }

    const newPic = {
        id: getUniqueId.call(generatePic, maxPicId),
        // url: `./photos/${nextId}.jpg`,
        url: `${getRandomKey(PICS)}`,
        description: getRandomElem(DESCRIPTIONS),
        likes: getRandomInt(MIN_LIKE_COUNT, MAX_LIKE_COUNT), //! 15 - 200
        comments: Array.from({ length: getRandomInt(0, MAX_COMMENT_COUNT) }, () => generateComment(maxCommentId)) //! 0 - 10
    };
    return newPic;
}

export function generateComment(maxCommentId) {
    if (generateComment.maxCommentId === undefined) {
        generateComment.maxCommentId = maxCommentId;
    }

    const commenter = getRandomInt(0, 5);
    const newComment = {
        id: getUniqueId.call(generateComment, maxCommentId),
        avatar: `./img/avatars/avatar-${commenter + 1}.png`,
        message: getRandomElem(MESSAGES),
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
    let nextId;
    do {
        nextId = getRandomInt(0, maxId);
    } while (this.usedIds.includes(nextId));
    this.usedIds.push(nextId);

    return nextId;
}