import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Portfolio server is running..!",
  });
});

export default app;
