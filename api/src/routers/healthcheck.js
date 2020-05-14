import express from 'express';

const router = express.Router();

router.get('/ehlo', (req, res) => {
  res.sendStatus(200);
});

router.post('/form/submit', (req,res) => {
  console.log("request recieved");
})

export default router;