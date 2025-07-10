const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('DATABASE_URI não está definida. Verifique suas variáveis de ambiente.');
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Conectado ao MongoDB');

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em ${PORT}`);
    });
}).catch((err) => {
    console.error('❌ Erro ao conectar no MongoDB:', err.message);
    process.exit(1);
});