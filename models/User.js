const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true }
});

// Empêche la génération d'erreurs illisibles de la part de mongoose lors de la tentative de création d'un utilisateur dont le mail est similaire
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);