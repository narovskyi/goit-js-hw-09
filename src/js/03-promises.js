import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
}

let firstDelay = 0;
let stepDelay = 0;
let quantityOfPromises = 0;
let positionValue = 0;
let currentDelay = 0;

refs.form.addEventListener('submit', onFormSumbit);

function onFormSumbit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount }
  } = e.currentTarget;
  firstDelay = Number(delay.value);
  stepDelay = Number(step.value);
  quantityOfPromises = Number(amount.value);
  generatePromises();
}

function generatePromises() {
  currentDelay = firstDelay;
  for (let i = 1; i <= quantityOfPromises; i += 1) {
    positionValue = i;
    createPromise(positionValue, currentDelay)
      .then(({position, delay}) => Notify.success(`Fulfilled promise ${position} in ${delay}ms`))
      .catch(({position, delay}) => Notify.failure(`Rejected promise ${position} in ${delay}ms`));
    currentDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}