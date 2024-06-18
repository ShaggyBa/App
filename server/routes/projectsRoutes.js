import express from "express";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { getProjects, createProject } from "../controllers/projectsController.js";

const router = express.Router();

router.get("/", protectRoute, getProjects);
router.post("/create", protectRoute, createProject);
// router.get("/:id", protectRoute, getProject);
// router.get("/:id/dashboard", protectRoute, dashboardStatistics);
// router.put("/update/:id", protectRoute, isAdminRoute, updateProject);
// router.delete(
// 	"/delete/:id?",
// 	protectRoute,
// 	deleteProject
// );


/**
 * 1. Выводить список проектов при входе в аккаунт
 * 2. Создавать проект
 * 3. Переходить на конкретный проект
 * 4. Отображать статистику проекта
 * 5. Обновлять проект (название и прочее)
 * 6. Удалять проект
 */

export default router;