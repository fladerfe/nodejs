import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.data = userService.getAll();
  }),
  responseMiddleware
);

router.get(
  "/:id", 
  asyncHandler(async (req, res) => {
    res.data = userService.getOne(req.params.id); 
  }),
  responseMiddleware
);

router.post("/", 
  asyncHandler(async (req, res) => {
    res.data = userService.create(req.body);
  }),
  responseMiddleware
);

router.patch(
  "/:id", 
  updateUserValid, 
  asyncHandler(async (req, res) => {
    res.data = userService.update(
      req.params.id,
      req.body
    );
  }),
  responseMiddleware
);

router.delete(
  "/:id", 
  asyncHandler(async (req, res) => {
    res.data = userService.delete(req.params.id);  
  }),
  responseMiddleware
);

export { router };
