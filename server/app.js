const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // Importation de la bibliothèque Axios pour effectuer des requêtes HTTP
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });


const API_URL = "https://api.sampleapis.com/wines/reds";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Configuration de Morgan
app.use(morgan('combined', { stream: accessLogStream }));

const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));

app.get('/', (req, res) => {
    // Lorsque la racine du serveur est accédée, renvoyer le fichier index.html
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.post('/search', async (req, res) => {
    try {
        // Convertir l'ID du vin en un nombre entier
        const wineId = parseInt(req.body.wineName);
        if (isNaN(wineId)) {
            throw new Error("L'ID du vin doit être un nombre entier.");
        }

        // Rechercher le vin dans l'API en utilisant son ID
        const wine = await searchWineById(wineId);
        if (wine) {
            // Si le vin est trouvé, renvoyer les détails du vin au client
            res.status(200).json(wine);
        } else {
            // Si aucun vin n'est trouvé avec l'ID spécifié, renvoyer un message d'erreur au client
            res.status(404).json({ message: "Aucun vin trouvé avec cet ID." });
        }
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur au client
        res.status(500).json({ error: error.message });
    }
});

// Fonction pour rechercher un vin dans l'API en fonction de son ID
async function searchWineById(wineId) {
    try {
        // Effectuer une requête GET vers l'API des vins pour récupérer tous les vins
        const response = await axios.get(API_URL);
        if (response.status === 200) {
            // Si la requête est réussie, récupérer les données de l'API
            const wines = response.data;
            
            // Rechercher le vin avec l'ID spécifié dans les données récupérées
            const wineSEARCHED =  wines.find(wine => wine.id === wineId)
            console.log(wineSEARCHED)
            return wineSEARCHED;
            
        } else {
            // Si la requête échoue, renvoyer une erreur
            throw new Error("Erreur lors de la récupération des données de l'API.");
        }
    } catch (error) {
        // En cas d'erreur lors de la recherche du vin, renvoyer une erreur
        throw new Error("Erreur lors de la recherche du vin dans l'API : " + error.message);
    }
}

app.listen(port, () => {
    // Démarrer le serveur sur le port spécifié
    console.log(`Serveur démarré sur le port ${port}`);
});
