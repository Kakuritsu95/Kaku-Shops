import { ValidateResult } from "react-hook-form";

export interface ValidationRule {
  required?: string | boolean;
  validate?: (field: string | undefined) => ValidateResult;
  message?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    valueAsNumber?: boolean;
    value: number;
    message: string;
  };
  maxLength?: {
    valueAsNumber?: boolean;
    value: number;
    message: string;
  };
}
