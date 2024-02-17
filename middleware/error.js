const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

  err.stack = err.name + ': ' + err.message;
  console.log(err);
  let statusCode = 500;
  let message = err.message;
  let validationErrors = [];

  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    validationErrors = Object.values(err.errors).map(val => val.message);
  }

  const errorResponse = new ErrorResponse(message, statusCode, validationErrors);

  res.status(statusCode).json(errorResponse.toJSON());
};

module.exports = errorHandler;