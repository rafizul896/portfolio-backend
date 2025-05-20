import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import cookieParser from 'cookie-parser'
const app = express();

// parsers
app.use(express.json())
app.use(cookieParser())
// routes
app.use("/auth", AuthRoutes);

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
