// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { getPosts } from './sanityAPI.js';



// test fetch =========================================================

// document.addEventListener("DOMContentLoaded", async () => {
//   const postsContainer = document.getElementById("posts");
//   const loadMoreButton = document.createElement("button");
//   loadMoreButton.textContent = "Завантажити ще";
//   loadMoreButton.id = "load-more";
//   loadMoreButton.style.display = "none"; // Ховаємо кнопку, поки не з'ясуємо, чи є ще пости

//   let start = 0; // Початковий індекс
//   const limit = 4; // Скільки постів завантажувати за раз

//   async function loadPosts() {
//     try {
//       const posts = await getPosts(start, limit);

//       if (posts.length > 0) {
//         posts.forEach(post => {
//           const postElement = document.createElement("div");
//           postElement.classList.add("post");

//           const postBg = document.createElement("img");
//           postBg.classList.add("post-bg");
//           postBg.src = post.poster;

//           const postTitle = document.createElement("h2");
//           postTitle.classList.add("post-title");

//           const postDate = document.createElement("div");
//           postDate.classList.add("post-date");

//           const postDeskr = document.createElement("div");
//           postDeskr.classList.add("post-deskr");

//           postTitle.textContent = post.title;
//           postDeskr.textContent = post.description;

//           postDate.textContent = post.publishDate;
//           postElement.append(postBg, postTitle, postDeskr, postDate);
//           postsContainer.appendChild(postElement);
//         });

//         start += limit; // Збільшуємо стартовий індекс для наступного запиту

//         // Якщо отримано менше постів, ніж limit, то ховаємо кнопку
//         if (posts.length < limit) {
//           loadMoreButton.style.display = "none";
//         } else {
//           loadMoreButton.style.display = "block";
//         }
//       } else {
//         loadMoreButton.style.display = "none"; // Якщо постів більше немає, ховаємо кнопку
//       }
//     } catch (error) {
//       console.error("Помилка завантаження постів:", error);
//       postsContainer.innerHTML = "<p>Не вдалося завантажити пости</p>";
//     }
//   }

//   // Початкове завантаження перших постів
//   loadPosts();

//   // Додаємо кнопку після контейнера постів
//   postsContainer.after(loadMoreButton);

//   // Обробник кліку для кнопки "Завантажити ще"
//   loadMoreButton.addEventListener("click", loadPosts);
// });


document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("posts");
  const loadMoreButton = document.createElement("button");
  loadMoreButton.textContent = "Завантажити ще";
  loadMoreButton.id = "load-more";
  loadMoreButton.style.display = "none"; // Ховаємо кнопку, поки не з'ясуємо, чи є ще пости

  let start = 0; // Початковий індекс
  const limit = 4; // Скільки постів завантажувати за раз

  async function loadPosts() {
    try {
      const posts = await getPosts(start, limit);

      if (posts.length > 0) {
        posts.forEach(post => {
          const postElement = document.createElement("div");
          postElement.classList.add("post");

          const postLink = document.createElement("a"); // Створюємо посилання
          postLink.href = `/post.html?slug=${post.slug}`; // Додаємо URL з slug
          postLink.classList.add("post-link");

          const postBg = document.createElement("img");
          postBg.classList.add("post-bg");
          postBg.src = post.poster;

          const postTitle = document.createElement("h2");
          postTitle.classList.add("post-title");
          postTitle.textContent = post.title;

          const postDate = document.createElement("div");
          postDate.classList.add("post-date");
          postDate.textContent = new Date(post.publishDate).toLocaleDateString();

          const postDeskr = document.createElement("div");
          postDeskr.classList.add("post-deskr");
          postDeskr.textContent = post.description;

          // Додаємо весь вміст у посилання
          postLink.append(postBg, postTitle, postDeskr, postDate);
          postElement.appendChild(postLink);
          postsContainer.appendChild(postElement);
        });

        start += limit; // Збільшуємо стартовий індекс для наступного запиту

        // Якщо отримано менше постів, ніж limit, то ховаємо кнопку
        loadMoreButton.style.display = posts.length < limit ? "none" : "block";
      } else {
        loadMoreButton.style.display = "none"; // Якщо постів більше немає, ховаємо кнопку
      }
    } catch (error) {
      console.error("Помилка завантаження постів:", error);
      postsContainer.innerHTML = "<p>Не вдалося завантажити пости</p>";
    }
  }

  // Початкове завантаження перших постів
  loadPosts();

  // Додаємо кнопку після контейнера постів
  postsContainer.after(loadMoreButton);

  // Обробник кліку для кнопки "Завантажити ще"
  loadMoreButton.addEventListener("click", loadPosts);
});

  