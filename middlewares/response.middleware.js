const responseMiddleware = (req, res, next) => {
  res.status(200).json(res.data)
  next();
};

export { responseMiddleware };
