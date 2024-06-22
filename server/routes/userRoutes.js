import express from 'express';
import { registerUser, loginUser, logoutUser, changeUserPassword, updateUserProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
import { getNotificationsList, markNotificationRead } from '../controllers/notificationController.js';

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.get("/notifications/:id", protectRoute, getNotificationsList);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

export default router