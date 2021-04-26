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
    this._view
      .querySelector(".card__trash-button")
      .addEventListener("click", (event) => {
        event.target?.closest(".card-li").remove();
      });

    this._view
      .querySelector(".card__like-button")
      .addEventListener("click", function (event) {
        event.target?.classList.toggle("card__like-button_active");
      });

    this._view.querySelector(".card__image").addEventListener("click", () => {
      openPopup(popupTypePreview);
      popupImgPreview.src = this._dataCard.link;
      popupImgTitle.textContent = this._dataCard.name;
    });

    // выбираем элементы popup preview карточки
    const popupTypePreview = document.querySelector(".popup_type_preview");
    const popupImgPreview = popupTypePreview.querySelector(
      ".popup__img-preview"
    );
    const popupImgTitle = popupTypePreview.querySelector(".popup__img-title");
  }
}

export default Card;
