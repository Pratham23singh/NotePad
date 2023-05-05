const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator'); // express validator
const Note = require("../models/Note")

//Route 1: fetching notes of the user using: get "api/auth/fetchallnotes". Login Required:
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }); //fetching notes from users id 
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error:");
    }
})
//Routes 2: Add a new Notes in existing user using:  get "api/auth/addnote". Login Required:

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
        // getting elements be there on notes 
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


module.exports = router