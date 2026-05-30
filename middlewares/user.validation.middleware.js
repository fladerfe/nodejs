import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const body = req.body; 

  if ("id" in body) {
    return res.status(400).json({
      error: true,
      message: "id is not allowed",
    })
  }

  const requiredFields = Object.keys(USER).filter(key => key !== "id");

  const missingFields = requiredFields.filter(field => body[field] === undefined);

  if (missingFields.length) {
    return res.status(400).json({
      error: true,
      message: `Missing fields: ${missingFields.join(", ")}`
    })
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const body = req.body;

  if ("id" in body) {
    return res.status(400).json({
      error: true,
      message: "id is not allowed",
    })
  }

  const allowedFields = Object.keys(USER).filter(key => key !== "id");

  const hasAtLeastOneField = allowedFields.some(field => field in body);

  const hasOnlyAllowedFields = Object.keys(body).every(key => key => allowedFields.includes(key))



  if (!hasAtLeastOneField || !hasOnlyAllowedFields) {
    return res.status(400).json({
      error: true,
      message: "Invalid update body"
    })
  } 

  next();
};

export { createUserValid, updateUserValid };
