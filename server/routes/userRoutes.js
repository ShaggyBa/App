import express from 'express';
import { registerUser, loginUser, logoutUser, getTeamList } from '../controllers/userController.js';
import { protectRoute, isAdminRoute } from '../middleware/authMiddleware.js';
import { getNotificationsList, markNotificationRead } from '../controllers/notificationController.js';
import { updateUserProfile, changeUserPassword, activateUserProfile, deleteUserProfile } from '../controllers/userProfile.js';

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.get("/get-team", protectRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

// FOR ADMIN ONLY - ADMIN ROUTES
router
	.route("/status/:id")
	.put(protectRoute, isAdminRoute, activateUserProfile)
	.delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router