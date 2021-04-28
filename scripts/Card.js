import { handleOpenPopup } from "./index.js";

class Card {
  constructor(dataCard, template) {
    this._dataCard = dataCard;
    this._template = template;
  }

  render = () => {
    this._view = this._template.cloneNode(true);
    this._view.querySelector(".card__title").textContent = this._dataCard.name;
    this._view.querySelector(".card__image").src = this._dataCard.link;
    this._view.querySelector(".card__image").alt = this._dataCard.name;

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
      handleOpenPopup(this._dataCard.link, this._dataCard.name); //передаем данные
    });
  }
}

export default Card;
