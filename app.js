// Import d'express
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');

const Thing = require('./models/Thing')

mongoose.connect('mongodb+srv://axel_fayet:password1234@cluster0.ycqur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connextion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création d'une application express vide
const app = express();

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
app.use(bodyParser.json());

// Route post pour envoi d'objet
app.post('api/stuff', (req, res, next) => {
    // Pas besoin de l'id
    delete req.body._id;
    // déclaration d'un nouvel objet
    const thing = new Thing({
        // Copie des champs présents dans le coprs de la requête avec l'opérateur Spread
        ...req.body
        // == req.body.title, req.body.description, .....
    });
    // Enregistrement dans la base de données
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
    // next ?
    next();
});

// Middleware contenant un tableau de nos objets
app.use('/api/stuff', (req, res, next) => {
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