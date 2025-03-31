

import { getHeroSlider } from '../sanityAPI.js';

document.addEventListener("DOMContentLoaded", async () => {
  const heroMediaContainer = document.getElementById("heroMedia");
  if (!heroMediaContainer) {
    console.error("Контейнер для heroMedia не знайдений");
    return;
  }

  try {
    const heroMedia = await getHeroSlider();
    console.log(heroMedia);

    if (heroMedia && heroMedia[0]) {
      const { heroMediaTitle, heroMediaDescription, heroGallery } = heroMedia[0];

      // Додаємо заголовок, якщо він є
      const titleElement = heroMediaContainer.querySelector(".heroMedia__title");
      if (heroMediaTitle && titleElement) {
        titleElement.textContent = heroMediaTitle;
      }

      // Додаємо опис, якщо він є
      const descriptionElement = heroMediaContainer.querySelector(".heroMedia__description");
      if (heroMediaDescription && descriptionElement) {
        descriptionElement.textContent = heroMediaDescription;
      }

      // Заповнюємо слайдер, якщо є зображення
      const swiperWrapper = heroMediaContainer.querySelector(".heroMedia__wrapper");
      if (heroGallery && heroGallery.length > 0 && swiperWrapper) {
        swiperWrapper.innerHTML = ""; // Очищаємо старі слайди
        
        heroGallery.forEach(imgSrc => {
          const slide = document.createElement("div");
          slide.classList.add("heroMedia__slide", "swiper-slide");
          slide.innerHTML = `<img src="${imgSrc}" alt="heroMedia image">`;
          swiperWrapper.appendChild(slide);
        });
      }
    }
  } catch (error) {
    console.error("Помилка завантаження heroMedia:", error);
  }
});
