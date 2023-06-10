import { Joi, validate } from "express-validation";
import { type RequestCreateMicroData } from "../controllers/types";

const microStorySchema = {
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
  microStorySchema,
  {},
  { abortEarly: false }
);
