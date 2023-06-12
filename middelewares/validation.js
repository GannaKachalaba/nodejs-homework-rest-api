const validation = (schema) => {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      next({ status: 400, message: "missing fields" });
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        next({ status: 400, message: error.message });
      } else {
        next();
      }
    }
  };
};

module.exports = validation;
