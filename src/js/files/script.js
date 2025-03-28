// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { getPosts } from './sanityAPI.js';



// test fetch =========================================================


document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("posts");

  // Перевіряємо, чи є контейнер постів на сторінці
  if (!postsContainer) return;

  const loadMoreButton = document.createElement("button");
  loadMoreButton.textContent = "Завантажити ще";
  loadMoreButton.id = "load-more";
  loadMoreButton.style.display = "none"; // Ховаємо кнопку, поки не з'ясуємо, чи є ще пости

  let start = 0;
  const limit = 4;

  async function loadPosts() {
    try {
      const posts = await getPosts(start, limit);

      if (posts.length > 0) {
        posts.forEach(post => {
          const postElement = document.createElement("div");
          postElement.classList.add("post");

          const postLink = document.createElement("a");
          postLink.href = `/post.html?slug=${post.slug}`;
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

          postLink.append(postBg, postTitle, postDeskr, postDate);
          postElement.appendChild(postLink);
          postsContainer.appendChild(postElement);
        });

        start += limit;
        loadMoreButton.style.display = posts.length < limit ? "none" : "block";
      } else {
        loadMoreButton.style.display = "none";
      }
    } catch (error) {
      console.error("Помилка завантаження постів:", error);
      postsContainer.innerHTML = "<p>Не вдалося завантажити пости</p>";
    }
  }

  loadPosts();
  postsContainer.after(loadMoreButton);
  loadMoreButton.addEventListener("click", loadPosts);
});


  