import express from 'express';

import userRoutes from './userRoutes.js';
import taskRoutes from "./taskRoutes.js"

// import { getUser } from '../controllers/general.js';

const router = express.Router();

router.use('/user', userRoutes); // api/user/login
router.use('/task', taskRoutes); // api/task

// router.get('/user/:id', getUser);

export default router