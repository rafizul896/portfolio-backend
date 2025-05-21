import express, { NextFunction, Request, Response } from "express";
import { ProjectControllers } from "./project.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);

      return ProjectControllers.createProject(req, res, next);
    }
  }
);

router.get("/", ProjectControllers.getAllProjects);
router.get("/:id", ProjectControllers.getProjectById);
router.patch("/:id", auth(USER_ROLE.admin), ProjectControllers.updateProject);
router.delete("/:id", auth(USER_ROLE.admin), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
