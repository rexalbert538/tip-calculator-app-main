'use strict';

const inputBill = document.querySelector('.input__bill');
const inputCustom = document.querySelector('.input__custom');
const inputPeople = document.querySelector('.people');
const buttons = document.querySelectorAll('.btn');
const btnRest = document.querySelector('.btn__rest');
const amount = document.querySelector('.tip__amount');
const total = document.querySelector('.total');
const text = document.querySelector('.text');

inputBill.addEventListener('input', setBillValue);
inputCustom.addEventListener('input', setCustomValue);
inputPeople.addEventListener('input', setPeopleValue);
btnRest.addEventListener('click', restValue);
buttons.forEach(btn => {
  btn.addEventListener('click', setBtnValue);
});

let billValue, peopleValue, tipValue;

function inti() {
  billValue = 0.0;
  peopleValue = 0;
  tipValue = 0.15;
}

inti();

function setBillValue() {
  billValue = parseFloat(inputBill.value).toFixed(2);
  calculateTip();
}

function restActiveBtn() {
  buttons.forEach(btn => {
    btn.classList.remove('active--btn');
  });
}

function setPeopleValue() {
  peopleValue = parseFloat(inputPeople.value);
  if (isNaN(peopleValue)) peopleValue = 0;

  if (peopleValue < 1) {
    text.classList.remove('hidden');
    inputPeople.classList.add('error');
  } else {
    text.classList.add('hidden');
    inputPeople.classList.remove('error');
    calculateTip();
  }
}

function setBtnValue(e) {
  e.preventDefault();
  restActiveBtn();
  buttons.forEach(btn => {
    if (e.target.value === btn.value) {
      btn.classList.add('active--btn');
      tipValue = parseFloat(btn.value) / 100;
    }
  });

  calculateTip();
}

function setCustomValue() {
  tipValue = parseFloat(inputCustom.value / 100);
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let totalAmount = billValue / peopleValue + tipAmount;

    amount.innerHTML = `$${tipAmount.toFixed(2)}`;
    total.innerHTML = `$${totalAmount.toFixed(2)}`;
  }
}

function restValue() {
  restActiveBtn();
  inti();
  amount.innerHTML = `$0.00`;
  total.innerHTML = `$0.00`;
  inputBill.value = '';
  inputPeople.value = '';
  inputCustom.value = '';
  inputPeople.classList.remove('error');
  text.classList.add('hidden');
  buttons[2].classList.add('active--btn');
}
