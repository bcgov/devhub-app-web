import express from 'express';
import { createOrUpdateTopic } from '../controllers/topics';

const router = express.Router();

router.post('/', createOrUpdateTopic);

export default router;
