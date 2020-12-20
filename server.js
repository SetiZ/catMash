const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');

const catsRouter = require('./routes/catsRouter');

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cors({origin: 'http://localhost:3001'}));

app.use('/cats', catsRouter);

app.get('/list', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/cats.html'));
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/mash.html'));
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);
