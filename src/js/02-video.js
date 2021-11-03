"use strict";

import Player from '@vimeo/player';
import {throttle} from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY = 'videoplayer-current-time';

let currentTime = 0;
const savedTime = JSON.parse(localStorage.getItem(KEY));

if (savedTime > currentTime) {
    player.setCurrentTime(savedTime);
};

player.on('timeupdate', function(data) {
    currentTime = data.seconds;
    setTime(currentTime);
});

function setTime (time) {
    localStorage.setItem(KEY, JSON.stringify(time));
}

