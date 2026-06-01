import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'bookings.json');

app.use(cors());
app.use(express.json());

// Ensure bookings file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readBookings() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeBookings(bookings) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
}

// GET /api/bookings - Get all bookings
app.get('/api/bookings', (req, res) => {
  const bookings = readBookings();
  res.json({ success: true, bookings });
});

// POST /api/bookings - Create a new booking
app.post('/api/bookings', (req, res) => {
  const { name, phone, goal, time, message } = req.body;

  if (!name || !phone || !goal || !time) {
    return res.status(400).json({
      success: false,
      error: 'Name, phone, goal, and time are required',
    });
  }

  const bookings = readBookings();
  const newBooking = {
    id: Date.now().toString(),
    name: name.trim(),
    phone: phone.trim(),
    goal: goal.trim(),
    time: time.trim(),
    message: message ? message.trim() : '',
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  writeBookings(bookings);

  res.status(201).json({
    success: true,
    booking: newBooking,
    message: 'Booking created successfully',
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
