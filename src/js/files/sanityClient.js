// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'qniqk200', // Встав свій Project ID
  dataset: 'production', // Або інший датасет
  useCdn: true, // Використовує кеш для швидкості
  apiVersion: '2024-03-21', // Вкажи актуальну дату
});
