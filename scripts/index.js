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

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('mousedown', popupClickHandler);

//Функция отправки формы

function submitForm(event) {
  event.preventDefault();
  title.textContent = titleField.value;
  subTitle.textContent = subTitleField.value;
  closePopup();
}

form.addEventListener('submit', submitForm);