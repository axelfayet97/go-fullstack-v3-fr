// Import d'express
const express = require('express');

// Création d'une application express vide
const app = express();

// Intercepte toutes requêtes qui ont un content-type JSON, et met à dispo le corps de la requete sur l'objet requet dans req.body
// Accès au corps de la requête == body parser
app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
    // Autorise les accès à l'API depuis * n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajout des headers mentionnés aux requêtes evoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Permet d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // Exécution de la prochaine étape
    next();
});

//intercepte requetes post
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé.'
    });
});

// Middleware contenant un tableau de nos objets // Pour route GET
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    // Réponse du serveur avec un code 200, renvoie aussi le tableau des objets
    res.status(200).json(stuff);
});

// Export de l'application express
module.exports = app;