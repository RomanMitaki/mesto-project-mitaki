import { openModalWindow } from "./modal.js";
import { deleteCard, addLike, removeLike } from "./api.js";

export const popupZoomPic = document.querySelector(".popup_type_image-zoom");
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".cards__card-container");
const imgZoomPic = popupZoomPic.querySelector(".popup__picture");
const captionZoomPic = popupZoomPic.querySelector(".popup__caption");

//Функция постановки или снятия лайка
function likeCard(res, elCounter, elIcon) {
  elCounter.textContent = res.likes.length;
  elIcon.classList.toggle("card__like-icon_active");
}

//Функция создания(клонирования) карточки
const createCard = (source, caption, res, userId) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardPicture = card.querySelector(".card__picture");
  const likeCounter = card.querySelector(".card__like-counter");
  const likeIcon = card.querySelector(".card__like-icon");
  const trashIcon = card.querySelector(".card__trash-icon");
  cardPicture.src = source;
  cardPicture.alt = caption;
  card.querySelector(".card__text").textContent = caption;
  likeCounter.textContent = res.likes.length;
  if (!(res.owner._id === userId)) {
    trashIcon.classList.add("card__trash-icon_hidden");
  }
  const like = res.likes.some((likesObj) => {
    return likesObj._id === userId;
  });
  if (like === true) {
    likeIcon.classList.add("card__like-icon_active");
  }
  //Слушатель лайка
  likeIcon.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("card__like-icon_active")) {
      addLike(res._id)
        .then((res) => {
          likeCard(res, likeCounter, likeIcon);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      removeLike(res._id)
        .then((res) => {
          likeCard(res, likeCounter, likeIcon);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  //Слушатель удаления карточки
  trashIcon.addEventListener("click", (evt) => {
    deleteCard(res._id)
      .then((res) => {
        trashIcon.closest(".card").remove();
      })
      .catch((err) => {
        console.log(err);
      });
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
export const renderCard = (source, caption, res, userId) => {
  cardContainer.prepend(createCard(source, caption, res, userId));
};
