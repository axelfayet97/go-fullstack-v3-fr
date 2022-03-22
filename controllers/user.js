// Controleurs d'authentification
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Inscription
exports.signup = (req, res, next) => {
    // Appel de la hach de bcrypt qui prend en paramètres le password renseigné, et le taux de cryptage demandé
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création d'un nouveu utilisateur dont l'email sera celui renseigné et le mdp sera le hash
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Saugegarde dans la BDD
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res, next) => {
    // récupération de l'email renseigné
    User.findOne({ email: req.body.email })
        .then(user => {
            // Si nom utilisateur inexistant
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouve !' });
            }
            // Sinon, on compare le pwd saisi avec le hash contenu dans la BDD
            bcrypt.compare(req.body.json, user.password)
                .then(valid => {
                    // Si invalide
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    // Sinon, création d'un objet JSON contenan l'id et un token
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                // Si erreur serveur
                .catch(error => res.status(500).json({ error }));
        })
        // Si erreur serveur
        .catch(error => res.status(500).json({ error }));
};