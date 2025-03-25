// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { getPosts } from './sanityAPI.js';



// test fetch =========================================================

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

          // const postBg = document.createElement("img");
          // postBg.classList.add("post-bg");
          // postBg.src = post.poster;

          const postTitle = document.createElement("h2");
          postTitle.classList.add("post-title");

          const postDate = document.createElement("div");
          postDate.classList.add("post-date");

          const postContent = document.createElement("div");
          postContent.classList.add("post-content");

          postTitle.textContent = post.title;

          post.content.forEach(block => {
            if (block._type === "contentText" && block.children) {
              const text = block.children.map(child => child.text || "").join(" ").trim();
              if (text) {
                let element;
                if (block.style === "h4") {
                  element = document.createElement("h4");
                } else if (block.style === "blockquote") {
                  element = document.createElement("blockquote");
                } else {
                  element = document.createElement("p");
                }
                element.textContent = text;
                postContent.appendChild(element);
              }
            } else if (block._type === "blokPostImage" && block.imageUrl) {
              const image = document.createElement("img");
              image.src = block.imageUrl;
              image.alt = block.alt || "Зображення";
              postContent.appendChild(image);
            }
          });

          postDate.textContent = post.publishDate;
          postElement.append(postTitle, postContent, postDate);
          postsContainer.appendChild(postElement);
        });

        start += limit; // Збільшуємо стартовий індекс для наступного запиту

        // Якщо отримано менше постів, ніж limit, то ховаємо кнопку
        if (posts.length < limit) {
          loadMoreButton.style.display = "none";
        } else {
          loadMoreButton.style.display = "block";
        }
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

  