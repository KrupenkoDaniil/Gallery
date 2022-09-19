const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MAX_COMMENT_COUNT = 10;
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

// random number
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

// get random number
function getRandomElem(list) {
    if (list.length) {
        return list[randomInt(0, list.length - 1)];
    };
};


function generatePicsMassive(picturesNumber) {
    const maxComId = MAX_COMMENT_COUNT * picturesNumber;
    const usedPicIds = [];
    const usedComIds = [];
    const pictures = [];

    for (let i = 0; i < picturesNumber; i++) {
        pictures.push(generatePic(picturesNumber, usedPicIds, maxComId, usedComIds));
    };

    return pictures;
}

// в качестве аргумента принимает кол объектов, которые должная вернуть в массиве
function generatePic(maxPicId, usedPicIds, maxComId, usedComIds) {
    while (true) {
        let nextId = randomInt(1, maxPicId);
        if (!usedPicIds.includes(nextId)) {
            const newPic = {
                id: nextId,
                url: `./photos/${nextId}.jpg`,
                descritction: getRandomElem(DESCRIPTIONS),
                likes: randomInt(MIN_LIKE_COUNT, MAX_LIKE_COUNT), // 15 - 200
                comments: [generateComments(randomInt(0, MAX_COMMENT_COUNT), maxComId, usedComIds)] // 0 - 10
            };
            usedPicIds.push(nextId);
            return newPic;
        };
    };
};

function generateComments(commentsNumber, maxComId, usedComIds) {
    const comments = [];

    while (commentsNumber > 0) {
        let nextId = randomInt(1, maxComId);
        if (nextId < maxComId && !usedComIds.includes(nextId)) {
            let commenter = randomInt(0, 5);
            const newCom = {
                id: nextId,
                avatar: `./img/avatar-${commenter + 1}.jpg`,
                message: getRandomElem(MESSAGES),
                name: `${NAMES[commenter]}`
            };
            comments.push(newCom);
            commentsNumber--;
        };
    };

    return comments;
};

console.log(generatePicsMassive(5));