const { httpError } = require("../helpers");
const validation = (schema) => {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw httpError(400, "missing fields");
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.label;
      return res
        .status(400)
        .json({ message: `missing required ${missingField} field` });
    }
    next();
  };
};

module.exports = validation;
