import express from 'express';
import { createOrUpdateTopic } from '../controllers/topics';

const router = express.Router();

router.post('/', createOrUpdateTopic);

router.post('/edit/', createOrUpdateTopic);

export default router;
