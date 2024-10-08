import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.route("/register").post(adminController.register);
router.route("/login").post(adminController.login);
router.route("/log").get(verifyJWT, adminController.log);

export default router;
