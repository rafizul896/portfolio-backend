import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { SkillRoutes } from "./app/modules/skill/skill.route";
import { ExperienceRoutes } from "./app/modules/experiences/experience.route";
import { ContactRoutes } from "./app/modules/contact/contact.route";
const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/auth", AuthRoutes);
app.use("/skill", SkillRoutes);
app.use("/experience", ExperienceRoutes);
app.use("/contact", ContactRoutes);

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
