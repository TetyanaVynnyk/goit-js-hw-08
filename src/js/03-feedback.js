import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formInfo = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (!formInfo) {
  formInfo = {};
}

const refs = {
  form: document.querySelector(`.feedback-form`),
  input: document.querySelector(`.feedback-form input`),
  textarea: document.querySelector(`.feedback-form textarea`),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInfoAreaInput, 500));

// fillInfo();

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
  console.log(formInfo);
  if (formInfo && formInfo.email) {
    refs.input.value = formInfo.email;
  };
  if (formInfo && formInfo.message) {
    refs.textarea.value = formInfo.message;
  };
};

fillInfo();
