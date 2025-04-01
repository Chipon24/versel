import { getPerson } from '../sanityAPI.js';

document.addEventListener("DOMContentLoaded", async () => {
    const personContainer = document.getElementById("person");
  
    if (!personContainer) {
      console.error("Контейнер для Person не знайдений");
      return;
    }
  
    try {
      const personData = await getPerson();
      console.log(personData); // Перевіряємо, що саме отримуємо
  
      if (!Array.isArray(personData) || personData.length === 0) {
        personContainer.innerHTML = "<p>Немає даних про Person</p>";
        return;
      }
  
      personData.forEach(person => {
        if (person?.personName && person?.personPosition && person?.personDescription && person?.personImage) {
          const personElement = document.createElement("div");
          personElement.classList.add("person-content");
  
          personElement.innerHTML = `
          
            <h4>${person.personName}</h4>
            <img src="${person.personImage}" alt="${person.personName}">

           <div class="person-details">
                <h5>${person.personPosition}</h5>
                <p>${person.personDescription}</p>
            </div>
          `;
  
          personContainer.appendChild(personElement);
        }
      });
    } catch (error) {
      console.error("Помилка завантаження даних Person:", error);
      personContainer.innerHTML = "<p>Не вдалося завантажити дані Person</p>";
    }
  });
  