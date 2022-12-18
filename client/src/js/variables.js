
// Set main Constants
export const BODY = document.body;
export const MAIN_CONTAINER = document.createElement('div');
MAIN_CONTAINER.classList.add('container');
export const MAIN_OVERLAY = document.querySelector('.overlay');

export const INPUT_FILE = document.querySelector('#file');
export const INPUT_TEG = document.querySelector('.hashtags-section__input');
export const INPUT_LIKE = document.querySelector('.image-section__likes-input');


export const POST_FORM = document.newPost;
export const LIKE_FORM = document.newLike;
export const COMMENT_FORM = document.newComment;
export const HASHTAG_FORM = document.newHashtag;
export const GET_URLS = [
    'http://localhost:80/pictures?expand=hashtags',
    'http://localhost:80/effects',
];
export const POST_URLS = {
    'pictures': 'http://localhost:80/pictures',
    'likes': 'http://localhost:80/likes',
    'comments': 'http://localhost:80/comments',
    'hashtats': 'http://localhost:80/hashtags',
};

export const COMENTS_TO_SHOW_AMOUNT = 5;

export const MAX_TEG_LENGTH = 20;

export const MIN_LIKE_COUNT = 15;
export const MAX_LIKE_COUNT = 200;
export const MAX_COMMENT_COUNT = 10;
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

export const DESCRIPTIONS = [
    'This is my food',
    'Me and my family',
    'Look, my cat is so dump <3 <3 <3',
    'Just a reg com for reg pic',
    'I <3 pizza'
];
export const MESSAGES = [
    'Wow, really cool!',
    'Hey, thats awesome!!!',
    'Picture, I choose YOU1',
    'I like you',
    'Like&Subscribe',
    'This is the best photo I\'ve ever seen!'
];
export const NAMES = [
    'Dima',
    'Vlad',
    'Lesha',
    'Daniil',
    'Masha',
    'Lena',
    'Gena',
    'Natasha'
];