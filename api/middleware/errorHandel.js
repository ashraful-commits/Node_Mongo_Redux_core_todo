//===============error handleer

export const errorHandler = (error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errormessage = error.message || 'unknown error';
  return res.status(errorStatus).json({
    name: error.name,
    message: errormessage,
    status: errorStatus,
    stack: error.stack,
  });
};
