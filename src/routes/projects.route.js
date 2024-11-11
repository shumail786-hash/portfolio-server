import { Router } from "express";
import projectsController from "../controllers/projects.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router
  .route("/upload")
  .post(
    verifyJWT,
    upload.single("projectThumbnail"),
    projectsController.uploadProjects
  );
router.route("/getAllProjects").get(projectsController.getAllProjects);

export default router;
