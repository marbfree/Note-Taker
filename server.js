// Imports libraries and files
const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid')
const {readFromFile, readAndAppend} = require('./helpers/fsUtils');

// Initializes express module
const app = express();

// uses port 3001
const PORT = process.env.PORT || 3001

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Get method to respond with notes or index file
app.get('/', (req, res) => res.send('Navigate to /notes or /*'));

// Get method to send notes file
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html')));      

// Reads file from db folder
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for note`);
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// adds new note to existing list of notes
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text, 
            id: uuid(),
        };
    readAndAppend(newNote, './db/db.json');
    res.json('Note added successfully');
    } else{
        res.error('Error in adding note');
    }
}); 

app.get('/db.json/:id'), (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    };

// Get method to send index file
app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html')));     

// listens to the port for api hit
app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`))