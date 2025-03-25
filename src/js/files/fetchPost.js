// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
// async function fetchPost() {
//     const slug = window.location.pathname.split("/").pop(); // Отримуємо slug з URL
  
//     if (!slug) {
//       document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//       return;
//     }
  
//     const response = await fetch(`https://qniqk200.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "post" && slug.current == "${slug}"][0]`);
//     const data = await response.json();
//     const post = data.result;
  
//     if (!post) {
//       document.body.innerHTML = "<h1>Пост не знайдено</h1>";
//       return;
//     }
  
//     document.getElementById("post-title").textContent = post.title;
//     document.getElementById("post-image").src = post.poster;
//     document.getElementById("post-image").alt = post.title;
//     document.getElementById("post-date").textContent = new Date(post.publishDate).toLocaleDateString();
//     document.getElementById("post-content").innerHTML = post.content
//       .map(block => {
//         if (block._type === "block") {
//           return `<p>${block.children.map(child => child.text).join(" ")}</p>`;
//         }
//         if (block._type === "blokPostImage") {
//           return `<img src="${block.imageUrl}" alt="${block.alt}" style="max-width:100%;">`;
//         }
//         return "";
//       })
//       .join("");
//   }
  
//   fetchPost();

document.addEventListener("DOMContentLoaded", async () => {
    // Перевірка наявності елемента #post
    const postsContainer = document.getElementById("post");
    if (!postsContainer) {
        console.error("Елемент #post не знайдено в DOM!");
        document.body.innerHTML = "<h1>Пост не знайдено</h1>";
        return;
    }

    // Отримуємо параметр slug із URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug");

    // if (!slug) {
    //     document.body.innerHTML = "<h1>Пост не знайдено</h1>";
    //     return;
    // }

    try {
        // Отримуємо пост за slug
        const post = await getPostBySlug(slug); // Отримуємо конкретний пост

        if (!post) {
            document.body.innerHTML = "<h1>Пост не знайдено</h1>";
            return;
        }

        // Створення елемента для поста
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const postTitle = document.createElement("h2");
        postTitle.classList.add("post-title");
        postTitle.textContent = post.title;

        const postDate = document.createElement("div");
        postDate.classList.add("post-date");
        postDate.textContent = `Опубліковано: ${post.publishDate}`;

        const postContent = document.createElement("div");
        postContent.classList.add("post-content");

        // Перебір вмісту поста
        post.content.forEach(block => {
            if (block._type === "block" && block.children) {
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

        // Додаємо елементи на сторінку
        postElement.append(postTitle, postContent, postDate);
        postsContainer.appendChild(postElement);

    } catch (error) {
        console.error("Помилка завантаження поста:", error);
        document.body.innerHTML = "<h1>Не вдалося завантажити пост</h1>";
    }
});

// Функція для отримання поста за slug
async function getPostBySlug(slug) {
    const query = `*[_type == "post" && slug.current == "${slug}"][0]{
        title,
        publishDate,
        "poster": poster.asset->url,
        content[]{
            ...,
            _type == "block" => {
                _key,
                _type,
                "children": children[] {
                    _key,
                    "text": text
                }
            },
            _type == "blokPostImage" => {
                _key,
                "imageUrl": asset->url,
                "alt": image.alt
            }
        }
    }`;

    const response = await fetch(`https://qniqk200.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.result;
}



  