const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MAX_COMMENT_COUNT = 10;

const descritctions = [
    'This is my food',
    'Me and my family',
    'Look, my cat is so dump <3 <3 <3',
    'Just a reg com for reg pic',
    'I <3 pizza'
];
const messages = [
    'Wow, really cool!',
    'Hey, thats awesome!!!',
    'Picture, I choose YOU1',
    'I like you',
    'Like&Subscribe',
    'This is the best photo I\'ve ever seen!'
];
const names = [
    'Dima',
    'Vlad',
    'Lesha',
    'Daniil',
    'Masha',
    'Lena',
    'Gena',
    'Natasha'
];
const usedPicId = [];

// random number
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

// get random number
function getRandomElem(list) {
    if (list.length) {
        return list[randomInt(0, list.length - 1)]
    }
}

// в качестве аргумента принимает кол объектов, которые должная вернуть в массиве
function generatePics(picturesNumber) {
    let pictures = [];
    let maxId = picturesNumber
    while (picturesNumber > 0) {
        let nextId = randomInt(1, maxId);
        if (!usedPicId.includes(nextId)) {
            let newPic = {
                id: nextId,
                url: `./photos/${nextId}.jpg`,
                descritction: getRandomElem(descritctions),
                likes: randomInt(MIN_LIKE_COUNT, MAX_LIKE_COUNT), // 15 - 200
                comments: [generateComments(randomInt(0, MAX_COMMENT_COUNT))] // 0 - 10
            }
            usedPicId.push(nextId);
            pictures.push(newPic);
            picturesNumber--;
        }
    }
    return pictures;
}

function generateComments(commentsNumber) {
    let comments = [];

    for (let n = 0; n < commentsNumber; n++) {
        let commenter = randomInt(0, 5);
        let newCom = {
            id: n + 1,
            avatar: `./img/avatar-${commenter + 1}.jpg`,
            message: getRandomElem(messages),
            name: `${names[commenter]}`
        }
        comments.push(newCom);
    }
    return comments;
}

console.log(generatePics(25));

