const router = require('express').Router();
const pool = require('../db');

// Lista produtos. Permite filtrar por nome com ?name=...
router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      const result = await pool.query('SELECT id, name, price, stock FROM products ORDER BY id');
      return res.json(result.rows);
    }
    const result = await pool.query(`SELECT id, name, price, stock FROM products WHERE name ILIKE '%${name}%' ORDER BY id`);
    return res.json(result.rows);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, name, price, stock FROM products WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Produto nao encontrado' });
    return res.json(result.rows[0]);
  } catch (err) { next(err); }
});
module.exports = router;
