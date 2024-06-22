import express from 'express';

import { updateUserInfo, activateUser, deleteUserFromProject, getTeamList, addUserToProject } from '../controllers/userProfileController.js';
import { protectRoute } from '../middleware/authMiddleware.js';



const router = express.Router()

router.get("/get-team", protectRoute, getTeamList);
router.put("/userInfo", protectRoute, updateUserInfo);
router.post("/add-user", protectRoute, addUserToProject);


router
	.route("/status/:id")
	.put(protectRoute, activateUser)
	.delete(protectRoute, deleteUserFromProject);


export default router