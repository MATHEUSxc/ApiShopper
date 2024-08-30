// server.js

const express = require('express');
const connectDB = require('./Config/database');
const bodyParser = require('body-parser');

const app = express();

// Conecta ao banco de dados
connectDB();

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos
app.use('/uploads', express.static('uploads'));

// Define as rotas
app.use('/api/readings', require('./routes/readings'));

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));


