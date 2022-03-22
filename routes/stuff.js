const express = require('express');
const router = express.Router();
const Thing = require('../models/thing');

// Route post pour envoi d'objet
router.post('/', (req, res, next) => {
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

// Modification d'un objet
router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "OK" }))
        .catch(error => res.status(400).json({ error }))
});

// Suppression d'un objet
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

// Récupération d'un Thing spécifique
router.get('/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

// Récupération du tableau things a l'aide de la méthode find()
router.get('/', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;