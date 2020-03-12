require('dotenv').config();
const express = require('express');
const server = express();
const port = 9092;

server.get('/', (req, res) => {
    res.send(process.env.TEXT);
});

server.listen(port, (err) => {
    console.log(`Servidor rodando na porta ${port}`);
})
