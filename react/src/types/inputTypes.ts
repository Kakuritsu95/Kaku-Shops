import { ControllerRenderProps } from "react-hook-form";
import { OrderFormValues } from "./orderForm";

export interface InputProps {
  field: ControllerRenderProps<OrderFormValues, keyof OrderFormValues>;
  labelName: string;
  errorMessage: string | undefined;
  value?: string;
  maxLength?: number;
}
