import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import route from "./route";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ticket LIVE API." });
});

app.use("/api/v1", route);

app.use((req: Request, res: Response, next: NextFunction): void => {
  const error = new Error("Not found!");
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: {
      message: `Ticket API says ${error.message}`,
    },
  });
  next();
});

app.listen(3000, () => console.log("listening at port 3000"));
