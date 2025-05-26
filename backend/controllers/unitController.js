const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUnits = async (req, res) => {
  const units = await prisma.storageUnit.findMany();
  res.json(units);
};

exports.createUnit = async (req, res) => {
  const { name, size, location, pricePerDay } = req.body;

  try {
    const existing = await prisma.storageUnit.findUnique({ where: { name } });
    if (existing) {
      return res.status(400).json({ error: 'A unit with this name already exists.' });
    }

    const unit = await prisma.storageUnit.create({
      data: {
        name,
        size,
        location,
        pricePerDay: parseFloat(pricePerDay),
        isAvailable: true,
      },
    });

    res.json(unit);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create unit.' });
  }
};

exports.updateUnit = async (req, res) => {
  const { id } = req.params;
  const { name, size, location, pricePerDay } = req.body;

  try {
    const unit = await prisma.storageUnit.update({
      where: { id: parseInt(id) },
      data: { name, size, location, pricePerDay: parseFloat(pricePerDay) },
    });

    res.json(unit);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update unit.' });
  }
};

exports.deleteUnit = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.storageUnit.delete({ where: { id: parseInt(id) } });
    res.json({ message: '✅ Unit deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: '❌ Failed to delete unit. Make sure it has no bookings linked to it.' });
  }
};
