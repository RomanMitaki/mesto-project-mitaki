export const renderLoading = (isLoading, btn, originText) => {
  if (isLoading) {
    btn.textContent = "Сохранение...";
  } else {
    setTimeout(() => {
      btn.textContent = originText;
    }, 1000);
  }
};
