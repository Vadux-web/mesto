// выбираем элементы попапа Редактирования профиля
const popupTypeUser = document.querySelector(".popup_type_user");

// выбираем элементы попапа Добавления карточки
const popupTypeCard = document.querySelector(".popup_type_card");

// выбираем элементы кнопки Редактирования профиля
const editButton = document.querySelector(".profile__edit-button");

// выбираем элементы кнопки Добавления карточки
const addButton = document.querySelector(".profile__add-button");

// выбираем элементы формы Редактирования профиля
const title = document.querySelector(".profile__title");
const subTitle = document.querySelector(".profile__subtitle");
const form = popupTypeUser.querySelector(".popup__form");
const titleField = popupTypeUser.querySelector(".popup__input_type-title");
const subTitleField = popupTypeUser.querySelector(
  ".popup__input_type-subtitle"
);

// выбираем элементы формы Добавления карточки
const formCard = popupTypeCard.querySelector(".popup__form");
const titleFieldCard = popupTypeCard.querySelector(
  ".popup__input_type_img-name"
);
const subTitleFieldCard = popupTypeCard.querySelector(
  ".popup__input_type_img-link"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// функция заполнения полей Редактирования профиля
function fillValue() {
  titleField.value = title.textContent;
  subTitleField.value = subTitle.textContent;
}

//Функция закрытия всех попапов по клику на оверлей или крестик
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

//Функция отправки формы Редактирования профиля
function submitFormTypeUser(event) {
  const formElement = event.target.closest("form");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  event.preventDefault();
  if (hasInvalidInput(inputList)) {
    // Запретить submit при ошибках валидации
    return false;
  } else {
    title.textContent = titleField.value;
    subTitle.textContent = subTitleField.value;
    closePopup(popupTypeUser);
  }
}

//обработчик событий формы Редактирования профиля
editButton.addEventListener("click", () => {
  openPopup(popupTypeUser);
  fillValue();
});
form.addEventListener("submit", submitFormTypeUser);

//обработчик событий формы Добавления карточки
addButton.addEventListener("click", () => openPopup(popupTypeCard));

// выбираем элементы popup preview карточки
const popupTypePreview = document.querySelector(".popup_type_preview");
const popupImgPreview = popupTypePreview.querySelector(".popup__img-preview");
const popupImgTitle = popupTypePreview.querySelector(".popup__img-title");

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

const cardList = document.querySelector(".cards__list");
initialCards.forEach((dataCard) => {
  const card = createCard(dataCard);
  cardList.append(card);
});

function createCard(dataCard) {
  const templateCard = document
    .querySelector(".card-template")
    .content.cloneNode(true);
  const cardLink = templateCard.querySelector(".card__image");
  cardLink.src = dataCard.link;
  const cardName = templateCard.querySelector(".card__title");
  cardName.textContent = dataCard.name;
  cardLink.alt = dataCard.name;

  templateCard
    .querySelector(".card__trash-button")
    .addEventListener("click", (event) => {
      event.target.closest(".card-li").remove();
    });

  templateCard
    .querySelector(".card__like-button")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("card__like-button_active");
    });

  cardLink.addEventListener("click", function (event) {
    openPopup(popupTypePreview);
    popupImgPreview.src = event.target.src;
    popupImgTitle.textContent = elem.name;
  });
  return templateCard;
}

//обработка отправки формы добавления карточки
formCard.addEventListener("submit", (event) => {
  const formElement = event.target.closest("form");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  event.preventDefault();
  if (hasInvalidInput(inputList)) {
    // Запретить submit при ошибках валидации
    return false;
  } else {
    const link = subTitleFieldCard.value;
    const name = titleFieldCard.value;
    if (!link || !name) return;
    const card = createCard({ link, name });
    cardList.prepend(card);
    formCard.reset();
    closePopup(popupTypeCard);
  }
});
