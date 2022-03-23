const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        // Récupération du token dans le header authorization
        const token = req.headers.authorization.split(' ')[1];
        // Décoder le token avec la clé secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = { userId };
        // Si userID différent du userID dans le body de la requete, alors erreur
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            // Requête réussie, passage au prochain middleware
            next();
        }
    } catch (error) {
        // Sinon catch erreur
        res.status(401).json({ error: error || 'Requête non authentifiée !' });
    };
};