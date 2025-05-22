import express, { NextFunction, Request, Response } from "express";
import { BlogController } from "./blog.controller";
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

      return BlogController.createBlog(req, res, next);
    }
  }
);

router.get("/", BlogController.getAllBlogs);
router.get("/slug/:slug", BlogController.getBlogBySlug);
router.get("/:id", BlogController.getBlogById);
router.delete("/:id", BlogController.deleteBlog);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);

      return BlogController.updateBlog(req, res, next);
    }
  }
);

export const BlogRoutes = router;
