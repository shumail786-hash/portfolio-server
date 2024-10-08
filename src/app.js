import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { ApiResponse } from "./utils/ApiResponse.js";
import { ApiError } from "./utils/ApiError.js";
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieparser());

// Importing Routes

import adminRouter from "./routes/admin.route.js";
import projectRouter from "./routes/projects.route.js";

app.get("/", async (req, res) => {
  try {
    res.json(new ApiResponse(200, "", "Server is running", true));
  } catch (error) {
    res.json(new ApiError(500, error.message, false));
  }
});

// Using routes

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/projects", projectRouter);

export { app };
