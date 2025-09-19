require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/items', async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const { name } = req.body;
  const item = await prisma.item.create({ data: { name } });
  res.json(item);
});

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = await prisma.item.update({
    where: { id: Number(id) },
    data: { name },
  });
  res.json(item);
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.item.delete({ where: { id: Number(id) } });
  res.json({ success: true });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));

