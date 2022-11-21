const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

disableBtn(refs.stopBtn);
let intervalId = null;

function onStartBtnClick() {
    disableBtn(refs.startBtn);
    enableBtn(refs.stopBtn);
    intervalId = setInterval(changeBackgroundColor, 1000, refs.body);
}

function onStopBtnClick() {
    disableBtn(refs.stopBtn);
    enableBtn(refs.startBtn);
    clearInterval(intervalId);
}

function changeBackgroundColor(el) {
    el.style.backgroundColor = getRandomHexColor();
}

function disableBtn(btn) {
    btn.setAttribute('disabled', 'disabled');
}

function enableBtn(btn) {
    btn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}