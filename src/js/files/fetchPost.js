// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { getSingle as fetchPostFromAPI } from './sanityAPI.js';

// document.addEventListener("DOMContentLoaded", async () => {
//     if (!window.location.pathname.includes("post.html")) return;
  
//     const urlParams = new URLSearchParams(window.location.search);
//     const slug = urlParams.get("slug");
  
//     if (!slug) {
//       document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//       return;
//     }
  
//     try {
//       const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]`);
//       const response = await fetch(`https://qniqk200.api.sanity.io/v2021-06-07/data/query/production?query=${query}`);
//       const data = await response.json();
  
//       console.log("Отримані дані:", data); // Додаємо лог у консоль для перевірки
  
//       const post = data.result;
//       if (!post) {
//         document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//         return;
//       }
  
//       document.getElementById("post-single").innerHTML = `
//         <h1>${post.title}</h1>
//         <img src="${post.poster}" alt="${post.title}" style="max-width:100%;">
//         <div>${new Date(post.publishDate).toLocaleDateString()}</div>
//         <div>${post.content?.map(block => 
//           block._type === "block" ? `<p>${block.children?.map(child => child.text).join(" ")}</p>` : ""
//         ).join("") || "<p>Опис відсутній</p>"}</div>
//       `;
//       const singleElement = document.createElement("article");
//       singleElement.classList.add("post-block");
//       const postContent = document.createElement("div");
//       postContent.classList.add("post-content-s");

//       post.content.forEach(block => {
//         if (block._type === "contentText" && block.children) {
//           const text = block.children.map(child => child.text || "").join(" ").trim();
//           if (text) {
//             let element;
//             if (block.style === "h4") {
//               element = document.createElement("h4");
//             } else if (block.style === "blockquote") {
//               element = document.createElement("blockquote");
//             } else {
//               element = document.createElement("p");
//             }
//             element.textContent = text;
//             postContent.appendChild(element);
//           }
//         } else if (block._type === "blokPostImage" && block.imageUrl) {
//           const image = document.createElement("img");
//           image.src = block.imageUrl;
//           image.alt = block.alt || "Зображення";
//           postContent.appendChild(image);
//         }
//       });

//       singleElement.append(postContent);
//     } catch (error) {
//       console.error("Помилка отримання поста:", error);
//       document.body.innerHTML = "<h1>Помилка завантаження поста</h1>";
//     }
//   });
  
document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.pathname.endsWith("post.html")) return;

    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug");

    if (!slug) {
      document.body.innerHTML = "<h1>Пост не знайдено</h1>";
      return;
    }

    try {
      const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]`);
      const response = await fetch(`https://qniqk200.api.sanity.io/v2021-06-07/data/query/production?query=${query}`);
      const data = await response.json();

      console.log("Отримані дані:", data);

      const post = data.result;
      if (!post || Object.keys(post).length === 0) {
        document.body.innerHTML = "<h1>Пост не знайдено</h1>";
        return;
      }

      document.getElementById("post-single").innerHTML = `
        <h1>${post.title}</h1>
        <img src="${post.poster}" alt="${post.title}" style="max-width:100%;">
        <div>${new Date(post.publishDate).toLocaleDateString()}</div>
        <div>${Array.isArray(post.content) ? 
          post.content.map(block => block._type === "block" ? 
            `<p>${block.children?.map(child => child.text).join(" ")}</p>` : ""
          ).join("") : "<p>Опис відсутній</p>"}
        </div>
      `;

      const singleElement = document.createElement("article");
      singleElement.classList.add("post-block");
      const postContent = document.createElement("div");
      postContent.classList.add("post-content-s");

      if (Array.isArray(post.content)) {
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
          }  else if (block._type === "blokPostImage" && block.image?.asset?.url) {
            const image = document.createElement("img");
            image.src = block.image.asset.url;
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

  
  

