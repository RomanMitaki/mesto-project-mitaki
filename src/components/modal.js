import { closeModalWindow, renderLoading } from "./utils.js";
import { editUserInfo, editUserAvatar } from "./api.js";

//popups
export const popupZoomPic = document.querySelector(".popup_type_image-zoom");
export const popupAddForm = document.querySelector(".popup_type_addcard-form");
export const popupEditForm = document.querySelector(".popup_type_edit-form");
export const popupAvatarForm = document.querySelector(
  ".popup_type_edit-avatar"
);

export const profileInfoName = document.querySelector(".profile__info_name");
export const profileInfoDescription = document.querySelector(
  ".profile__info_description"
);
export const profileAvatar = document.querySelector(".profile__avatar");
export const inputName = popupEditForm.querySelector("input[name=name]");
export const inputDescription = popupEditForm.querySelector(
  "input[name=description]"
);
const avatarInputName = popupAvatarForm.querySelector(
  "input[name=avatar-link]"
);

export function editFormSubmitHandler(evt) {
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

export function editAvatarFormSubmitHandler(evt) {
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
