import { Path, RegisterOptions } from "react-hook-form";
import { ContactFormFields } from "../types/ContactFormInterface";
import { CONTACT_SUBJECTS } from "./CONTACT_SUBJECTS";

export const CONTACT_FORM_VALIDATION_RULES: {
  [K in keyof Partial<ContactFormFields>]: RegisterOptions<
    ContactFormFields,
    Path<ContactFormFields>
  >;
} = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "Please enter a valid email",
    },
  },
  firstName: {
    required: "Firstname is required",
    minLength: {
      value: 3,
      message: "First name must contain at least 3 characters",
    },
    maxLength: {
      value: 16,
      message: "First name can hold a maximum of 16 characters",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: {
      value: 3,
      message: "First name must contain at least 3 characters",
    },
    maxLength: {
      value: 16,
      message: "First name can hold a maximum of 16 characters",
    },
  },
  recaptchaToken: {
    required: "Please confirm you are not a robot",
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

  subject: {
    required: "Please select a subject",
    validate: (value) =>
      (value && CONTACT_SUBJECTS.includes(value)) || "Please select a subject",
  },
};
