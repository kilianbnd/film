const filmsContainer = document.getElementById("films-container");

/* Fonction pour récupérer les films */
async function fetchFilms() {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films");
    const filmsData = await response.json();
    
    /* Récupérer les images de tous les films */
    const filmImages = await Promise.all(filmsData.map(async film => {
      if (film.id) {
        const imageResponse = await fetch(`https://ghibliapi.vercel.app/films/${film.id}`);
        const imageData = await imageResponse.json();
        return imageData && imageData.image ? imageData.image : null;
      }
      return null;
    }));

    /* Affichage des films dans le document HTML */
    filmsData.forEach((film, index) => {
      const filmDiv = document.createElement("div");
      filmDiv.classList.add("film");

      /* Image du film */
      if (filmImages[index]) {
        const image = document.createElement("img");
        image.classList.add("film-image");
        image.src = filmImages[index];
        image.alt = film.title;
        filmDiv.appendChild(image);
      }

      /* Titre traduit */
      const translatedTitle = document.createElement("div");
      translatedTitle.classList.add("film-translatedTitle");
      translatedTitle.textContent = `${film.title}`;

      /* Réalisateur du film */
      const director = document.createElement("div");
      director.classList.add("director");
      director.textContent = `${film.director}`;
      
      /* Titre original */
      const originalTitle = document.createElement("div");
      originalTitle.classList.add("film-title");
      originalTitle.textContent = `${film.original_title}`;

      /* Bouton view */
      const viewButton = document.createElement("button");
      viewButton.classList.add("view-button");
      viewButton.textContent = "View";

      /* Conteneur pour le titre original et le bouton sur laa meme ligne*/
      const detailsButtonContainer = document.createElement("div");
      detailsButtonContainer.classList.add("film-details");
      detailsButtonContainer.appendChild(viewButton);
      detailsButtonContainer.appendChild(originalTitle);

      /* Afficher les éléments */
      filmDiv.appendChild(translatedTitle);
      filmDiv.appendChild(director);
      filmDiv.appendChild(detailsButtonContainer);

      filmsContainer.appendChild(filmDiv);
    });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}


/* Pour le burger menu */
const links = document.querySelectorAll("nav li");

/* Activer le menu burger*/
icons.addEventListener("click", () => {
  nav.classList.toggle("active");
});

/* Désactiver le menu burger*/
links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

/* Appel de la fonction pour récupérer et afficher les films lors du chargement de la page */
window.onload = fetchFilms;