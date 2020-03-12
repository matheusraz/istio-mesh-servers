require('dotenv').config()
const express = require('express');
const server = express();
const port = 9090;
const http = require('http');

function httpRequest(https_options, body = '') {
  return new Promise(function (resolve, reject) {
    const request = http.request(https_options, function (response) {
      let data = '';

      response.on('data', function (cbresponse) {
        data += cbresponse;
      });

      response.on('end', () => {
        try {
          const response = data;
          resolve(response);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    });

    if (body instanceof Object) {
      body = JSON.stringify(body);
    }
    request.write(body);
    request.end();
  });
}


server.get('/', async (req, res) => {
    const opt1 = {
        "host": process.env.FIRST_SERVER.split(':')[0],
        "port": process.env.FIRST_SERVER.split(':')[1],
        "path": "/",
        "method": "GET"
    };
    const opt2 = {
        "host": process.env.SECOND_SERVER.split(':')[0],
        "port": process.env.SECOND_SERVER.split(':')[1],
        "path": "/",
        "method": "GET"
    };
    const firstPhrase = await httpRequest(opt1);
    const secPhrase = await httpRequest(opt2);
    res.json(`MANGUE ${firstPhrase} ${secPhrase}`);
})

server.listen(port, (err) => {
    console.log(`Servidor rodando na porta ${port}`);
})
