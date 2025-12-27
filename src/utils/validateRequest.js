const Joi = require('joi');

const bookValidation = {
  body: Joi.object({
    bookName: Joi.string().min(3).max(30).required(),
    genre: Joi.string(),
    author: Joi.string(),
    created_by: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'headers']);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false }) 
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message);
    return res.status(400).json({
      status: "error",
      errors: errorMessage,
    });
  }

  if (value.params) req.params = value.params;
  if (value.query) req.query = value.query;
  if (value.body) req.body = value.body;
  if (value.headers) req.headers = value.headers;

  return next();
};

module.exports = { validate, bookValidation };
