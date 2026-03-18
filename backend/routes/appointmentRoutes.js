const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET /api/appointments
// List all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('dentist');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/appointments/:id
// Get a single appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('dentist');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/appointments
// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const { patientName, age, gender, appointmentDate, dentist } = req.body;

    if (!patientName || !age || !gender || !appointmentDate || !dentist) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Appointment.findOne({
      dentist,
      appointmentDate,
    });

    if (existing) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    const newAppointment = new Appointment({
      patientName,
      age,
      gender,
      appointmentDate,
      dentist,
    });

    const saved = await newAppointment.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/appointments/:id
// Update an appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Prevent double-booking if date or dentist changes
    if ((req.body.appointmentDate && req.body.appointmentDate !== appointment.appointmentDate.toISOString()) ||
        (req.body.dentist && req.body.dentist !== appointment.dentist.toString())) {
      const conflict = await Appointment.findOne({
        dentist: req.body.dentist || appointment.dentist,
        appointmentDate: req.body.appointmentDate || appointment.appointmentDate,
        _id: { $ne: appointment._id },
      });
      if (conflict) {
        return res.status(400).json({ message: 'Slot already booked' });
      }
    }

    Object.assign(appointment, req.body);
    const updated = await appointment.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/appointments/:id
// Cancel an appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;