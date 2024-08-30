// routes/readings.js

const express = require('express');
const multer = require('multer');
const { addReading, getReadings } = require('../controllers/readingsController');

const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), addReading);
router.get('/', getReadings);

module.exports = router;
