import "../pages/index.css";

import { enableValidation, validationObj } from "./validate.js";
import { renderCard } from "./card.js";
import { renderLoading } from "./utils.js";
import { closeModalWindow, openModalWindow } from "./modal.js";
import {
  getINitialCards,
  getUserInfo,
  editUserInfo,
  editUserAvatar,
  addCard,
} from "./api.js";

//GLOBAL SCOPE
const userInfo = getUserInfo();
const initialCards = getINitialCards();
const userInfoCardsPromiseArr = [userInfo, initialCards];
const page = document.querySelector(".root");
//..popups
const popupAddForm = document.querySelector(".popup_type_addcard-form");
const popupEditForm = document.querySelector(".popup_type_edit-form");
const popupAvatarForm = document.querySelector(".popup_type_edit-avatar");

//..profile section
const profileInfoName = document.querySelector(".profile__info_name");
const profileInfoDescription = document.querySelector(
  ".profile__info_description"
);
const profileAvatar = document.querySelector(".profile__avatar");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__avatar-edit");

//..popup editform
const inputName = popupEditForm.querySelector("input[name=name]");
const inputDescription = popupEditForm.querySelector("input[name=description]");
const popupFormElement = popupEditForm.querySelector(".popup__edit-form");

//..popup avatarform
const avatarInputName = popupAvatarForm.querySelector(
  "input[name=avatar-link]"
);
const editAvatarForm = popupAvatarForm.querySelector(".popup__edit-form");

//..popup addform
const addForm = popupAddForm.querySelector(".popup__edit-form");
const inputImageLink = popupAddForm.querySelector("input[name=image-link]");
const inputPlace = popupAddForm.querySelector("input[name=place]");

//----------------FUNCTIONS--------------------

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  renderLoading(
    true,
    popupEditForm.querySelector(".popup__submit-button"),
    "Сохранить"
  );
  const userData = {
    name: inputName.value,
    description: inputDescription.value,
  };
  editUserInfo(userData)
    .then((res) => {
      profileInfoDescription.textContent = res.about;
      profileInfoName.textContent = res.name;
      closeModalWindow(popupEditForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        popupEditForm.querySelector(".popup__submit-button"),
        "Сохранить"
      );
    });
}

function editAvatarFormSubmitHandler(evt) {
  evt.preventDefault();
  renderLoading(
    true,
    popupAvatarForm.querySelector(".popup__submit-button"),
    "Сохранить"
  );
  const avatarLink = avatarInputName.value;
  editUserAvatar(avatarLink)
    .then((res) => {
      profileAvatar.src = res.avatar;
      closeModalWindow(popupAvatarForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        popupAvatarForm.querySelector(".popup__submit-button"),
        "Сохранить"
      );
    });
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderLoading(
    true,
    popupAddForm.querySelector(".popup__submit-button"),
    "Создать"
  );
  const newCardInfo = {
    link: inputImageLink.value,
    caption: inputPlace.value,
  };
  addCard(newCardInfo)
    .then((res) => {
      renderCard(res.link, res.name, res, res.owner._id);
      closeModalWindow(popupAddForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        popupAddForm.querySelector(".popup__submit-button"),
        "Создать"
      );
    });
}

//------------------EXECUTION-------------------

//Данные о пользователе с отрисовкой карточек из массива сервера
Promise.all(userInfoCardsPromiseArr)
  .then((res) => {
    const userId = res[0]._id;
    profileAvatar.src = res[0].avatar;
    profileInfoDescription.textContent = res[0].about;
    profileInfoName.textContent = res[0].name;
    res[1].reverse().forEach((item) => {
      renderCard(item.link, item.name, item, userId);
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
