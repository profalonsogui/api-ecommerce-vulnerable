const router = require('express').Router();
const pool = require('../db');

// Exemplo didatico: identificacao simplificada pelo header X-User-Id.
router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, user_id, product_id, quantity, status FROM orders WHERE id = $1',
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Pedido nao encontrado' });
    return res.json(result.rows[0]);
  } catch (err) { next(err); }
});
module.exports = router;
