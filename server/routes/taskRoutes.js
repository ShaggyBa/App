import express from "express";
import {
	createSubTask,
	createTask,
	dashboardStatistics,
	deleteRestoreTask,
	duplicateTask,
	getTask,
	getTasks,
	postTaskActivity,
	trashTask,
	updateTask,
} from "../controllers/taskController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
router.post("/duplicate/:id", protectRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute, createSubTask);
router.put("/update/:id", protectRoute, updateTask);
router.put("/trash/:id", protectRoute, trashTask);

router.delete(
	"/delete-restore/:id?",
	protectRoute,

	deleteRestoreTask
);

export default router;