const router = require('express').Router();
const pool = require('../db');
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    return res.json(result.rows);
  } catch (err) { next(err); }
});
module.exports = router;
