//Response formatter

function response(res, statusCode, data) {
  res.status(statusCode).json({
    message: data,
  });
}

export { response };
