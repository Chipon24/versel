

import { getHero } from '../sanityAPI.js';


// Функція для рендерингу зображення поста

document.addEventListener("DOMContentLoaded", async () => {
  const heroContainer = document.getElementById("hero");

  if (!heroContainer) {
    console.error("Контейнер для Hero не знайдений");
    return;
  }

  try {
    const hero = await getHero();  // Отримуємо дані Hero

    console.log(hero); // Перевіряємо, що саме отримуємо

    // Перевірка на наявність полів heroTitle і heroDescription
    if (hero && hero[0] && hero[0].heroTitle && hero[0].heroDescription) {
      const heroElement = document.createElement("div");
      heroElement.classList.add("hero-content");

      heroElement.innerHTML = `
        <h1>${hero[0].heroTitle}</h1>
        <h2>${hero[0].heroDescription}</h2>
      `;

      heroContainer.appendChild(heroElement);
    } else {
      heroContainer.innerHTML = "<p>Немає даних про Hero</p>";
    }
  } catch (error) {
    console.error("Помилка завантаження даних Hero:", error);
    heroContainer.innerHTML = "<p>Не вдалося завантажити дані Hero</p>";
  }
});

