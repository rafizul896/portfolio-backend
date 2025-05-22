import { NextFunction, Request, Response, Router } from "express";
import { SkillControllers } from "./skill.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);

      return SkillControllers.createSkillIntoDB(req, res, next);
    }
  }
);

router.get("/", SkillControllers.getAllSkillFromDB);

router.delete("/:id", SkillControllers.deleteSkillFromDB);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);

      return SkillControllers.updateSkillInDB(req, res, next);
    }
  }
);

export const SkillRoutes = router;
