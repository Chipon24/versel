// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { getPosts } from './sanityAPI.js';



// test fetch =========================================================

document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("post");
  

 

  async function loadPost() {
    try {
      const postsS = await getPosts();

      if (posts.length > 0) {
        postsS.forEach(post => {
          const postElement = document.createElement("div");
          postElement.classList.add("post-s");

          // const postBg = document.createElement("img");
          // postBg.classList.add("post-bg");
          // postBg.src = post.poster;

          const postTitle = document.createElement("h2");
          postTitle.classList.add("post-title-s");

          const postDate = document.createElement("div");
          postDate.classList.add("post-date-s");

          const postContent = document.createElement("div");
          postContent.classList.add("post-content-s");

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

       
       
      } else {
        console.log('no post') // Якщо постів більше немає, ховаємо кнопку
      }
    } catch (error) {
      console.error("Помилка завантаження постів:", error);
      postsContainer.innerHTML = "<p>Не вдалося завантажити пости</p>";
    }
  }

  // Початкове завантаження перших постів
  loadPost();

  // Додаємо кнопку після контейнера постів
  
});

  