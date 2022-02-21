const popup = document.querySelector(".popup");
const popupEditFormCloseButton = popup.querySelector(
  "div.popup__container .popup__close-button"
);
const profileEditButton = document.querySelector(
  "section.profile div.profile__container .profile__edit-button"
);

//------------------------------Открытие/закрытие попапа-----------------------------------------------------------------------------------------
function appearanceEditFormPopup() {
  popup.classList.toggle("popup_opened");
  editFormInputName.value = "";
  editFormInputDescription.value = "";
}

profileEditButton.addEventListener("click", appearanceEditFormPopup);
popupEditFormCloseButton.addEventListener("click", appearanceEditFormPopup);
//-----------------------------------------------------------------------------------------------------------------------------------------------

const editFormPopupInputs = popup.querySelectorAll(
  "div.popup__container form.popup__edit-form fieldset.popup__input-container .popup__item"
);

const editFormInputName = editFormPopupInputs[0];
const editFormInputDescription = editFormPopupInputs[1];

const profileInfoName = document.querySelector(
  "section.profile div.profile__container div.profile__content .profile__info_name"
);
const profileInfoDescription = document.querySelector(
  "section.profile div.profile__container div.profile__content .profile__info_description"
);

//---------------------Задаем правило для содержания плейсхолдера---------------------------------------------------------------------------------
function definePlaceholderName() {
  editFormInputName.setAttribute("placeholder", profileInfoName.textContent);
  editFormInputDescription.setAttribute(
    "placeholder",
    profileInfoDescription.textContent
  );
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
definePlaceholderName();

const popupEditForm = popup.querySelector(
  "div.popup__container .popup__edit-form"
);

//-----------------------Задаем правило обработки сабмита на попапе--------------------------------------------------------------------------------
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  if (editFormInputName.value === "" && editFormInputDescription.value !== "") {
    profileInfoDescription.textContent = editFormInputDescription.value;
  } else if (
    editFormInputDescription.value === "" &&
    editFormInputName.value !== ""
  ) {
    profileInfoName.textContent = editFormInputName.value;
  } else if (
    editFormInputDescription.value === "" &&
    editFormInputName.value === ""
  ) {
    profileInfoName.textContent = profileInfoName.textContent;
    profileInfoDescription.textContent = profileInfoDescription.textContent;
  } else {
    profileInfoName.textContent = editFormInputName.value;
    profileInfoDescription.textContent = editFormInputDescription.value;
  }

  appearanceEditFormPopup();
  definePlaceholderName();
}

popupEditForm.addEventListener("submit", editFormSubmitHandler);
//-------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------Создаем 6 карточек через JS--------------------------------------------------------------------------------

const initialCards = [
  {
    name: "Намибия",
    link: "https://images.unsplash.com/photo-1644235279538-4cc7cbdca6a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80",
  },
  {
    name: "Монте Бальдо",
    link: "https://images.unsplash.com/photo-1643661100639-de5cdf7bcb80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    name: "Леба",
    link: "https://images.unsplash.com/photo-1640885939120-2d66e488f9aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    name: "Эстес парк",
    link: "https://images.unsplash.com/photo-1643326522611-419b6aac7141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
  },
  {
    name: "Гималаи",
    link: "https://images.unsplash.com/photo-1548319558-d4987a6a217c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    name: "Флом",
    link: "https://images.unsplash.com/photo-1643193371987-42bac7f9a267?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
  },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(
  "section.cards .cards__card-container"
);

initialCards.forEach(function (item) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__picture").src = item.link;
  card.querySelector(".card__picture").alt = item.name;
  card.querySelector("div.card__caption .card__text").textContent = item.name;
  cardContainer.prepend(card);
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------Добавляем форму для создания новой карточки--------------------------------------------------------------------------

const popupTemplate = document.querySelector("#popup").content;
const addPopup = popupTemplate.querySelector(".popup").cloneNode(true);

addPopup.querySelector("div.popup__container .popup__header").textContent =
  "Новое место";
addPopup.querySelector(
  "div.popup__container .popup__submit-button"
).textContent = "Создать";
popup.after(addPopup);

const profileAddButton = document.querySelector(
  "section.profile .profile__add-button"
);

function appearanceCreateCardFormPopup() {
  popup.nextSibling.classList.toggle("popup_opened");
  addFormInputName.value = "";
  addFormInputDescription.value = "";
}

profileAddButton.addEventListener("click", appearanceCreateCardFormPopup);

const popupCreateCardCloseButton = popup.nextSibling.querySelector(
  "div.popup__container .popup__close-button"
);

popupCreateCardCloseButton.addEventListener(
  "click",
  appearanceCreateCardFormPopup
);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------Реализуем функционал по добавлению карточки пользователем-------------------------------------------------------------------------

const popupAddForm = popup.nextSibling.querySelector(
  "div.popup__container .popup__edit-form"
);

const addFormPopupInputs = popup.nextSibling.querySelectorAll(
  "div.popup__container form.popup__edit-form fieldset.popup__input-container .popup__item"
);

const addFormInputName = addFormPopupInputs[0];
const addFormInputDescription = addFormPopupInputs[1];

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  //Создаем карточку из темплейта
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__picture").src = addFormInputDescription.value;
  card.querySelector(".card__picture").alt = addFormInputName.value;
  card.querySelector("div.card__caption .card__text").textContent =
    addFormInputName.value;
  //Реализуем функционал лайка
  card
    .querySelector("div.card__caption .card__like-icon")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-icon_active");
    });
  //Реализуем функционал удаления карточки
  card
    .querySelector(".card__trash-icon")
    .addEventListener("click", function () {
      card.querySelector(".card__trash-icon").closest(".card").remove();
    });
  //Реализуем функционал зума картинки (создание попапа с картинкой из темплейта с заданными значениями + возможность закрытия попапа через удаление)
  card
    .querySelector(".card__pic-button")
    .addEventListener("click", function () {
      const picPopupTemplate = document.querySelector("#picPopup").content;
      const addPicPopup = picPopupTemplate
        .querySelector(".picPopup")
        .cloneNode(true);
      const cardImage = card.querySelector(
        "button.card__pic-button .card__picture"
      ).src;
      const cardCaption = card.querySelector(
        "div.card__caption .card__text"
      ).textContent;
      addPicPopup.querySelector(
        "div.picPopup__container figure.picPopup__image-container .picPopup__picture"
      ).src = cardImage;
      addPicPopup.querySelector(
        "div.picPopup__container figure.picPopup__image-container .picPopup__picture"
      ).alt = cardCaption;

      addPicPopup.querySelector(
        "div.picPopup__container figure.picPopup__image-container .picPopup__caption"
      ).textContent = cardCaption;
      const picPopupCloseButton = addPicPopup.querySelector(
        "div.picPopup__container .picPopup__close-button"
      );
      picPopupCloseButton.addEventListener("click", function () {
        picPopupCloseButton.closest(".picPopup").remove();
      });
      document.body.prepend(addPicPopup);
    });

  if (addFormInputName.value === "") {
    card.querySelector("div.card__caption .card__text").textContent =
      "Описания нет";
  }
  if (addFormInputDescription.value === "") {
    card.querySelector(".card__picture").alt = "Изображение не загрузили";
  }
  cardContainer.prepend(card);
  addFormInputDescription.value = "";
  addFormInputName.value = "";
  appearanceCreateCardFormPopup();
}

popupAddForm.addEventListener("submit", addFormSubmitHandler);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------Реализуем функционал лайка карточки, ее удаления и зума (все кроме добавляемых пользователем)-----------------------------------

//Объявляем переменную для работы с коллекцией изначально существующих карточек
//и проходимся по ней через for
const cardArr = cardContainer.querySelectorAll(".card");
for (let i = 0; i < cardArr.length; i++) {
  //Добавляем функционал для лайка всей коллекции
  const likeButton = cardArr[i].querySelector(
    "div.card__caption .card__like-icon"
  );
  //Добавляем функционал удаления карточки коллекции
  const trashButton = cardArr[i].querySelector(".card__trash-icon");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-icon_active");
  });
  trashButton.addEventListener("click", function () {
    trashButton.closest(".card").remove();
  });
  //Добавляем функционал зума картинки(создание попапа из темплейта) и ее закрытия(удаления попапа) для всей коллекции
  function picPopup() {
    const picPopupTemplate = document.querySelector("#picPopup").content;
    const addPicPopup = picPopupTemplate
      .querySelector(".picPopup")
      .cloneNode(true);
    const cardImage = cardArr[i].querySelector(
      "button.card__pic-button .card__picture"
    ).src;
    const cardCaption = cardArr[i].querySelector(
      "div.card__caption .card__text"
    ).textContent;
    addPicPopup.querySelector(
      "div.picPopup__container figure.picPopup__image-container .picPopup__picture"
    ).src = cardImage;
    addPicPopup.querySelector(
      "div.picPopup__container figure.picPopup__image-container .picPopup__picture"
    ).alt = cardCaption;

    addPicPopup.querySelector(
      "div.picPopup__container figure.picPopup__image-container .picPopup__caption"
    ).textContent = cardCaption;
    const picPopupCloseButton = addPicPopup.querySelector(
      "div.picPopup__container .picPopup__close-button"
    );
    picPopupCloseButton.addEventListener("click", function () {
      picPopupCloseButton.closest(".picPopup").remove();
    });
    document.body.prepend(addPicPopup);
  }
  const picPopupButton = cardArr[i].querySelector(".card__pic-button");
  picPopupButton.addEventListener("click", picPopup);
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
