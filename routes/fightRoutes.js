import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createFightValid } from "../middlewares/fight.validation.middleware.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      res.data = fightService.getAll();
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      res.data = fightService.getOne(req.params.id);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createFightValid,
  (req, res, next) => {
    try {
      res.data = fightService.create(req.body);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
