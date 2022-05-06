import { popupZoomPic, popupAddForm } from "./modal.js";
import { openModalWindow, closeModalWindow } from "./utils.js";
import { addCard, deleteCard, addLike, removeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".cards__card-container");
const inputImageLink = popupAddForm.querySelector("input[name=image-link]");
const inputPlace = popupAddForm.querySelector("input[name=place]");
const imgZoomPic = popupZoomPic.querySelector(".popup__picture");
const captionZoomPic = popupZoomPic.querySelector(".popup__caption");

//Функция создания(клонирования) карточки
const createCard = (source, caption, res) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__picture").src = source;
  card.querySelector(".card__picture").alt = caption;
  card.querySelector(".card__text").textContent = caption;
  card.querySelector(".card__like-counter").textContent = res.likes.length;
  //Слушатель лайка
  card.querySelector(".card__like-icon").addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("card__like-icon_active")) {
      addLike(res._id).then((res) => {
        card.querySelector(".card__like-counter").textContent =
          res.likes.length;
      });
      evt.target.classList.toggle("card__like-icon_active");
    } else {
      removeLike(res._id).then((res) => {
        card.querySelector(".card__like-counter").textContent =
          res.likes.length;
      });
      evt.target.classList.toggle("card__like-icon_active");
    }
  });
  //Слушатель удаления карточки
  card.querySelector(".card__trash-icon").addEventListener("click", (evt) => {
    deleteCard(res._id);
    evt.target.closest(".card").remove();
  });
  //Слушатель зума картинки
  card.querySelector(".card__pic-button").addEventListener("click", () => {
    imgZoomPic.src = source;
    imgZoomPic.alt = caption;
    captionZoomPic.textContent = caption;
    openModalWindow(popupZoomPic);
  });
  return card;
};

//Функция отрисовки карточки
export const renderCard = (source, caption, res) => {
  cardContainer.prepend(createCard(source, caption, res));
};

//Создание карточки через ADD CARD FORM
export function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCardInfo = {
    link: inputImageLink.value,
    caption: inputPlace.value,
  };
  addCard(newCardInfo)
    .then((res) => {
      renderCard(res.link, res.name, res);
      closeModalWindow(popupAddForm);
    })
    .catch((err) => {
      console.log(err);
    });
}
