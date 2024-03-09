const API_URL = "https://api.sampleapis.com/wines/reds";

async function readFile() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            console.log("Succès !");
            const wineData = await response.json();
            return wineData;
        } else {
            throw new Error("Erreur lors de la récupération des données");
        }
    } catch (error) {
        console.error("Erreur dans la lecture de l'API :", error);
        throw error;
    }
}

async function readWine() {
    try {
        const wineFile = await readFile();
        console.log("Clés des données :", Object.keys(wineFile));

        // Suppose que chaque vin a une propriété "id"
        const wineId = 97; // ID du vin que vous souhaitez récupérer
        const wine = wineFile.find(wine => wine.id === wineId);

        if (wine) {
            console.log("Vin trouvé :", wine);
        } else {
            console.log("Aucun vin trouvé avec cet ID :", wineId);
        }
    } catch (error) {
        console.error("Erreur dans la lecture de l'API :", error);
    }
}

readWine();
