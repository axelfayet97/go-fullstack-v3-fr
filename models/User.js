const mongoose = require('mongoose');
// Plugin évitant que mongoose ne génère des erreurs incompréhensibles
const uniqueValidator = require('mongoose-unique-validator');

// Schéma d'utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true }
});

// Empêche la génération d'erreurs illisibles de la part de mongoose lors de la tentative de création d'un utilisateur dont le mail est similaire
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);