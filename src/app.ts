import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { SkillRoutes } from "./app/modules/skill/skill.route";
import { ExperienceRoutes } from "./app/modules/experiences/experience.route";
import { ContactRoutes } from "./app/modules/contact/contact.route";
import { BlogRoutes } from "./app/modules/blog/blog.route";
import { ProjectRoutes } from "./app/modules/project/project.route";
import cors from "cors";
import { BlogController } from "./app/modules/blog/blog.controller";
const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// routes
app.use("/api/auth", AuthRoutes);
app.use("/api/skill", SkillRoutes);
app.use("/api/experience", ExperienceRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/blog", BlogRoutes);
app.use("/api/project", ProjectRoutes);
app.get("/api/dashboard-info", BlogController.dashboardHomeData);

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Portfolio server is running..!",
  });
});

// for global error handle
app.use(globalErrorHandler);

// for not found
app.use(notFound);

export default app;
