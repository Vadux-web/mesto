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

    this._onSubmit({
      link: input[1].value,
      name: input[0].value,
    });

    input[0].value = "";
    input[1].value = "";
  };

  init = () => {
    this._container.addEventListener("submit", this._submit);
  };
}

export default AddCardForm;
