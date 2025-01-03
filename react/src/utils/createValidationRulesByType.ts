import { FieldValues, Path, RegisterOptions } from "react-hook-form";
import { COMMON_FORM_VALIDATION_RULES } from "../constants/COMMON_FORM_VALIDATION_RULES";

export const createValidationRulesByType = <T extends FieldValues>(): {
  [K in keyof T]?: RegisterOptions<T, Path<T>>;
} =>
  COMMON_FORM_VALIDATION_RULES as {
    [K in keyof T]?: RegisterOptions<T, Path<T>>;
  };
