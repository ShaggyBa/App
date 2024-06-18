import express from 'express';

import userRoutes from './userRoutes.js';
import taskRoutes from "./taskRoutes.js"
import projectRoutes from "./projectsRoutes.js"


const router = express.Router();

router.use('/user', userRoutes); // api/user/login
router.use('/tasks', taskRoutes); // api/task
router.use('/projects', projectRoutes)

export default router