const mongoose = require('mongoose');

// création d'un schéma de données dont thing aura besoin
// On indique le type de donnée et leur caractère (requis ou non)
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true }

});

// Export du modèle, la methode model transforme l'objet en un objet utilisable
module.exports = mongoose.model('Thing', thingSchema);