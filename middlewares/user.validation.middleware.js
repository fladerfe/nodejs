import { USER } from "../models/user.js";

const isGmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
};

const isUkrPhone = (phone) => {
  return /^\+380\d{9}$/.test(phone);
};


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

  if (!body.email || !isGmail(body.email)) {
    return res.status(400).json({
      error: true,
      message: "Email must be Gmail only"
    });
  }

  if (typeof body.password !== "string" || body.password.trim().length < 3) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 3 characters long",
    });
  }

  if (!body.phone || !isUkrPhone(body.phone)) {
    return res.status(400).json({
      error: true,
      message: "Phone must match +380XXXXXXXXX"
    });
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

  const hasOnlyAllowedFields = Object.keys(body).every(key => allowedFields.includes(key))

  if (!hasAtLeastOneField || !hasOnlyAllowedFields) {
    return res.status(400).json({
      error: true,
      message: "Invalid update body"
    })
  } 

  if (body.email && !isGmail(body.email)) {
    return res.status(400).json({
      error: true,
      message: "Email must be Gmail only",
    });
  }

  if (body.phone && !isUkrPhone(body.phone)) {
    return res.status(400).json({
      error: true,
      message: "Phone must match +380XXXXXXXXX",
    });
  }

  if (body.password && typeof body.password !== "string" || body.password.trim().length < 3) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 3 characters long",
    });
  }

  next();
};

export { createUserValid, updateUserValid };
