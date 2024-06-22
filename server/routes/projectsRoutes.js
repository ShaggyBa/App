import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getProjects, getProject, createProject, updateProject, deleteProject } from "../controllers/projectsController.js";

const router = express.Router();

router.get("/", protectRoute, getProjects);

router.post("/create", protectRoute, createProject);

router.get("/:projectId", protectRoute, getProject);
router.put("/:projectId", protectRoute, updateProject);
router.delete("/:projectId", protectRoute, deleteProject);


export default router;