const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleSchemaValidationError);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required().min(6),
  email: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required(),
});

const schemasUser = {
  userSchema,
  joiRegisterSchema,
  joiLoginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemasUser,
};
