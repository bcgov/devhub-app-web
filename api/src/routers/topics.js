import express from 'express';
import { createTopic } from '../controllers/createTopic';

const router = express.Router();

router.post('/', createTopic);

export default router;
