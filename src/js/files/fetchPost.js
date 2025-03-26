// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { getSingle as fetchPostFromAPI } from './sanityAPI.js';

document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.pathname.includes("post.html")) return;
  
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
  
      console.log("Отримані дані:", data); // Додаємо лог у консоль для перевірки
  
      const post = data.result;
      if (!post) {
        document.body.innerHTML = "<h1>Пост не знайдено</h1>";
        return;
      }
  
      document.getElementById("post-single").innerHTML = `
        <h1>${post.title}</h1>
        <img src="${post.poster}" alt="${post.title}" style="max-width:100%;">
        <div>${new Date(post.publishDate).toLocaleDateString()}</div>
        <div>${post.content?.map(block => 
          block._type === "block" ? `<p>${block.children?.map(child => child.text).join(" ")}</p>` : ""
        ).join("") || "<p>Опис відсутній</p>"}</div>
      `;
    } catch (error) {
      console.error("Помилка отримання поста:", error);
      document.body.innerHTML = "<h1>Помилка завантаження поста</h1>";
    }
  });
  
  
  
  

// document.addEventListener("DOMContentLoaded", async () => {
//     // Перевірка наявності елемента #post
//     const postsContainer = document.getElementById("post-single");
//     if (!postsContainer) {
//         console.error("Елемент #post не знайдено в DOM!");
//         document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//         return;
//     }

//     // Отримуємо параметр slug із URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const slug = urlParams.get("slug");

//     if (!slug) {
//         document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//         return;
//     }

//     try {
//         // Отримуємо пост за slug
//         const post = await getPostBySlug(slug); // Отримуємо конкретний пост

//         if (!post) {
//             document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//             return;
//         }

//         // Створення елемента для поста
//         const postElement = document.createElement("div");
//         postElement.classList.add("post");

//         const postTitle = document.createElement("h2");
//         postTitle.classList.add("post-title");
//         postTitle.textContent = post.title;

//         const postDate = document.createElement("div");
//         postDate.classList.add("post-date");
//         postDate.textContent = `Опубліковано: ${post.publishDate}`;

//         const postContent = document.createElement("div");
//         postContent.classList.add("post-content");

//         // Перебір вмісту поста
//         post.content.forEach(block => {
//             if (block._type === "block" && block.children) {
//                 const text = block.children.map(child => child.text || "").join(" ").trim();
//                 if (text) {
//                     let element;
//                     if (block.style === "h4") {
//                         element = document.createElement("h4");
//                     } else if (block.style === "blockquote") {
//                         element = document.createElement("blockquote");
//                     } else {
//                         element = document.createElement("p");
//                     }
//                     element.textContent = text;
//                     postContent.appendChild(element);
//                 }
//             } else if (block._type === "blokPostImage" && block.imageUrl) {
//                 const image = document.createElement("img");
//                 image.src = block.imageUrl;
//                 image.alt = block.alt || "Зображення";
//                 postContent.appendChild(image);
//             }
//         });

//         // Додаємо елементи на сторінку
//         postElement.append(postTitle, postContent, postDate);
//         postsContainer.appendChild(postElement);

//     } catch (error) {
//         console.error("Помилка завантаження поста:", error);
//         document.body.innerHTML = "<h1>Не вдалося завантажити пост</h1>";
//     }
// });

// // Функція для отримання поста за slug
//  getSingle(slug)  


// console.log('Single')

  