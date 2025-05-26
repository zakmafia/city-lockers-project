const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBooking = async (req, res) => {
  const { userName, unitId, startDate, endDate } = req.body;

  try {
    const conflict = await prisma.booking.findFirst({
      where: {
        unitId,
        AND: [
          { startDate: { lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate) } },
        ],
      },
    });

    if (conflict) {
      return res.status(400).json({ error: 'This unit is already booked for the selected date range.' });
    }

    const booking = await prisma.booking.create({
      data: {
        userName,
        unitId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Booking failed.' });
  }
};

exports.getBookings = async (req, res) => {
  const { userName } = req.query;

  const where = userName
    ? { userName: { contains: userName, mode: 'insensitive' } }
    : {};

  const bookings = await prisma.booking.findMany({
    where,
    include: { unit: true },
    orderBy: { startDate: 'asc' }
  });

  res.json(bookings);
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.booking.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete booking.' });
  }
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;
  try {
    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update booking.' });
  }
};
