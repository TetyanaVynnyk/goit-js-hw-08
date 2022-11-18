import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formInfo = {};

const refs = {
  form: document.querySelector(`.feedback-form`),
  input: document.querySelector(`.feedback-form input`),
  textarea: document.querySelector(`.feedback-form textarea`),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInfoAreaInput, 500));

fillInfo();

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();

  console.log(localStorage.getItem(STORAGE_KEY));

  localStorage.removeItem(STORAGE_KEY);
}

function onInfoAreaInput(event) {
  formInfo[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formInfo));
}

function fillInfo() {
  const savedInfo = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedInfo);
  if (savedInfo.email) {
    refs.input.value = savedInfo.email;
  }
  if (savedInfo.message) {
    refs.textarea.value = savedInfo.message;
  }
}
