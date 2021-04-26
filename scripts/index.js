import Cards from "./Cards.js";
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

// функция отправки формы Редактирования профиля
function submitFormTypeUser(event) {
  event.preventDefault();
  title.textContent = titleField.value;
  subTitle.textContent = subTitleField.value;
  closePopup(popupTypeUser);
}

// обработчик событий формы Редактирования профиля
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
}

// функция закрытия всех попапов по клику на оверлей или крестик
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

// функция закрытия всех попапов по нажатию на Escape
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

//обработчик событий формы Добавления карточки
addButton.addEventListener("click", () => {
  openPopup(popupTypeCard);
});

// загружаем первоначальные карточки
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// создаем сущность Cards, через создание класса
const cardsNew = new Cards(
  ".cards__list",
  document.querySelector(".card-template").content,
  () => closePopup(popupTypeCard)
);

// перебераем массив данных
initialCards.forEach((dataCard) => {
  cardsNew.addCard(dataCard);
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
