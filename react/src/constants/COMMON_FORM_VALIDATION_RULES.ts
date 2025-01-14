import { RegisterOptions } from "react-hook-form";

export const COMMON_FORM_VALIDATION_RULES: {
  [key: string]: RegisterOptions;
} = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "Please enter a valid email",
    },
  },
  phoneNumber: {
    required: "Phone number is required",
    validate: (value: string | undefined) => {
      if (value === undefined) return true;
      if (!+value) return "Please enter number values";
      return true;
    },
    minLength: {
      value: 10,
      message: "Phone number must be 10 digits",
    },
    maxLength: {
      value: 10,
      message: "Phone number must be 10 digits",
    },
  },
  firstName: {
    required: "First name is required",
    validate: (value: string | undefined) => {
      if (value === undefined) return true;
      if (/\d/.test(value)) return "Number values are not allowed";
      return true;
    },
    minLength: {
      value: 3,
      message: "Firstname is too short",
    },
    maxLength: {
      value: 16,
      message: "Firstname is too long",
    },
  },
  lastName: {
    required: "Last name is required",
    validate: (value: string | undefined) => {
      if (value === undefined) return true;
      if (/\d/.test(value)) return "Number values are not allowed";
      return true;
    },
    minLength: {
      value: 3,
      message: "Last name is too short",
    },
    maxLength: {
      value: 16,
      message: "Last name is too long",
    },
  },
  proofType: { required: true },
  vatNumber: {
    required: "VAT number is required",
    validate: (value: string | undefined) => {
      if (value == undefined) return true;
      if (!+value) return "Please enter number values";
      return true;
    },
    minLength: {
      value: 9,
      message: "VAT number must be 9 digits",
    },
    maxLength: {
      value: 9,
      message: "VAT number must be 9 digits",
    },
  },
  postalCode: {
    required: "Postal code is required",

    minLength: {
      value: 5,
      message: "Postal code must be 5 digits",
    },
    maxLength: {
      value: 5,
      message: "Postal code must be 5 digits",
    },
  },
  address: {
    required: "Address is required",
  },
  city: {
    required: "Please select a city",
  },
  orderRefCode: {
    minLength: {
      value: 36,
      message: "Please enter a valid reference code",
    },
    maxLength: {
      value: 36,
      message: "Please enter a valid reference code",
    },
  },
  password: {
    minLength: { value: 2, message: "Please enter a greater value" },
    maxLength: { value: 30, message: "Maximum password value is exceeded" },
  },
};
