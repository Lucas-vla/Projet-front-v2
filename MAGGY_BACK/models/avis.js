const mongoose = require('mongoose');

const avisSchema = mongoose.Schema({
    commentaire: String,
    note: Number,
});

const Avis = mongoose.model('avis', avisSchema);

module.exports = Avis;