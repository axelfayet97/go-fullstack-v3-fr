// Création du contrôleur de manipulation d'objets
const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

// Route post pour envoi d'objet
router.post('/', stuffCtrl.createThing);
// Modification d'un objet
router.put('/:id', stuffCtrl.modifyThing);
// Suppression d'un objet
router.delete('/:id', stuffCtrl.deleteThing);
// Récupération d'un Thing spécifique
router.get('/:id', stuffCtrl.getOneThing);
// Récupération du tableau things a l'aide de la méthode find()
router.get('/', stuffCtrl.getAllThings);

module.exports = router;