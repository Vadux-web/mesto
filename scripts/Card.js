class Card {
  constructor(dataCard, template, handleOpenPopup) {
    this._dataCard = dataCard;
    this._template = template;
    this._handleOpenPopup = handleOpenPopup;
  }

  generateCard = () => {
    this._titleElement = this._view.querySelector(".card__title");
    this._imageElement = this._view.querySelector(".card__image");
    this._likeButton = this._view.querySelector(".card__like-button");
    this._deleteButton = this._view.querySelector(".card__trash-button");
  };

  render = () => {
    this._view = this._template.cloneNode(true).querySelector(".card-li");
    this.generateCard();
    this._titleElement.textContent = this._dataCard.name;
    this._imageElement.src = this._dataCard.link;
    this._imageElement.alt = this._dataCard.name;
    this._setEventListeners();
    return this._view;
  };

  _setEventListeners() {
    this._deleteButton.addEventListener("click", (event) => {
      this._view.remove();
    });

    this._likeButton.addEventListener("click", function (event) {
      event.target?.classList.toggle("card__like-button_active");
    });

    this._imageElement.addEventListener("click", () => {
      this._handleOpenPopup(this._dataCard.link, this._dataCard.name); //передаем данные
    });
  }
}

export default Card;
