import { popupZoomPic, popupAddForm } from "./modal.js";
import { openModalWindow, closeModalWindow } from "./utils.js";

export const initialCards = [
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
const cardContainer = document.querySelector(".cards__card-container");
const inputImageLink = popupAddForm.querySelector("input[name=image-link]");
const inputPlace = popupAddForm.querySelector("input[name=place]");

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
export const renderCard = (source, caption) => {
  cardContainer.prepend(createCard(source, caption));
};

//Создание карточки через ADD CARD FORM
export function addFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(inputImageLink.value, inputPlace.value);
  closeModalWindow(popupAddForm);
}
