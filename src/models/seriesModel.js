const mongoose = require('mongoose');

const SerieSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    notaUsuario: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comentario: {
        type: String
    },
    capa: {
        type: String
    },
    idImdb: {
        type: String,
        index: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Series', SerieSchema);