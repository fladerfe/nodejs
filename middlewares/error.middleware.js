const errorMiddleware = (err, req, res, next) => {
  // res.status(err.status || 400).json({
  //   error: true,
  //   message: err.message,
  // });
};

export { errorMiddleware };