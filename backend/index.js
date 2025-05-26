const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
const unitRoutes = require('./routes/unitRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/units', unitRoutes);
app.use('/bookings', bookingRoutes);

app.listen(4000, () => console.log('✅ Backend running on port 4000'));
