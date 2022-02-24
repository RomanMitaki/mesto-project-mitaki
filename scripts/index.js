//GLOBAL SCOPE
//..попап EDIT FORM
const popupEditForm = document.querySelector(".popup_type_edit-form");
//....слушатели и другие константы, связанные с попапом EDIT FORM
const popupEditFormCloseButton = popupEditForm.querySelector(
  ".popup__close-button"
);
const profileEditButton = document.querySelector(".profile__edit-button");
const inputName = popupEditForm.querySelector("input[name=name]");
const inputDescription = popupEditForm.querySelector("input[name=description]");
const popupFormElement = popupEditForm.querySelector(".popup__edit-form");
const profileInfoName = document.querySelector(".profile__info_name");
const profileInfoDescription = document.querySelector(
  ".profile__info_description"
);

//..попап ZOOM PIC
const popupZoomPic = document.querySelector(".popup_type_image-zoom");

//..попап ADD FORM
const popupAddForm = document.querySelector(".popup_type_addcard-form");
//....слушатели и другие константы, связанные с попапом ADD FORM
const popupAddFormCloseButton = popupAddForm.querySelector(
  ".popup__close-button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const inputPlace = popupAddForm.querySelector("input[name=place]");
const inputImageLink = popupAddForm.querySelector("input[name=image-link]");
const addForm = popupAddForm.querySelector(".popup__edit-form");

//..темплейт карточки и их создание
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".cards__card-container");
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

//------------------------Универсальные функции----------------------------
//Создаем функции открытия и закрытия попапов
const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("popup_opened");
};

const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove("popup_opened");
};
//------------------------функции EDIT FORM---------------------------------

//Обработка сабмита для EDIT FORM
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileInfoDescription.textContent = inputDescription.value;
  closeModalWindow(popupEditForm);
}

//----------------------функции ADD CARD FORM--------------------------------

//Создание карточки через ADD CARD FORM
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(inputImageLink.value, inputPlace.value);
  closeModalWindow(popupAddForm);
  inputImageLink.value = "";
  inputPlace.value = "";
}

//---------------------------CARDS-----------------------------------------

//Функция создания(клонирования) карточки
const createCard = (source, caption) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__picture").src = source;
  card.querySelector(".card__picture").alt = caption;
  card.querySelector(".card__text").textContent = caption;
  //Слушатель лайка
  card.querySelector(".card__like-icon").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-icon_active");
  });
  //Слушатель удаления карточки
  card.querySelector(".card__trash-icon").addEventListener("click", (evt) => {
    evt.target.closest(".card").remove();
  });
  //Слушатель зума картинки
  card.querySelector(".card__pic-button").addEventListener("click", () => {
    popupZoomPic.querySelector(".popup__picture").src = source;
    popupZoomPic.querySelector(".popup__picture").alt = caption;
    popupZoomPic.querySelector(".popup__caption").textContent = caption;
    openModalWindow(popupZoomPic);
  });
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

//------------------Слушатели---------------------

//Открытие и закрытие EDIT FORM
profileEditButton.addEventListener("click", () => {
  inputName.value = profileInfoName.textContent;
  inputDescription.value = profileInfoDescription.textContent;
  openModalWindow(popupEditForm);
});

popupEditFormCloseButton.addEventListener("click", () => {
  closeModalWindow(popupEditForm);
  inputName.value = "";
  inputDescription.value = "";
});

popupFormElement.addEventListener("submit", editFormSubmitHandler);

//Открытие и закрытие ADD CARD FORM
profileAddButton.addEventListener("click", () => {
  openModalWindow(popupAddForm);
});

popupAddFormCloseButton.addEventListener("click", () => {
  closeModalWindow(popupAddForm);
  inputPlace.value = "";
  inputImageLink.value = "";
});

addForm.addEventListener("submit", addFormSubmitHandler);

//Закрытие зума картинки POP-UP IMAGE ZOOM
popupZoomPic
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    closeModalWindow(popupZoomPic);
  });