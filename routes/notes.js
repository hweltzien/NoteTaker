const notes = require('express').Router();
const { writeToFile } = require('../helpers/fsUtils');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

  // DELETE Route for a current UX/UI note
notes.delete('/:id', (req, res) => {
    console.log(req.body);
    let noteId = req.params.id
    let allNotes = []
    readFromFile('./db/db.json').then((data) => allNotes = JSON.parse(data));
  
   allNotes = allNotes.filter(note => note.id != noteId)
  
      fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
      res.json(`Note deleted successfully`);
    
  });


module.exports = notes;

