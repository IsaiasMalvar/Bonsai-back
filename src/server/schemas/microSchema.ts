import { Joi, validate } from "express-validation";
import { type RequestCreateMicroData } from "../controllers/types";

const microstorySchema = {
  body: Joi.object<RequestCreateMicroData>({
    author: Joi.string().required(),
    dateOfCreation: Joi.string().required(),
    genre: Joi.string().required(),
    image: Joi.string().required(),
    isPublic: Joi.boolean().required(),
    story: Joi.string().required(),
    title: Joi.string().required(),
  }),
};

export const microValidation = validate(
  microstorySchema,
  {},
  { abortEarly: false }
);
