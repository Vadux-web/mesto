//Загружаем первоначальные карточки
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardList = document.querySelector('.cards__list');

initialCards.forEach(card => {
  const templateCards = document.querySelector('.card-template').content.cloneNode(true);
  templateCards.querySelector('.card__image').src = card.link;
  templateCards.querySelector('.card__title').textContent = card.name;
  cardList.append(templateCards);
});


//Реализуем возможность добавления новых карточек
// function addCard(card) {
//   const templateCards = `
//   <li>
//   <div class="card">
//     <img class="card__image" src="${card.link}" alt="${card.name}">
//     <div class="card__info">
//       <h2 class="card__title">${card.name}</h2>
//       <button class="card__like-button" type="button"><img src="./resources/images/like.svg" alt="Нравится"></button>
//     </div>
//   </div>
// </li>
// `
//   cardList.insertAdjacentHTML("beforeend", templateCards);
// };

// initialCards.forEach(addCard);




//Выбераем элементы попапа
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const popupTitle = document.querySelector('.popup__title');

// выбираем элементы кнопки 
const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');

// выбираем элементы формы
const title = document.querySelector('.profile__title');
const subTitle = document.querySelector('.profile__subtitle');
const form = document.querySelector('.popup__form');
const titleField = document.querySelector('.popup__input_type_title');
const subTitleField = document.querySelector('.popup__input_type_subtitle');

//Функция открытия попапа

function showPopup() {
  popup.classList.add('popup_opened');
  titleField.value = title.textContent;
  subTitleField.value = subTitle.textContent;
}

//Функция закрытия попапа

function closePopup() {
  popup.classList.remove('popup_opened');
}

//Функция закрытия попапа по клику на фон

function popupClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closePopup();
  }
}

//Функция отправки формы

function submitForm(event) {
  event.preventDefault();
  title.textContent = titleField.value;
  subTitle.textContent = subTitleField.value;
  closePopup();
}


editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('mousedown', popupClickHandler);
form.addEventListener('submit', submitForm);