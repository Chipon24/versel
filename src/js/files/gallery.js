
/*
Документація по роботі у шаблоні: https://www.lightgalleryjs.com/docs/
Документація плагіна: https://www.lightgalleryjs.com/docs/
Сніппет(HTML):
*/

// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, FLS } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Підключення базового набору функціоналу
import lightGallery from 'lightgallery';

// Плагіни
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, lgShare, lgThumbnail, lgVideo, lgMediumZoom
 import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

// Базові стилі
// import '@scss/libs/gallery/lightgallery.scss';
// Стилі доповнень
// import '@scss/libs/gallery/lg-thumbnail.scss';
// import '@scss/libs/gallery/lg-video.scss';
// import '@scss/libs/gallery/lg-autoplay.scss';
// import '@scss/libs/gallery/lg-zoom.scss';
// import '@scss/libs/gallery/lg-pager.scss';
// import '@scss/libs/gallery/lg-fullscreen.scss';
// import '@scss/libs/gallery/lg-share.scss';
// import '@scss/libs/gallery/lg-comments.scss';s
// import '@scss/libs/gallery/lg-rotate.scss';
// import '@scss/libs/gallery/lg-medium-zoom.scss';
// import '@scss/libs/gallery/lg-relative-caption.scss';

// Усі стилі
 import '@scss/libs/gallery/lightgallery-bundle.scss';

// Запуск
// const galleries = document.querySelectorAll('[data-gallery]');
// if (galleries.length) {
// 	let galleyItems = [];
// 	galleries.forEach(gallery => {
// 		galleyItems.push({
// 			gallery,
// 			galleryClass: lightGallery(gallery, {
// 				 plugins: [lgThumbnail],
// 				licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
// 				speed: 500,
// 			})
// 		})
// 	});
// 	// Додаємо в об'єкт модулів
// 	flsModules.gallery = galleyItems;
// }

// document.addEventListener('DOMContentLoaded', function() {
// 	// Функція, яка ініціалізує LightGallery для кожної галереї
// 	function initGallery() {
// 	  const galleries = document.querySelectorAll('[data-gallery]');  // Вибір усіх елементів з data-gallery атрибутом
  
// 	  if (galleries.length) {
// 		galleries.forEach(gallery => {
// 		  // Якщо інстанс LightGallery вже існує, знищуємо його
// 		  if (gallery.lgInstance) {
// 			gallery.lgInstance.destroy(true);  // true — очищення DOM
// 		  }
  
// 		  // Ініціалізація нової галереї
// 		  const galleryInstance = lightGallery(gallery, {
// 			plugins: [lgThumbnail],  // Додаємо плагін для мініатюр
// 			licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',  // Ліцензійний ключ
// 			speed: 500,  // Швидкість анімації відкриття
// 		  });
  
// 		  // Зберігаємо інстанс галереї для повторного використання
// 		  gallery.lgInstance = galleryInstance;
// 		});
// 	  }
// 	}
  
// 	// Викликаємо функцію для ініціалізації галерей після завантаження сторінки
// 	initGallery();
  
// 	// Слухач події, щоб при кожному перезавантаженні сторінки ініціалізувати галереї заново
// 	window.addEventListener('load', function() {
// 	  initGallery();
// 	});
//   });
  
  

// Запуск
// Запуск галереї
// document.addEventListener('DOMContentLoaded', () => {
// 	const galleries = document.querySelectorAll('[data-gallery]');

// 	if (galleries.length) {
// 		let galleryItems = [];

// 		galleries.forEach(gallery => {
// 			// Якщо вже є інстанс LightGallery — знищити його
// 			if (gallery.lgInstance) {
// 				gallery.lgInstance.destroy(true); // з очищенням DOM
// 			}

// 			// Ініціалізація
// 			const instance = lightGallery(gallery, {
// 				plugins: [lgThumbnail], // додай інші плагіни, якщо потрібно
// 				licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
// 				speed: 500,
// 				download: true, // показати кнопку скачування
// 			});

// 			// Зберігаємо інстанс у DOM-елемент
// 			gallery.lgInstance = instance;

// 			// Додаємо до масиву
// 			galleryItems.push({
// 				gallery,
// 				galleryClass: instance
// 			});
// 		});

// 		// Зберігаємо у глобальний об'єкт (якщо він у тебе використовується)
// 		if (typeof flsModules !== 'undefined') {
// 			flsModules.gallery = galleryItems;
// 		} else {
// 			window.flsModules = { gallery: galleryItems };
// 		}
// 	}
// });


lightGallery(document.getElementById('aniimated-thumbnials'), {
	thumbnail:true,
	  animateThumb: false,
	  showThumbByDefault: false
  }); 




