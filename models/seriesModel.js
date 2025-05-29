const mongoose = require('mongoose');

const FilmeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    notaUsuario: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    comentario: {
        type: String,
        required: true
    },
    capa: {
        type: String, // URL da imagem
        default: ''
    },
    resumo: {
        type: String,
        default: ''
    },
    notaImdb: {
        type: String, // Pode vir como string da API externa (ex: "8.1")
        default: ''
    }
}, {
    timestamps: true // Cria automaticamente createdAt e updatedAt
});

module.exports = mongoose.model('Filme', FilmeSchema);