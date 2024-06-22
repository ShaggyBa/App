import express from 'express';

import userRoutes from './userRoutes.js';
import taskRoutes from "./taskRoutes.js"
import projectRoutes from "./projectsRoutes.js"
import manageUsersRoutes from "./manageUsersRoutes.js"


const router = express.Router();

router.use('/projects', projectRoutes)

router.use('/projects/:projectId/users', (req, res, next) => {
	req.projectId = req.params.projectId;
	next()
}, manageUsersRoutes);

router.use('/projects/:projectId/tasks', (req, res, next) => {
	req.projectId = req.params.projectId;
	next();
}, taskRoutes);

router.use('/user', userRoutes)

export default router