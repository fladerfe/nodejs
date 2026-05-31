import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.data = fighterService.getAll();
  }),
  responseMiddleware
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    res.data = fighterService.getOne(req.params.id);
  }),
  responseMiddleware
);

router.post(
  "/",
  createFighterValid,
  asyncHandler(async (req, res) => {
    res.data = fighterService.create(req.body);
  }),
  responseMiddleware
);

router.patch(
  "/:id", 
  updateFighterValid,
  asyncHandler(async (req, res) => {
    res.data = fighterService.update(req.params.id, req.body);
  }),
  responseMiddleware
);

router.delete(
  "/:id", 
  asyncHandler(async (req, res) => {
    res.data = fighterService.delete(req.params.id);
  }),
  responseMiddleware
);

export { router };
