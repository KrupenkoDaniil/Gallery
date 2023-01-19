import { getRandomInt, getRandomElem, getRandomKey } from "./randoming.js";
import * as consts from './consts.js';



export function generatePicsArray(picturesNumber) {
    const maxCommentId = consts.MAX_COMMENT_COUNT * picturesNumber;

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
        url: `${getRandomKey(consts.PICS)}`,
        description: getRandomElem(consts.DESCRIPTIONS),
        likes: getRandomInt(consts.MIN_LIKE_COUNT, consts.MAX_LIKE_COUNT), //! 15 - 200
        comments: Array.from({ length: getRandomInt(0, consts.MAX_COMMENT_COUNT) }, () => generateComment(maxCommentId)) //! 0 - 10
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
        message: getRandomElem(consts.MESSAGES),
        name: consts.NAMES[commenter]
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