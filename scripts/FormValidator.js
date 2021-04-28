class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );

    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    this._inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this.toggleButtonState();
  }

  toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  };

  _validate = (inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  };

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // У каждой формы отменим стандартное поведение
      if (this._hasInvalidInput(this._inputList)) {
        return false;
      }
    });

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем Validate, передав ей форму и проверяемый элемент
        this._validate(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this.toggleButtonState();
      });
    });
  }

  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    // добавляем класс ошибки элементу input
    inputElement.classList.add(this._settings.inputErrorClass); //border-bottom: 1px solid red;
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._settings.errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(this._settings.errorClass);
    // Очистим ошибку
    errorElement.textContent = "";
  };

  _hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // если поле не валидно, колбэк вернёт true
      // обход массива прекратится и вся фунцкция вернёт true
      return !inputElement.validity.valid;
    });
  };
}

export default FormValidator;
