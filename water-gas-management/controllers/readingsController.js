

const Reading = require('../models/Reading');
const Tesseract = require('tesseract.js');


exports.addReading = async (req, res) => {
    const { userId, type } = req.body;
    const imagePath = req.file.path;

    try {
        
        const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

       
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


const extractNumberFromText = (text) => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
};


exports.getReadings = async (req, res) => {
    try {
        const readings = await Reading.find();
        res.json(readings);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};
