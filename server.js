// const API_URL = "https://api.sampleapis.com/wines/reds";

// // FONCTION PERMETTANT DE LIRE L'API
// async function readFile() {
//     try {
//         const response = await fetch(API_URL);
//         if (response.ok) {
//             console.log("Succès !");
//             const wineData = await response.json();
//             return wineData;
//         } else {
//             throw new Error("Erreur lors de la récupération des données");
//         }
//     } catch (error) {
//         console.error("Erreur dans la lecture de l'API :", error);
//         throw error;
//     }
// }

// async function readWine() {
//     try {
//         const wineFile = await readFile();
//         console.log("Clés des données :", Object.keys(wineFile));

//         // Suppose que chaque vin a une propriété "id"
//         const wineId = 56; // ID du vin que vous souhaitez récupérer
//         const wine = wineFile.find(wine => wine.id === wineId);

//         if (wine) {
//             console.log("Vin trouvé :", wine);
//             const wineIMG = document.getElementById('card-wine-image');
//             const wineNAME = document.getElementById('card-wine-name');
//             const winePLACE = document.getElementById('card-wine-place');
//             const wineCOUNTRY = document.getElementById('card-wine-country');
//             wineIMG.src = wine.image
//             wineNAME.innerHTML = wine.wine
//             winePLACE.innerHTML = wine.winery
//             wineCOUNTRY.innerHTML = wine.location
//         } else {
//             console.log("Aucun vin trouvé avec cet ID :", wineId);
//         }
//     } catch (error) {
//         console.error("Erreur dans la lecture de l'API :", error);
//     }
// }


// readWine();
