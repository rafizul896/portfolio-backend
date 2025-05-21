import { NextFunction, Request, Response, Router } from "express";
import { ExperienceControllers } from "./experience.controller";
import { upload } from "../../utils/sendImageToCloudinary";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);

      return ExperienceControllers.createExperienceIntoDB(req, res, next);
    }
  }
);

router.get("/", ExperienceControllers.getAllExperienceFromDB);
router.get("/:id", ExperienceControllers.getSingleExperienceFromDB);
router.patch("/:id", ExperienceControllers.updateExperienceIntoDB);
router.delete("/:id", ExperienceControllers.deleteExperienceFromDB);

export const ExperienceRoutes = router;
