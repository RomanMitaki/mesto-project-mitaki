export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keydown", keyHandler);
};

export const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyHandler);
};

const keyHandler = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closeModalWindow(openedPopup);
  }
};
