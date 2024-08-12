const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "items" ORDER BY "id" DESC';
  pool.query(queryText)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Error fetching items:', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const { name, note, category, quantity } = req.body;
  const queryText = `INSERT INTO "items" (name, note, category, quantity) VALUES ($1, $2, $3, $4) RETURNING id`;
  pool.query(queryText, [name, note, category, quantity])
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error('Error adding item:', err);
      res.sendStatus(500);
    });
});

router.put('/increase/:id', (req, res) => {
    const { id } = req.params;
    const queryText = 'UPDATE "items" SET "quantity" = "quantity" + 1 WHERE "id" = $1';
    pool.query(queryText, [id])
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.error('Error increasing item quantity:', err);
        res.sendStatus(500);
      });
  });
  
  router.put('/decrease/:id', (req, res) => {
    const { id } = req.params;
    const queryText = 'UPDATE "items" SET "quantity" = "quantity" - 1 WHERE "id" = $1';
    pool.query(queryText, [id])
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.error('Error decreasing item quantity:', err);
        res.sendStatus(500);
      });
  });

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const queryText = 'DELETE FROM "items" WHERE "id" = $1';
  pool.query(queryText, [id])
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error('Error deleting item:', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, note, category, quantity } = req.body;
  const queryText = `
    UPDATE "items"
    SET name = $1, note = $2, category = $3, quantity = $4
    WHERE id = $5;
  `;
  pool.query(queryText, [name, note, category, quantity, id])
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error('Error updating item:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
