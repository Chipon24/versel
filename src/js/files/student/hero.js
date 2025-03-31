

import { getHero } from '../sanityAPI.js';


// Функція для рендерингу зображення поста

document.addEventListener("DOMContentLoaded", async () => {
  const heroContainer = document.getElementById("hero");

  if (!heroContainer) {
    console.error("Контейнер для Hero не знайдений");
    return;
  }

  try {
    const hero = await getHero(); // Отримуємо дані Hero

    console.log(hero); // Лог для перевірки отриманих даних

    if (Array.isArray(hero) && hero.length > 0) {
      const { heroTitle, heroDescription } = hero[0]; // Деструктуризація для зручності

      // Перевіряємо, чи є хоча б одне заповнене поле
      if (heroTitle || heroDescription) {
        const heroElement = document.createElement("div");
        heroElement.classList.add("hero-content");

        if (heroTitle) {
          const titleElement = document.createElement("h1");
          titleElement.textContent = heroTitle;
          heroElement.appendChild(titleElement);
        }

        if (heroDescription) {
          const descriptionElement = document.createElement("h2");
          descriptionElement.textContent = heroDescription;
          heroElement.appendChild(descriptionElement);
        }

        heroContainer.appendChild(heroElement);
      }
    }
  } catch (error) {
    console.error("Помилка завантаження даних Hero:", error);
  }
});

