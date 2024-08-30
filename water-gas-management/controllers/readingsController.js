// controllers/readingsController.js

const Reading = require('../models/Reading');
const Tesseract = require('tesseract.js');

// Função para adicionar leitura a partir de uma imagem
exports.addReading = async (req, res) => {
    const { userId, type } = req.body;
    const imagePath = req.file.path;

    try {
        // Processa a imagem usando Tesseract.js para extrair o texto
        const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

        // Extrai o valor numérico do texto reconhecido
        const value = extractNumberFromText(text);

        if (value === null) {
            return res.status(400).json({ msg: 'Não foi possível extrair um valor válido da imagem.' });
        }

        const newReading = new Reading({
            userId,
            type,
            value,
            imagePath,
        });

        await newReading.save();
        res.json(newReading);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
};

// Função auxiliar para extrair o número do texto reconhecido
const extractNumberFromText = (text) => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
};

// Função para obter todas as leituras
exports.getReadings = async (req, res) => {
    try {
        const readings = await Reading.find();
        res.json(readings);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};
