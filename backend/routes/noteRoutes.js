const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

//Create Note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({ title, content });
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get All Notes
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

//Update Note
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  const updated = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
  res.json(updated);
});

//Delete Note
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
