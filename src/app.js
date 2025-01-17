import express from "express";
import usersRouter from "./routes/users.js";

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(usersRouter);

  return app;
};

export default createApp;
