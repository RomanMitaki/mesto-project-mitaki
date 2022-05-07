import "../pages/index.css";

import { enableValidation, validationObj } from "./validate.js";
import { renderCard, addFormSubmitHandler } from "./card.js";
import { openModalWindow, closeModalWindow } from "./utils.js";
import {
  popupAddForm,
  popupAvatarForm,
  popupEditForm,
  editFormSubmitHandler,
  editAvatarFormSubmitHandler,
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
const profileAvatarButton = document.querySelector(".profile__avatar-edit");
const addForm = popupAddForm.querySelector(".popup__edit-form");
const editAvatarForm = popupAvatarForm.querySelector(".popup__edit-form");

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
getUserInfo()
  .then((res) => {
    const userId = res._id;
    getINitialCards().then((res) => {
      res.forEach((item) => {
        renderCard(item.link, item.name, item);
        if (!(item.owner._id === userId)) {
          document
            .querySelector(".card__trash-icon")
            .classList.add("card__trash-icon_hidden");
        }
        let like = item.likes.some((likesObj) => {
          return likesObj._id === userId;
        });
        if (like === true) {
          document
            .querySelector(".card__like-icon")
            .classList.add("card__like-icon_active");
        }
      });
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

//Открытие POPUP EDIT AVATAR
profileAvatarButton.addEventListener("click", () => {
  editAvatarForm.reset();
  popupAvatarForm
    .querySelector(validationObj.submitButtonSelector)
    .classList.add(validationObj.inactiveButtonClass);
  popupAvatarForm
    .querySelector(validationObj.submitButtonSelector)
    .setAttribute("disabled", "disabled");
  openModalWindow(popupAvatarForm);
});

editAvatarForm.addEventListener("submit", editAvatarFormSubmitHandler);

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
