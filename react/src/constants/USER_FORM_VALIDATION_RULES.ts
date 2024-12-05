import { RegisterOptions } from "react-hook-form";
import { CreateUser, LoginCredentials } from "../types/userInterface";
import { Path } from "react-hook-form";

const LOGIN_FORM_VALIDATION_RULES: {
  [K in keyof LoginCredentials]: RegisterOptions<
    LoginCredentials,
    Path<LoginCredentials>
  >;
} = {
  email: {
    required: "required",
    maxLength: {
      value: 16,
      message: "Mail must contain at least 5 characters",
    },
    minLength: {
      value: 3,
      message: "Mail must contain at least 5 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "Please enter a valid email",
    },
  },
  password: {
    required: "Password is required",
  },
};

const REGISTER_FORM_VALIDATION_RULES: {
  [K in keyof CreateUser]: RegisterOptions<CreateUser, Path<CreateUser>>;
} = {
  firstName: {
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
  lastName: {
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
