import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    res.data = authService.login(req.body);
  }),
  responseMiddleware
);

export { router };
