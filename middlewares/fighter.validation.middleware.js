import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const body = req.body;

  if ("id" in body) {
    return res.status(400).json({
      error: true,
      message: "id is not allowed",
    });
  }

  const requiredFields = ["name", "power", "defense"];

  const missingFields = requiredFields.filter(field => body[field] === undefined);

  if (missingFields.length) {
    return res.status(400).json({
      error: "true",
      message: `Missing fields: ${missingFields.join(", ")}`,
    });
  }

  const allowedFields = Object.keys(FIGHTER).filter(key => key !== "id")

  const hasOnlyAllowedFields = Object.keys(body).every(key => allowedFields.includes(key));

  if (!hasOnlyAllowedFields) {
    return res.status(400).json({
      error: "true",
      message: "Invalid fields in body",
    });
  }

  if (body.health === undefined) {
    body.health = 85;
  }

  if (body.power < 1 || body.power > 100) {
    return res.status(400).json({
      error: true,
      message: "power must be between 1 and 100",
    });
  }

  if (body.defense < 1 || body.defense > 10) {
    return res.status(400).json({
      error: true,
      message: "defense must be between 1 and 10",
    });
  }

  if (body.health < 80 || body.health > 120) {
    return res.status(400).json({
      error: true,
      message: "health must be between 80 and 120",
    });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const body = req.body

  if ("id" in body) {
    return res.status(400).json({
      error: true,
      message: "id is not allowed",
    });
  }

  const allowedFields = Object.keys(FIGHTER).filter(key => key !== "id");

  const hasAtLeastOneField = allowedFields.some(field => field in body);

  if (!hasAtLeastOneField) {
    return res.status(400).json({
      error: true,
      message: "body has no fields",
    });
  }

  const hasOnlyAllowedFields = Object.keys(body).every(key => allowedFields.includes(key));

  if (!hasOnlyAllowedFields) {
    return res.status(400).json({
      error: true,
      message: "invalid fields in body",
    });
  }

  if ("power" in body && (body.power < 1 || body.power > 100)) {
    return res.status(400).json({
      error: true,
      message: "power must be between 1 and 100",
    });
  }

  if ("defense" in body && (body.defense < 1 || body.defense > 10)) {
    return res.status(400).json({
      error: true,
      message: "defense must be between 1 and 10",
    });
  }

  if ("health" in body && (body.health < 80 || body.health > 120)) {
    return res.status(400).json({
      error: true,
      message: "health must be between 80 and 120",
    });
  }

  next();
};

export { createFighterValid, updateFighterValid };
