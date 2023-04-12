
import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");

let dataForm = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
const { email, message } = form.elements;

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, 500));

function onInputData(event){
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem('feedback-form-state', JSON.stringify(dataForm));
}

function onFormSubmit(event){
  event.preventDefault();

  console.log('Submit form', dataForm);

  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
  dataForm = {};
}

function onMsgOutput(){
  if (dataForm.email) {
    email.value = dataForm.email;
  }
  if (dataForm.message) {
    message.value = dataForm.message;
  }
}

window.addEventListener('load', () => {
  if (localStorage.getItem('feedback-form-state')) {
    onMsgOutput();
  }
});