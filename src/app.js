require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (_req, res) => res.json({ project: 'E-commerce Lab', message: 'API de treinamento - usar somente em localhost', endpoints: ['/api/products', '/api/users', '/api/orders/1'] }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use((_req, res) => res.status(404).json({ error: 'Rota nao encontrada' }));
app.use((err, _req, res, _next) => {
  console.error('Erro interno:', err.message);
  return res.status(500).json({ error: 'Erro interno na API' });
});
const port = Number(process.env.PORT || 3000);
app.listen(port, '127.0.0.1', () => console.log(`API disponivel em http://127.0.0.1:${port}`));
