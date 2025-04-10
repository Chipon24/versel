// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { getSingle, getAllPosts } from './sanityAPI.js';


// document.addEventListener("DOMContentLoaded", async () => {
//     if (!window.location.pathname.endsWith("post.html")) return;

//     const urlParams = new URLSearchParams(window.location.search);
//     const slug = urlParams.get("slug");

//     if (!slug) {
//       document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//       return;
//     }

//     try {
      
// const single = await getSingle(slug);
//       console.log("Отримані дані:", single);

      
//       if (!single || Object.keys(single).length === 0) {
//         document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//         return;
//       }

//       document.getElementById("post-single").innerHTML = `
//         <h1>${single.title}</h1>
        
//         <div>${new Date(single.publishDate).toLocaleDateString()}</div>
        
//       `;

//       const singleElement = document.createElement("article");
//       singleElement.classList.add("post-block");
//       const postContent = document.createElement("div");
//       postContent.classList.add("post-content-s");

//       if (Array.isArray(single.content)) {
//         single.content.forEach(block => {
//           if (block._type === "contentText" && block.children) {
//             const text = block.children.map(child => child.text || "").join(" ").trim();
//             if (text) {
//               let element;
//               if (block.style === "h4") {
//                 element = document.createElement("h4");
//               } else if (block.style === "blockquote") {
//                 element = document.createElement("blockquote");
//               } else {
//                 element = document.createElement("p");
//               }
//               element.textContent = text;
//               postContent.appendChild(element);
//             }
//           }  if (block._type === "blokPostImage" && block.imageUrl) {
//             const image = document.createElement("img");
//             image.src = block.imageUrl;
//             image.alt = block.alt || "Зображення";
//             postContent.appendChild(image);
//           }
//         });
//       }

//       singleElement.append(postContent);
//       document.getElementById("post-single").append(singleElement);
      
//     } catch (error) {
//       console.error("Помилка отримання поста:", error);
//       document.body.innerHTML = "<h1>Помилка завантаження поста</h1>";
//     }
// });

// import { getSingle, getAllPosts } from './sanityAPI.js';

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
    const allPosts = await getAllPosts();

    if (!single || Object.keys(single).length === 0) {
      document.body.innerHTML = "<h1>Пост не знайдено</h1>";
      return;
    }

    // ===== Вивід головного поста =====
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
        } else if (block._type === "blokPostImage" && block.imageUrl) {
          const image = document.createElement("img");
          image.src = block.imageUrl;
          image.alt = block.alt || "Зображення";
          postContent.appendChild(image);
        }
      });
    }

    singleElement.append(postContent);
    document.getElementById("post-single").append(singleElement);

    // ===== Попередні та наступні пости =====
    const currentIndex = allPosts.findIndex(post => post.slug === slug);
    const prevPosts = allPosts.slice(Math.max(0, currentIndex - 2), currentIndex);
    const nextPosts = allPosts.slice(currentIndex + 1, currentIndex + 3);

    const list = document.querySelector(".news-list ul");
    list.innerHTML = "";

    const renderPosts = (posts, className) => {
      posts.forEach(post => {
        const li = document.createElement("li");
        li.classList.add(className);
        const date = new Date(post.publishDate).toLocaleDateString();
        li.innerHTML = `<a href="post.html?slug=${post.slug}">${post.title}</a> <span class="post-date">(${date})</span>`;
        list.appendChild(li);
      });
    };

    renderPosts(prevPosts, "prev-post");
    renderPosts(nextPosts, "next-post");

  } catch (error) {
    console.error("Помилка отримання поста:", error);
    document.body.innerHTML = "<h1>Помилка завантаження поста</h1>";
  }
});
  
  

