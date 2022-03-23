// Création du contrôleur de manipulation d'objets
const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

// Route post pour envoi d'objet
router.post('/', auth, stuffCtrl.createThing);
// Modification d'un objet
router.put('/:id', auth, stuffCtrl.modifyThing);
// Suppression d'un objet
router.delete('/:id', auth, stuffCtrl.deleteThing);
// Récupération d'un Thing spécifique
router.get('/:id', auth, stuffCtrl.getOneThing);
// Récupération du tableau things a l'aide de la méthode find()
router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;