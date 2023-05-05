const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator'); // express validator
const Note = require("../models/Note")

//Route 1: fetching notes of the existing user using fetchuser and : get "api/notes/fetchallnotes". Login Required:
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); //fetching notes from users id. 
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error:");
    }
})
//Routes 2: Adding a new Notes in existing user using fetchuser and :  get "api/notes/addnote". Login Required:

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }), //validating through express validator
    body('description', 'Enter a description more than 5 letters').isLength({ min: 5, }), //validating through express validator
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If there are an error, return bad request and error:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // getting elements be there on notes. 
        const note = new Note({
            title, description, tag, user: req.user.id,
        })
        const savedNote = await note.save();

        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error:");
    }
})

//Route 3: Updating notes of the existing user using fetchuser and : get "api/notes/fetchallnotes". Login Required:
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        //creating new notes object.
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //finding the notes to updating.
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Sorry! Not found") } //If updating notes not match to user existing notes.  

        if (note.user.toString() !== req.user.id) { // checking the user who updating is the one who create the note. 
            return res.status(401).send("Sorry! Not allowed")
        }
        // Updating note if it exist. 
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error:");
    }
})

//Route 4: Deleting notes of the existing user using fetchuser and : delete "api/notes/deletenote". Login Required:
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //finding the notes to Delete.
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Sorry! Not found") } //If updating notes not match to user existing notes.  

        if (note.user.toString() !== req.user.id) { // checking the user who updating is the one who create the note. 
            return res.status(401).send("Sorry! Not allowed")
        }
        // Deleting note if it exist. 
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been Deleted", note: note })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error:");
    }
})


module.exports = router