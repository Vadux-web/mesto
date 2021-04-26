import AddCardForm from "./AddCardForm.js";
import Card from "./Card.js";

class Cards {
  _container;
  _itemTemplate;
  _form;
  _onSubmit;

  constructor(selector, itemTemplate, onSubmit) {
    this._onSubmit = onSubmit;
    this._container = document.querySelector(selector);
    this._itemTemplate = itemTemplate;
    this._form = new AddCardForm(".add-card-form", this.addCard);
    this._form.init();
  }

  addCard = (dataCard) => {
    const item = new Card(dataCard, this._itemTemplate);
    const renderResult = item.render();
    this._container.append(renderResult);
    this._onSubmit();
  };
}

export default Cards;
