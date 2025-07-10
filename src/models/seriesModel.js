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
        min: 1,
        max: 5
    },
    notaImdb: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comentario: {
        type: String
    },
    capa: {
        type: String
    },
    tipo: {
        type: String,
        required: true,
        enum: ['serie', 'filme']
    },
    idImdb: {
        type: String,
        required: true,
        index: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Series', SerieSchema);