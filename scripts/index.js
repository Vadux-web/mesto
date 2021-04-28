import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//============РЕДАКТИРОВАНИЕ ПРОФИЛЯ================

// выбираем элементы попапа Редактирования профиля
const popupTypeUser = document.querySelector(".popup_type_user");

// выбираем элементы кнопки Редактирования профиля
const editButton = document.querySelector(".profile__edit-button");

// выбираем элементы формы Редактирования профиля
const title = document.querySelector(".profile__title");
const subTitle = document.querySelector(".profile__subtitle");
const form = popupTypeUser.querySelector(".popup__form");
const titleField = popupTypeUser.querySelector(".popup__input_type-title");
const subTitleField = popupTypeUser.querySelector(
  ".popup__input_type-subtitle"
);

// функция заполнения полей Редактирования профиля при открытии
function fillValue() {
  titleField.value = title.textContent;
  subTitleField.value = subTitle.textContent;
}

//Функция отправки формы Редактирования профиля
function submitFormTypeUser(event) {
  const formElement = event.target.closest("form");
  event.preventDefault();
  title.textContent = titleField.value;
  subTitle.textContent = subTitleField.value;
  formElement
    .querySelector(validationConfig.submitButtonSelector)
    .classList.toggle(validationConfig.inactiveButtonClass);
  closePopup(popupTypeUser);
}

//обработчик событий формы Редактирования профиля
editButton.addEventListener("click", () => {
  openPopup(popupTypeUser);
  fillValue();
});
form.addEventListener("submit", submitFormTypeUser);

//============ФУНКЦИИ ОТКРЫТИЯ/ЗАКРЫТИЯ ПОПАПОВ================

// функция открытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

// функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

//Функция закрытия всех попапов по клику на оверлей или крестик
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//Функция закрытия всех попапов по нажатию на Escape
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//============ДОБАВЛЕНИЕ КАРТОЧЕК================

// выбираем элементы кнопки Добавления карточки
const addButton = document.querySelector(".profile__add-button");

// выбираем элементы попапа Добавления карточки
const popupTypeCard = document.querySelector(".popup_type_card");

// выбираем элементы формы Добавления карточки
const formCard = popupTypeCard.querySelector(".popup__form");
const titleFieldCard = popupTypeCard.querySelector(
  ".popup__input_type_img-name"
);
const subTitleFieldCard = popupTypeCard.querySelector(
  ".popup__input_type_img-link"
);

//обработчик событий формы Добавления карточки
addButton.addEventListener("click", () => openPopup(popupTypeCard));

const cardList = document.querySelector(".cards__list");
initialCards.forEach((dataCard) => {
  const template = document
    .querySelector(".card-template")
    .content.cloneNode(true);
  const card = new Card(dataCard, template);
  const renderResult = card.render();
  cardList.append(renderResult);
});

// функция открытия попапа Preview карточки
export function handleOpenPopup(name, link) {
  //принимает данные
  const popupTypePreview = document.querySelector(".popup_type_preview");
  const popupImgPreview = popupTypePreview.querySelector(".popup__img-preview");
  const popupImgTitle = popupTypePreview.querySelector(".popup__img-title");
  openPopup(popupTypePreview);
  popupImgPreview.src = name;
  popupImgTitle.textContent = link;
}

//обработка отправки формы добавления карточки
formCard.addEventListener("submit", (event) => {
  const formElement = event.target.closest("form");
  event.preventDefault();
  const template = document
    .querySelector(".card-template")
    .content.cloneNode(true);
  const link = subTitleFieldCard.value;
  const name = titleFieldCard.value;
  if (!link || !name) return;
  const card = new Card({ link, name }, template);
  const renderResult = card.render();
  cardList.prepend(renderResult);
  formCard.reset();
  formElement
    .querySelector(validationConfig.submitButtonSelector)
    .classList.toggle(validationConfig.inactiveButtonClass);
  closePopup(popupTypeCard);
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// находим все формы с указанным классом в DOM, сделаем из них массив методом Array.from
const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

// перебираем полученную коллекцию
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});
