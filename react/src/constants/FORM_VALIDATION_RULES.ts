import { ValidationRule } from "../types/validationRule";
export const FORM_VALIDATION_RULES: { [key: string]: ValidationRule } = {
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
      if (value == undefined) return true;
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
    validate: (value: string | undefined) => {
      if (value == undefined) return true;
      if (!+value) return "Please enter number values";
      return true;
    },
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
  firstName: {
    required: "First name is required",
  },
  lastName: {
    required: "Last name is required",
  },
  city: {
    required: "Please select a city",
  },
};
