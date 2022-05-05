import "../pages/index.css";

import { enableValidation, validationObj } from "./validate.js";
import { renderCard, addFormSubmitHandler } from "./card.js";
import { openModalWindow, closeModalWindow, keyHandler } from "./utils.js";
import {
  popupAddForm,
  popupEditForm,
  editFormSubmitHandler,
  profileInfoName,
  profileInfoDescription,
  inputName,
  inputDescription,
  profileAvatar,
} from "./modal.js";
import { getINitialCards, getUserInfo } from "./api.js";

//GLOBAL SCOPE
const page = document.querySelector(".root");

const profileEditButton = document.querySelector(".profile__edit-button");

const popupFormElement = popupEditForm.querySelector(".popup__edit-form");

const profileAddButton = document.querySelector(".profile__add-button");

const addForm = popupAddForm.querySelector(".popup__edit-form");

//Данные о пользователе
getUserInfo()
  .then((res) => {
    profileAvatar.src = res.avatar;
    profileInfoDescription.textContent = res.about;
    profileInfoName.textContent = res.name;
  })
  .catch((err) => {
    console.log(err);
  });

//Отрисовка карточек из массива сервера
getINitialCards()
  .then((res) => {
    res.forEach((item) => {
      renderCard(item.link, item.name, item);
    });
  })
  .catch((err) => {
    console.log(err);
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
  popupAddForm
    .querySelector(validationObj.submitButtonSelector)
    .classList.add(validationObj.inactiveButtonClass);
  popupAddForm
    .querySelector(validationObj.submitButtonSelector)
    .setAttribute("disabled", "disabled");
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

//валидация
enableValidation(validationObj);
