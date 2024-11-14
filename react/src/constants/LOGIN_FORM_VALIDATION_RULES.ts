import { ValidationRule } from "../types/validationRule";

export const LOGIN_FORM_VALIDATION_RULES: { [key: string]: ValidationRule } = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "Please enter a valid email",
    },
  },
  password: {
    required: "Password is required",
  },
};
