// Check request payload for errors

import joi from "joi";
import { response } from "./reponseFormatter.js";

// Validate the input against the schema
function validateInput(req, res, next) {
  // Request schema
  const schema = joi.object({
    organization: joi.string().min(1).max(30).required(),
    numberOfPopularRepos: joi.number().integer().min(1).max(1000).required(),
    numberOfPopularCommittiees: joi
      .number()
      .integer()
      .min(1)
      .max(1000)
      .required(),
  });
  // Input
  const input = {
    organization: req.query.organization,
    numberOfPopularCommittiees: req.query.numberOfPopularCommittiees,
    numberOfPopularRepos: req.query.numberOfPopularRepos,
  };
  const validationResult = schema.validate(input);
  if (validationResult.error) {
    const errorMessage = `Input Validation Error: ${JSON.stringify(
      validationResult.error.details
    )}`;
    response(res, 400, errorMessage);
  } else {
    next();
  }
}

export default validateInput;
