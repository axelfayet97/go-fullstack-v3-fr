// Import d'express
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const stuffRoutes = require('./routes/stuff');

// Connexion à MongoDB
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

app.use('/api/stuff', stuffRoutes);

// Export de l'application express
module.exports = app;