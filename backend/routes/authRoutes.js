import express from "express";
const router = express.Router();
import { createAccount, login, forgetPassword, resetPassword , getUserDetails, updateProfile} from "../controllers/authController.js";
import { authenticateToken } from "../Utilities/utilities.js";


router.post("/create-account", createAccount);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.get("/get-user", authenticateToken, getUserDetails);
router.put("/update-profile", authenticateToken, updateProfile);

export default router;