// 1. Imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const Dentist = require('./models/Dentist');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Seed a default dentist if none exist, so the frontend has data immediately.
    const count = await Dentist.countDocuments();
    if (count === 0) {
      await Dentist.create({
        name: 'Dr. Jane Smith',
        photo: 'https://i.pravatar.cc/400?img=66',
        qualification: 'DDS',
        experience: 8,
        clinicName: 'Bright Smile Dental',
        address: '123 Main Street',
        location: 'Seattle, WA',
      });
      console.log('Seeded default dentist data');
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const dentistRoutes = require('./routes/dentistRoutes');
app.use('/api/dentists', dentistRoutes);
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
