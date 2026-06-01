import { FIGHT } from "../models/fight.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

export const createFightValid = (req, res, next) => {
  const { fighter1, fighter2, winner, log } = req.body;

  if (!fighter1 || !fighter2) {
    return res.status(400).json({
      error: true,
      message: "fighter1 and fighter2 are required",
    });
  }

  if (typeof fighter1 !== "string" || typeof fighter2 !== "string") {
    return res.status(400).json({
      error: true,
      message: "fighter ids must be strings",
    });
  }

  if (fighter1 === fighter2) {
    return res.status(400).json({
      error: true,
      message: "fighter1 and fighter2 must be different",
    });
  }

  if (winner !== undefined && winner !== null && typeof winner !== "string") {
    return res.status(400).json({
      error: true,
      message: "winner must be a string (fighter id)",
    });
  }

  if (log && !Array.isArray(log)) {
    return res.status(400).json({
      error: true,
      message: "log must be an array",
    });
  }

  const f1 = fighterRepository.getOne({id: fighter1});
  const f2 = fighterRepository.getOne({id: fighter2});

  if (!f1 || !f2) {
    return res.status(404).json({
      error: true,
      message: "One or both fighters not found",
    });
  }

  req.body = {
    fighter1,
    fighter2,
    winner: winner || null,
    log: log || [],
  };

  next();
};