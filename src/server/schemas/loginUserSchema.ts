import { Joi, validate } from "express-validation";
import { type UserCredentials } from "../../types";

const loginUserSchema = {
  body: Joi.object<UserCredentials>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const loginValidation = validate(loginUserSchema, {}, { abortEarly: false });

export default loginValidation;
