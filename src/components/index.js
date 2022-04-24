import '../pages/index.css';

import { enableValidation, validationObj } from "./validate.js";
import { initialCards, renderCard, addFormSubmitHandler } from "./card.js";
import { openModalWindow, closeModalWindow, keyHandler } from "./utils.js";
import {
  popupZoomPic,
  popupAddForm,
  popupEditForm,
  editFormSubmitHandler,
  profileInfoName,
  profileInfoDescription,
  inputName,
  inputDescription,
} from "./modal.js";

//GLOBAL SCOPE
const page = document.querySelector(".root");

const popupEditFormCloseButton = popupEditForm.querySelector(
  ".popup__close-button"
);
const profileEditButton = document.querySelector(".profile__edit-button");

const popupFormElement = popupEditForm.querySelector(".popup__edit-form");

const popupAddFormCloseButton = popupAddForm.querySelector(
  ".popup__close-button"
);
const profileAddButton = document.querySelector(".profile__add-button");

const addForm = popupAddForm.querySelector(".popup__edit-form");

//Отрисовка карточек из массива через JS
initialCards.forEach(function (item) {
  renderCard(item.link, item.name);
});

//------------------Слушатели---------------------

//Открытие EDIT FORM
profileEditButton.addEventListener("click", () => {
  inputName.value = profileInfoName.textContent;
  inputDescription.value = profileInfoDescription.textContent;
  openModalWindow(popupEditForm);
});

popupFormElement.addEventListener("submit", editFormSubmitHandler);

//Открытие ADD CARD FORM
profileAddButton.addEventListener("click", () => {
  addForm.reset();
  openModalWindow(popupAddForm);
});

addForm.addEventListener("submit", addFormSubmitHandler);

//Закрытие всех попапов
page.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup__close-button") ||
    evt.target.classList.contains("popup")
  ) {
    closeModalWindow(evt.target.closest(".popup"));
  }
});

//..нажатие esc
page.addEventListener("keydown", keyHandler);

//валидация
enableValidation(validationObj);
