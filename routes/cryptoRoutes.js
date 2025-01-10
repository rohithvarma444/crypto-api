import express from 'express';
import { statsController, getStandardDeviation } from '../controllers/statsController.js';

const router = express.Router();

router.get('/stats', statsController);
router.get('/deviation', getStandardDeviation);

export default router;