import {popupEditForm, popupAddForm, popupZoomPic} from './modal.js';

export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("popup_opened");
};

export const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove("popup_opened");
};

export const keyHandler = (evt) => {
  if (evt.key === "Escape") {
    closeModalWindow(popupEditForm);
    closeModalWindow(popupAddForm);
    closeModalWindow(popupZoomPic);
  }
};
