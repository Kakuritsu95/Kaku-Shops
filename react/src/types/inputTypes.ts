import {
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  labelName: string;
  errorMessage: string | undefined;
  value?: PathValue<T, Path<T>>;
  maxLength?: number;
}
