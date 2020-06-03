import express from 'express';

const router = express.Router();

router.get('/ehlo', (req, res) => {
  res.sendStatus(200);
});

export default router;
