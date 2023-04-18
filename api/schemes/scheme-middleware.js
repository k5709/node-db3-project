const db = require("../../data/db-config");
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const existing = await db("schemes")
      .where("scheme_id", req.params.scheme_id)
      .first();
    if (!existing) {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try {
    const schemeName = req.body.scheme_name;
    if (
      !schemeName ||
      schemeName === undefined ||
      typeof req.body.scheme_name !== "string"
    ) {
      next({ status: 400, message: "invalid scheme_name" });
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.body.instructions;
  const step_number = req.body.step_number;
  if (
    !instructions ||
    typeof instructions !== "string" ||
    instructions === undefined
  ) {
    next({ status: 400, message: "invalid step" });
  } else if (typeof step_number !== "number" || step_number < 1) {
    next({ status: 400, message: "invalid step" });
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
