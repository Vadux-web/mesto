// выбираем элементы попапа Редактирования профиля
const popupTypeUser = document.querySelector('.popup_type_user');
const popupContent = popupTypeUser.querySelector('.popup__content');
const popupTitle = popupTypeUser.querySelector('.popup__title');

// выбираем элементы попапа Добавления карточки
const popupTypeCard = document.querySelector('.popup_type_card');
const popupContentCard = popupTypeCard.querySelector('.popup__content');
const popupTitleCard = popupTypeCard.querySelector('.popup__title');



// выбираем элементы кнопки Редактирования профиля
const popupCloseButton = popupTypeUser.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');

// выбираем элементы кнопки Добавления карточки
const popupCloseButtonCard = popupTypeCard.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');



// выбираем элементы формы Редактирования профиля
const title = document.querySelector('.profile__title');
const subTitle = document.querySelector('.profile__subtitle');
const form = popupTypeUser.querySelector('.popup__form');
const titleField = popupTypeUser.querySelector('.popup__input_type_title');
const subTitleField = popupTypeUser.querySelector('.popup__input_type_subtitle');

// выбираем элементы формы Добавления карточки
const titleCard = popupTypeCard.querySelector('.profile__title');
const subTitleCard = popupTypeCard.querySelector('.profile__subtitle');
const formCard = popupTypeCard.querySelector('.popup__form');
const titleFieldCard = popupTypeCard.querySelector('.popup__input_type_img-name');
const subTitleFieldCard = popupTypeCard.querySelector('.popup__input_type_img-link');



// функция открытия попапа Редактирования профиля
function showPopupTypeUser() {
  popupTypeUser.classList.add('popup_opened');
  titleField.value = title.textContent;
  subTitleField.value = subTitle.textContent;
}

// функция открытия попапа Добавления карточки
function showPopupTypeCard() {
  popupTypeCard.classList.add('popup_opened');
}



//Функция закрытия попапа Редактирования профиля
function closePopupTypeUser() {
  popupTypeUser.classList.remove('popup_opened');
}

//Функция закрытия попапа Добавления карточки
function closePopupTypeCard() {
  popupTypeCard.classList.remove('popup_opened');
}



//Функция закрытия попапа Редактирования профиля по клику на фон
function popupClickHandlerTypeUser(event) {
  if (event.target.classList.contains('popup_type_user')) {
    closePopupTypeUser();
  }
}

//Функция закрытия попапа Добавления карточки по клику на фон
function popupClickHandlerTypeCard(event) {
  if (event.target.classList.contains('popup_type_card')) {
    closePopupTypeCard();
  }
}



//Функция отправки формы Редактирования профиля
function submitFormTypeUser(event) {
  event.preventDefault();
  title.textContent = titleField.value;
  subTitle.textContent = subTitleField.value;
  closePopupTypeUser();
}

//Функция отправки формы Добавления карточки
function submitFormTypeCard(event) {
  event.preventDefault();
  closePopupTypeCard();
}



//обработчик событий формы Редактирования профиля
editButton.addEventListener('click', showPopupTypeUser);
popupCloseButton.addEventListener('click', closePopupTypeUser);
popupTypeUser.addEventListener('mousedown', popupClickHandlerTypeUser);
form.addEventListener('submit', submitFormTypeUser);

//обработчик событий формы Добавления карточки
addButton.addEventListener('click', showPopupTypeCard);
popupCloseButtonCard.addEventListener('click', closePopupTypeCard);
popupTypeCard.addEventListener('mousedown', popupClickHandlerTypeCard);
formCard.addEventListener('submit', submitFormTypeCard);



// выбираем элементы popup preview карточки
const popupTypePreview = document.querySelector('.popup_type_preview');
const popupImgPreview = popupTypePreview.querySelector('.popup__img-preview');
const popupImgTitle = popupTypePreview.querySelector('.popup__img-title');
const ImgPreviewCloseButton = popupTypePreview.querySelector('.popup__close');

// функция открытия popup preview карточки
function imagePreview() {
  popupTypePreview.classList.add('popup_opened');
};

// функция закрытия popup preview карточки
function closeImagePreview() {
  popupTypePreview.classList.remove('popup_opened');
};

//Функция закрытия popup preview карточки по клику на фон
function popupClickHandlerTypePreview(event) {
  if (event.target.classList.contains('popup_type_preview')) {
    closeImagePreview();
  }
}

//обработчик событий popup preview карточки
ImgPreviewCloseButton.addEventListener('click', closeImagePreview);
popupTypePreview.addEventListener('mousedown', popupClickHandlerTypePreview);



// загружаем первоначальные карточки
const initialCards = [{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}, {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}];

const cardList = document.querySelector('.cards__list');
const cardForm = popupTypeCard.querySelector('.popup__form');

function addCard(elem) {
  const templateCards = document.querySelector('.card-template').content.cloneNode(true);
  const cardLink = templateCards.querySelector('.card__image');
  cardLink.src = elem.link;
  const cardName = templateCards.querySelector('.card__title');
  cardName.textContent = elem.name;
  cardLink.alt = elem.name;

  templateCards.querySelector('.card__trash-button').addEventListener('click', event => {
    const card = event.target.closest('.card-li').remove();
  });

  templateCards.querySelector('.card__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('card__like-button_active');
  });

  cardLink.addEventListener('click', function(event) {
    imagePreview();
    popupImgPreview.src = event.target.src;
    popupImgTitle.textContent = elem.name;
  });

  cardList.prepend(templateCards);
};

cardForm.addEventListener("submit", event => {
  event.preventDefault();
  addCard({ link: subTitleFieldCard.value, name: titleFieldCard.value });
  closePopupTypeCard();
  cardForm.reset();
});

initialCards.forEach(addCard);