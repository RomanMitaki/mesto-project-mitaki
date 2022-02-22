//Создаем функции открытия и закрытия модального окна
const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("popup_opened");
};

const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove("popup_opened");
};

//Открытие и закрытие EDIT FORM
const popupEditForm = document.querySelector(".popup_type_edit-form");
const popupEditFormCloseButton = popupEditForm.querySelector(
  ".popup__close-button"
);
const profileEditButton = document.querySelector(".profile__edit-button");
const inputName = popupEditForm.querySelector("input[name=name]");
const inputDescription = popupEditForm.querySelector("input[name=description]");

profileEditButton.addEventListener("click", function () {
  openModalWindow(popupEditForm);
});

popupEditFormCloseButton.addEventListener("click", function () {
  closeModalWindow(popupEditForm);
  inputName.value = "";
  inputDescription.value = "";
});

//Обработка сабмита для EDIT FORM
const editForm = popupEditForm.querySelector(".popup__edit-form");
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const profileInfoName = document.querySelector(".profile__info_name");
  const profileInfoDescription = document.querySelector(
    ".profile__info_description"
  );
  profileInfoName.textContent = inputName.value;
  profileInfoDescription.textContent = inputDescription.value;
  closeModalWindow(popupEditForm);
  inputName.value = "";
  inputDescription.value = "";
}

editForm.addEventListener("submit", editFormSubmitHandler);

//Создаем 6 карточек через JS

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

//Функция создания(клонирования) карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".cards__card-container");

const createCard = (source, caption) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__picture").src = source;
  card.querySelector(".card__picture").alt = caption;
  card.querySelector(".card__text").textContent = caption;
  return card;
};
//Функция отрисовки карточки

const renderCard = (source, caption) => {
  cardContainer.prepend(createCard(source, caption));
};
//Отрисовка карточек из массива через JS
initialCards.forEach(function (item) {
  renderCard(item.link, item.name);
});

//Открытие и закрытие ADD CARD FORM
const popupAddForm = document.querySelector(".popup_type_addcard-form");
const popupAddFormCloseButton = popupAddForm.querySelector(
  ".popup__close-button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const inputPlace = popupAddForm.querySelector("input[name=place]");
const inputImageLink = popupAddForm.querySelector("input[name=image-link]");

profileAddButton.addEventListener("click", function () {
  openModalWindow(popupAddForm);
});

popupAddFormCloseButton.addEventListener("click", function () {
  closeModalWindow(popupAddForm);
  inputPlace.value = "";
  inputImageLink.value = "";
});

//Создание карточки через ADD CARD FORM
const addForm = popupAddForm.querySelector(".popup__edit-form");
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(inputImageLink.value, inputPlace.value);
  closeModalWindow(popupAddForm);
  inputImageLink.value = "";
  inputPlace.value = "";
}

addForm.addEventListener("submit", addFormSubmitHandler);

/*




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
}*/

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
