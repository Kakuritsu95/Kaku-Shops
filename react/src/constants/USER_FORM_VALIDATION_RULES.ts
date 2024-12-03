import { ValidationRule } from "../types/validationRule";

const LOGIN_FORM_VALIDATION_RULES: { [key: string]: ValidationRule } = {
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

const REGISTER_FORM_VALIDATION_RULES: { [key: string]: ValidationRule } = {
  name: {
    required: "Firstname is required",
    minLength: {
      value: 3,
      message: "Firstname must contain at least 3 characters",
    },
    maxLength: {
      value: 16,
      message: "Firstname can hold a maximum of 16 characters",
    },
  },
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

export { LOGIN_FORM_VALIDATION_RULES, REGISTER_FORM_VALIDATION_RULES };
