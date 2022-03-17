// Import d'express
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Thing = require('./models/Thing');

mongoose.connect('mongodb+srv://axel_fayet:password1234@cluster0.ycqur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connextion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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
app.use(bodyParser.json());

// Route post pour envoi d'objet
app.post('/api/stuff', (req, res, next) => {
    // Pas besoin de l'id
    delete req.body._id;
    // Nouvel objet Thing
    const thing = new Thing({
        // Opérateur spread donnant tous les champs du body
        ...req.body
    });
    // Methode save dans la bdd
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

// Récupération du tableau things a l'aide de la méthode find()
app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

// Export de l'application express
module.exports = app;