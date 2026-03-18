const express = require('express');
const router = express.Router();
const Dentist = require('../models/Dentist');

// GET /api/dentists
// List all dentists
router.get('/', async (req, res) => {
  try {
    const dentists = await Dentist.find();
    res.json(dentists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// POST /api/dentists
// Create a new dentist
router.post('/', async (req, res) => {
  try {
    const { name, photo, qualification, experience, clinicName, address, location } = req.body;

    if (!name || !photo || !qualification || !experience || !clinicName || !address || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const dentist = new Dentist({ name, photo, qualification, experience, clinicName, address, location });
    const savedDentist = await dentist.save();

    res.status(201).json(savedDentist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE /api/dentists/:id
// Remove a dentist
router.delete('/:id', async (req, res) => {
  try {
    const dentist = await Dentist.findById(req.params.id);
    if (!dentist) {
      return res.status(404).json({ message: 'Dentist not found' });
    }

    await dentist.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;