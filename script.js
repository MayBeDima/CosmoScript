// BURGER MENU

const btnBurger = document.getElementById('btn-burger');
const burgerLines = document.querySelectorAll('.burger-line');
const nav = document.querySelector('.nav__list');

btnBurger.addEventListener('click', () => {
  nav.classList.toggle('nav__list-active');
  burgerLines.forEach((e) => {
    e.classList.toggle('anim');
  });
})

// API

const rates = document.getElementById('ratesJS');
const links = document.querySelectorAll('.link');
const sections = document.querySelectorAll('.section')

links.forEach(e => {
  e.addEventListener('click', () => {
    let value = e.getAttribute('href').slice(1);

    sections.forEach((item) => {
      if (!item.classList.contains(`none`)) {
        item.classList.add('none');
      }

      if (item.classList.contains(`section__${value}`)) {
        item.classList.remove('none');
      }
    })
  })
})

function getRates(item) {
  let rateItem = document.createElement('label');
  rateItem.setAttribute('for', `${item.name}`);
  rateItem.classList.add('rate__item', 'flex', 'rate__text');
  rates.append(rateItem);

  let rateName = document.createElement('h3');
  rateName.classList.add('rate__name', 'rate__text');
  rateName.textContent = `${item.name}`
  rateItem.append(rateName);

  let rateDescr = document.createElement('p');
  rateDescr.classList.add('rate__descr', 'rate__text');
  rateDescr.textContent = `${item.description}`
  rateItem.append(rateDescr);

  let ratePrice = document.createElement('span');
  ratePrice.classList.add('rate__price', 'rate__text');
  ratePrice.textContent = `${item.price}р`
  rateName.append(ratePrice);

  let radio = document.createElement('input');
  radio.setAttribute('type', 'radio');
  radio.setAttribute('name', 'rate');
  radio.id = `${item.name}`
  radio.classList.add('radio-input');
  rateItem.append(radio);

  let radioCustom = document.createElement('span');
  radioCustom.classList.add('radio-custom');
  rateItem.append(radioCustom);
}

fetch("https://github.com/Rob--W/cors-anywhere/https://munchkin.cosmoscript.ru/api/get_tariff")
  .then(res => res.json())
  .then((res) => {
    for (let i = 0; i < res.length; i++) {
      getRates(res[i]);
    }
  });

// Price

const totalInput = document.querySelector('.total-input');
const totalCost = document.querySelector('.total-cost');
const totalBtn = document.querySelector('.total-btn');
const totalForm = document.querySelector('.rate__calc');

totalInput.addEventListener('change', () => {
  if (+totalInput.value > 0) {
    totalBtn.removeAttribute('disabled');
  } else {
    totalBtn.setAttribute('disabled', 'disabled');
  }
})

totalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(`https://munchkin.cosmoscript.ru/api/get_cost/${totalInput.value}`)
    .then(res => res.json())
    .then((res) => {
      totalCost.textContent = `${res.total_cost}р`
    });
})

