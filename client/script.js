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
        console.log(data);
        // Met à jour les éléments HTML avec les détails du vin
        document.getElementById("card-wine-image").src = data.image; // Remplacez 'data.image' par la propriété correcte de l'image du vin
        document.getElementById("card-wine-name").innerText = data.wine; // Remplacez 'data.name' par la propriété correcte du nom du vin
        document.getElementById("card-wine-place").innerText = data.winery; // Remplacez 'data.place' par la propriété correcte du lieu de fabrication du vin
        document.getElementById("card-wine-country").innerText = data.location; // Remplacez 'data.country' par la propriété correcte de l'origine du vin
      })
      .catch((error) =>
        console.error("Erreur lors de la recherche de vin :", error)
      );
  });
