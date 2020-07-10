import express from 'express';
import { editTopics } from '../controllers/editTopic';

const router = express.Router();

router.put('/', editTopics);

export default router;
