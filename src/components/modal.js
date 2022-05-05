import { closeModalWindow } from "./utils.js";
import { editUserInfo } from "./api.js";

//popups
export const popupZoomPic = document.querySelector(".popup_type_image-zoom");
export const popupAddForm = document.querySelector(".popup_type_addcard-form");
export const popupEditForm = document.querySelector(".popup_type_edit-form");

export const profileInfoName = document.querySelector(".profile__info_name");
export const profileInfoDescription = document.querySelector(
  ".profile__info_description"
);
export const profileAvatar = document.querySelector(".profile__avatar");
export const inputName = popupEditForm.querySelector("input[name=name]");
export const inputDescription = popupEditForm.querySelector(
  "input[name=description]"
);

export function editFormSubmitHandler(evt) {
  evt.preventDefault();
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
    });
}
