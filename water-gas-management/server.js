
const express = require('express');
const connectDB = require('./Config/database');
const bodyParser = require('body-parser');

const app = express();


connectDB();


app.use(bodyParser.json());


app.use('/uploads', express.static('uploads'));


app.use('/api/readings', require('./routes/readings'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));


