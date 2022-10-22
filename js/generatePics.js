import { randomInt, getRandomElem, getRandomKey } from "./randoming.js";

const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MAX_COMMENT_COUNT = 10;
export const PICS = {
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
        descripction: getRandomElem(DESCRIPTIONS),
        likes: randomInt(MIN_LIKE_COUNT, MAX_LIKE_COUNT), //! 15 - 200
        comments: Array.from({ length: randomInt(0, MAX_COMMENT_COUNT) }, () => generateComment(maxCommentId)) //! 0 - 10
    };
    return newPic;
}

export function generateComment(maxCommentId) {
    if (generateComment.maxCommentId === undefined) {
        generateComment.maxCommentId = maxCommentId;
    }

    const commenter = randomInt(0, 5);
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
    let nextId = randomInt(0, maxId);
    while (this.usedIds.includes(nextId)) {
        nextId = randomInt(0, maxId);
    }
    this.usedIds.push(nextId);

    return nextId;
}