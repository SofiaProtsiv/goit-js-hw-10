"use strict";

// Напиши скрипт который будет сохранять значения полей в локальное хранилище когда пользователь что-то печатает.
// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и password, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, password и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.

import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const input =  document.querySelector('.feedback-form input');
const textArea = document.querySelector('.feedback-form textarea');
let email;
let message;
let data;

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMessageInput, 250));

function onFormSubmit (event) {
    event.preventDefault();
    
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);

    console.log(data);
};

function createDataObject (email, message) {
    const valueObject = {
        email,
        message
    };
    return valueObject;
}
function onMessageInput (event) {
    if(event.target.name === "email"){
        email = event.target.value;
    }
    if(event.target.name === "message"){
        message = event.target.value;
    }

    data = createDataObject(email, message);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};


function onRefreshPage () {   
    const savedMessegeParse = JSON.parse(localStorage.getItem(STORAGE_KEY));

    data = savedMessegeParse;
    email = savedMessegeParse.email;
    message = savedMessegeParse.message;

    input.value = savedMessegeParse.hasOwnProperty("email") ? savedMessegeParse.email : "";
    textArea.value = savedMessegeParse.hasOwnProperty("message") ? savedMessegeParse.message : "";
};

onRefreshPage();
