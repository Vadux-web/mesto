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
  const formElement = event.target.closest("form");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  event.preventDefault();
  if (hasInvalidInput(inputList)) {
    // Запретить submit по нажатию на Enter при ошибках валидации
    return false;
  } else {
    title.textContent = titleField.value;
    subTitle.textContent = subTitleField.value;
    closePopup(popupTypeUser);
  }
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
  popup.addEventListener("click", (evt) => {
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

// // выбираем элементы формы Добавления карточки
// const formCard = popupTypeCard.querySelector(".popup__form");
// const titleFieldCard = popupTypeCard.querySelector(
//   ".popup__input_type_img-name"
// );
// const subTitleFieldCard = popupTypeCard.querySelector(
//   ".popup__input_type_img-link"
// );

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

//==============РАБОТАЕМ С КЛАССАМИ========================

class AddCardForm {
  _container;
  _onSubmit;

  constructor(selector, onSubmit) {
    this._container = document.querySelector(selector);
    this._onSubmit = onSubmit;
  }
  _submit = (event) => {
    event.preventDefault();
    const input = Array.from(this._container.querySelectorAll(".popup__input"));

    this._onSubmit(input[0].value);

    input[0].value = "";
    input[1].value = "";
    closePopup(popupTypeCard);
  };

  init = () => {
    this._container.addEventListener("submit", this._submit);
  };
}

// //обработка отправки формы добавления карточки
// formCard.addEventListener("submit", (event) => {
//   const formElement = event.target.closest("form");
//   const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
//   event.preventDefault();
//   if (hasInvalidInput(inputList)) {
//     // Запретить submit по нажатию на Enter при ошибках валидации
//     return false;
//   } else {
//     const link = subTitleFieldCard.value;
//     const name = titleFieldCard.value;
//     if (!link || !name) return;
//     const card = createCard({ link, name });
//     cardList.prepend(card);
//     formCard.reset();
//     closePopup(popupTypeCard);
//   }
// });

class Card {
  _dataCard;
  _template;
  _view;

  constructor(dataCard, template) {
    this._dataCard = dataCard;
    this._template = template;
  }

  render = () => {
    this._view = this._template.cloneNode(true);
    this._view.querySelector(".card__title").textContent = this._dataCard.name;
    this._view.querySelector(".card__image").src = this._dataCard.link;
    this._setEventListeners();
    return this._view;
  };

  _setEventListeners() {
    //делаю переменные видимыми для вложенной функции openPopup(popupTypePreview)
    const dataCardLink = this._dataCard.link;
    const dataCardName = this._dataCard.name;

    this._view
      .querySelector(".card__trash-button")
      .addEventListener("click", (event) => {
        event.target.closest(".card-li").remove();
      });

    this._view
      .querySelector(".card__like-button")
      .addEventListener("click", function (event) {
        event.target.classList.toggle("card__like-button_active");
      });

    this._view
      .querySelector(".card__image")
      .addEventListener("click", function () {
        openPopup(popupTypePreview);
        popupImgPreview.src = dataCardLink;
        popupImgTitle.textContent = dataCardName;
      });

    // выбираем элементы popup preview карточки
    const popupTypePreview = document.querySelector(".popup_type_preview");
    const popupImgPreview = popupTypePreview.querySelector(
      ".popup__img-preview"
    );
    const popupImgTitle = popupTypePreview.querySelector(".popup__img-title");

    return this._template;
  }
}

class Cards {
  _container;
  _itemTemplate;
  _form;

  constructor(selector, itemTemplate) {
    this._container = document.querySelector(selector);
    this._itemTemplate = itemTemplate;

    this._form = new AddCardForm(".add-card-form", this.addCard);
    this._form.init();
  }

  addCard = (dataCard) => {
    const item = new Card(dataCard, this._itemTemplate);
    const renderResult = item.render();
    this._container.append(renderResult);
  };
}

//создаем сущность Cards, через создание класса
const cardsNew = new Cards(
  ".cards__list",
  document.querySelector(".card-template").content
);

//перебераем массив данных
initialCards.forEach((dataCard) => {
  cardsNew.addCard(dataCard);
});

//======================================

// const cardList = document.querySelector(".cards__list");
// initialCards.forEach((dataCard) => {
//   const card = createCard(dataCard);
//   cardList.append(card);
// });
//
// function createCard(dataCard) {
//   const templateCard = document
//     .querySelector(".card-template")
//     .content.cloneNode(true);
//   const cardLink = templateCard.querySelector(".card__image");
//   cardLink.src = dataCard.link;
//   const cardName = templateCard.querySelector(".card__title");
//   cardName.textContent = dataCard.name;
//   cardLink.alt = dataCard.name;

// //обработка отправки формы добавления карточки
// formCard.addEventListener("submit", (event) => {
//   const formElement = event.target.closest("form");
//   const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
//   event.preventDefault();
//   if (hasInvalidInput(inputList)) {
//     // Запретить submit по нажатию на Enter при ошибках валидации
//     return false;
//   } else {
//     const link = subTitleFieldCard.value;
//     const name = titleFieldCard.value;
//     if (!link || !name) return;
//     const card = createCard({ link, name });
//     cardList.prepend(card);
//     formCard.reset();
//     closePopup(popupTypeCard);
//   }
// });
