import { sanityClient } from './sanityClient.js';


export async function getPosts(start = 0, limit = 6) {
  const query = `*[_type == "post"] | order(publishDate desc) [${start}...${start + limit}]{
    title,
    meta_title,
    publishDate,
    description,
    "slug": slug.current,
    "poster": poster.asset->url,
    
  }`;

  try {
    const posts = await sanityClient.fetch(query);
    console.log("Отримані пости:", posts); // Виводимо в консоль
    return posts;
  } catch (error) {
    console.error("Помилка отримання постів:", error);
    return [];
  }
}

export async function getSingle(slug) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]{
    title,
    meta_title,
    publishDate,
    "slug": slug.current,
    
    "content": content[] {
      ...,
      _type == "block" => {
        _key,
        _type,
        style,
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

  try {
    const single = await sanityClient.fetch(query);
    console.log("Отриманий пост:", single);
    
    return single;
  } catch (error) {
    console.error("Помилка отримання поста:", error);
    return null;
  }
}



export async function getHero() {
  const query = `*[_type == "hero"]{
    heroTitle,
    heroDescription
  }`;

  return await sanityClient.fetch(query);
};

export async function getPerson() {
  const query = `*[_type == "person"]{
    personName,
    personPosition,
    personDescription,
    "personImage": personImage.asset->url,
  }`;

  return await sanityClient.fetch(query);
};

export async function getHeroSlider() {
  const query = `*[_type == "heroMedia"]{
    heroTitle,
    heroDescription,
    "heroGallery": heroGallery[].asset->url
  }`;

  return await sanityClient.fetch(query);
}