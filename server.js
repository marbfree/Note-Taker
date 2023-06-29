const express = require('express');
const path = require('path');
// const db = require('./db/db.json')

const app = express();

const PORT = 3001

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /notes or /*'));

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html')));    

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data => res.json(JSON.parse(data))))
});

    
// app.get('/api', (req, res) => res.json('db'));

app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`))