import { ContactFormFields } from "../types/ContactFormInterface";
import { OrderFormFields } from "../types/orderFormFields";
import { Address } from "../types/orderInterface";
import {
  LoginCredentials,
  SignupCredentials,
  UserDetails,
} from "../types/userInterface";
import { createValidationRulesByType } from "../utils/createValidationRulesByType";

const ADDRESS_FORM_VALIDATION_RULES = createValidationRulesByType<Address>();

const CONTACT_FORM_VALIDATION_RULES =
  createValidationRulesByType<ContactFormFields>();

const ORDER_FORM_VALIDATION_RULES =
  createValidationRulesByType<OrderFormFields>();

const USER_DETAILS_FORM_VALIDATION_RULES =
  createValidationRulesByType<UserDetails>();

const LOGIN_FORM_VALIDATION_RULES =
  createValidationRulesByType<LoginCredentials>();

const REGISTER_FORM_VALIDATION_RULES =
  createValidationRulesByType<SignupCredentials>();

export {
  ADDRESS_FORM_VALIDATION_RULES,
  CONTACT_FORM_VALIDATION_RULES,
  ORDER_FORM_VALIDATION_RULES,
  USER_DETAILS_FORM_VALIDATION_RULES,
  LOGIN_FORM_VALIDATION_RULES,
  REGISTER_FORM_VALIDATION_RULES,
};
