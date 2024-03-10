document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    const searchInput = document.getElementById("search-input").value;

    fetch("http://localhost:3000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wineName: searchInput }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Renvoie les données JSON à partir de la réponse
        } else {
          throw new Error("La requête a échoué");
        }
      })
      .then((data) => {
        console.log("Succes ! voici les données envoyées :", data);
        createWineCard(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la recherche de vin :", error)
      );
  });

  // créer une fonction qui va créer une card de vin
  function createWineCard(wineData) {
    // Création de l'élément div avec la classe "card-wine"
    const wineCard = document.createElement("div");
    wineCard.classList.add("card-wine");

    // Création de l'élément img pour l'image du vin
    const wineImage = document.createElement("img");
    wineImage.src = wineData.image;
    wineImage.alt = "Image du vin";
    wineImage.classList.add("card-wine-image");
    wineCard.appendChild(wineImage);

    // Création des éléments p pour le nom, le lieu et l'origine du vin
    const nameParagraph = document.createElement("p");
    nameParagraph.innerHTML = `Nom du vin : <span class="card-wine-name">${wineData.wine}</span>`;
    wineCard.appendChild(nameParagraph);

    const placeParagraph = document.createElement("p");
    placeParagraph.innerHTML = `Lieu de fabrication : <span class="card-wine-place">${wineData.winery}</span>`;
    wineCard.appendChild(placeParagraph);

    const countryParagraph = document.createElement("p");
    countryParagraph.innerHTML = `Origine du vin : <span class="card-wine-country">${wineData.location}</span>`;
    wineCard.appendChild(countryParagraph);

    // Création de l'élément div avec la classe "rating" pour l'avis du vin
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");

    const ratingParagraph = document.createElement("p");
    ratingParagraph.textContent = "Avis :";
    ratingDiv.appendChild(ratingParagraph);

    const ratingImage = document.createElement("img");
    ratingImage.src = wineData.ratingImage;
    ratingImage.alt = "Image de l'avis";
    ratingImage.classList.add("rating-img");
    ratingDiv.appendChild(ratingImage);

    wineCard.appendChild(ratingDiv);

    // Ajout de la carte de vin à la div "display-cards"
    const displayCards = document.querySelector(".display-cards");
    displayCards.appendChild(wineCard);
}
