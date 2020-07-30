import express from 'express';
import { createTopic } from '../controllers/createTopic';
import { editTopics } from '../controllers/editTopic';

const router = express.Router();

router.post('/', createTopic);

router.put('/edit', editTopics);

export default router;
