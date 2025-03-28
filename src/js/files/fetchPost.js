// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { getSingle } from './sanityAPI.js';


document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.pathname.endsWith("post.html")) return;

    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug");

    if (!slug) {
      document.body.innerHTML = "<h1>Пост не знайдено</h1>";
      return;
    }

    try {
      
const single = await getSingle(slug);
      console.log("Отримані дані:", single);

      
      if (!single || Object.keys(single).length === 0) {
        document.body.innerHTML = "<h1>Пост не знайдено</h1>";
        return;
      }

      document.getElementById("post-single").innerHTML = `
        <h1>${single.title}</h1>
        
        <div>${new Date(single.publishDate).toLocaleDateString()}</div>
        
      `;

      const singleElement = document.createElement("article");
      singleElement.classList.add("post-block");
      const postContent = document.createElement("div");
      postContent.classList.add("post-content-s");

      if (Array.isArray(single.content)) {
        single.content.forEach(block => {
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
          }  if (block._type === "blokPostImage" && block.imageUrl) {
            const image = document.createElement("img");
            image.src = block.imageUrl;
            image.alt = block.alt || "Зображення";
            postContent.appendChild(image);
          }
        });
      }

      singleElement.append(postContent);
      document.getElementById("post-single").append(singleElement);
      
    } catch (error) {
      console.error("Помилка отримання поста:", error);
      document.body.innerHTML = "<h1>Помилка завантаження поста</h1>";
    }
});

  
  

