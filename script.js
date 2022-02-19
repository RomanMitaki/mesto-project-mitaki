const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(
  "div.popup__container .popup__close-button"
);
const profileEditButton = document.querySelector(
  "section.profile div.profile__container .profile__edit-button"
);

//---Открытие/закрытие попапа---
function appearancePopup() {
  popup.classList.toggle("popup_opened");
  inputName.value = "";
  inputDescription.value = "";
}

profileEditButton.addEventListener("click", appearancePopup);
popupCloseButton.addEventListener("click", appearancePopup);
//-------

const popupInputs = popup.querySelectorAll(
  "div.popup__container form.popup__edit-form fieldset.popup__input-container .popup__item"
);

const inputName = popupInputs[0];
const inputDescription = popupInputs[1];

const profileInfoName = document.querySelector(
  "section.profile div.profile__container div.profile__content .profile__info_name"
);
const profileInfoDescription = document.querySelector(
  "section.profile div.profile__container div.profile__content .profile__info_description"
);

//---Задаем правило для содержания плейсхолдера---
function definePlaceholderName() {
  inputName.setAttribute("placeholder", profileInfoName.textContent);
  inputDescription.setAttribute(
    "placeholder",
    profileInfoDescription.textContent
  );
}
//-------
definePlaceholderName();

const popupEditForm = popup.querySelector(
  "div.popup__container .popup__edit-form"
);

//---Задаем правило обработки сабмита на попапе---
function formSubmitHandler(evt) {
  evt.preventDefault();
  if (inputName.value === "" && inputDescription.value !== "") {

    profileInfoDescription.textContent = inputDescription.value;
  } else if (inputDescription.value === "" && inputName.value !== "") {
    profileInfoName.textContent = inputName.value;

  } else if (inputDescription.value === "" && inputName.value === "") {
    profileInfoName.textContent = profileInfoName.textContent;
    profileInfoDescription.textContent = profileInfoDescription.textContent;
  } else {
    profileInfoName.textContent = inputName.value;
    profileInfoDescription.textContent = inputDescription.value;
  }

  appearancePopup();
  definePlaceholderName();
}

popupEditForm.addEventListener("submit", formSubmitHandler);
//------
