

// Підключення базового набору функціоналу
import lightGallery from 'lightgallery';

// Плагіни
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, lgShare, lgThumbnail, lgVideo, lgMediumZoom
 import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

// Базові стилі
// import '@scss/libs/gallery/lightgallery.scss';
// Стилі доповнень
 import '@scss/libs/gallery/lg-thumbnail.scss';
// import '@scss/libs/gallery/lg-video.scss';
// import '@scss/libs/gallery/lg-autoplay.scss';
 import '@scss/libs/gallery/lg-zoom.scss';
// import '@scss/libs/gallery/lg-pager.scss';
// import '@scss/libs/gallery/lg-fullscreen.scss';
// import '@scss/libs/gallery/lg-share.scss';
// import '@scss/libs/gallery/lg-comments.scss';s
// import '@scss/libs/gallery/lg-rotate.scss';
 import '@scss/libs/gallery/lg-medium-zoom.scss';
// import '@scss/libs/gallery/lg-relative-caption.scss';

// Усі стилі
 import '@scss/libs/gallery/lightgallery-bundle.scss';

import { getGallery } from '../sanityAPI.js';

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const galleriesData = await getGallery();
    const container = document.querySelector('.galleries-container');

    if (!container) {
      console.error('Головний контейнер .galleries-container не знайдено');
      return;
    }

    galleriesData.forEach((galleryData, index) => {
      const galleryWrapper = document.createElement('div');
      galleryWrapper.classList.add('galleries');

      const galleryTitle = document.createElement('h2');
      galleryTitle.textContent = galleryData.galleryTitle;
      galleryTitle.classList.add('galleries__title');

      const galleryContainer = document.createElement('div');
      galleryContainer.classList.add('galleries__block');
      galleryContainer.setAttribute('data-simplebar', '');

      const galleryDiv = document.createElement('div');
      galleryDiv.id = `animated-thumbnails-gallery-${index}`;
      galleryDiv.classList.add('animated-thumbnails-gallery');

      galleryData.gallery.forEach(image => {
        // Генеруємо URL для прев’ю (наприклад, 400px по ширині)
        const thumbUrl = `${image.url}?w=400&fit=max&auto=format`;
      
        // Повнорозмірне зображення (наприклад, 1600px)
        const fullUrl = `${image.url}?w=1600&fit=max&auto=format`;
      
        const link = document.createElement('a');
        link.href = fullUrl;
        link.classList.add('gallery-item');
      
        const img = document.createElement('img');
        img.src = thumbUrl;
        img.alt = image.alt || 'Gallery Image';
        //  img.style.height = '180px';
        // img.style.objectFit = 'cover';
        // img.style.marginBottom = '5px';
      
        link.appendChild(img);
        galleryDiv.appendChild(link);
      });

      galleryContainer.appendChild(galleryDiv);
      galleryWrapper.appendChild(galleryTitle);
      galleryWrapper.appendChild(galleryContainer);
      container.appendChild(galleryWrapper);

      lightGallery(galleryDiv, {
        licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
        plugins: [lgZoom, lgThumbnail],
        autoplayFirstVideo: false,
        pager: false,
        galleryId: `gallery-${index}`,
        mobileSettings: {
          controls: true,
          showCloseIcon: true,
          download: true,
          rotate: false,
        },
      });
    });
  } catch (err) {
    console.error('Помилка при завантаженні галереї:', err);
  }
});
