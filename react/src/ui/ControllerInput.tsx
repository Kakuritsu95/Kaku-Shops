import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { OrderFormValues } from "../types/orderForm";
import React from "react";
import { FORM_VALIDATION_RULES } from "../constants/FORM_VALIDATION_RULES";

interface ControllerProps {
  name: keyof OrderFormValues;
  defaultValue?: string;
  render: (props: {
    field: ControllerRenderProps<OrderFormValues, keyof OrderFormValues>;
  }) => React.ReactElement;
  control: Control<OrderFormValues>;
}

export default function ControllerInput({
  name,
  render,
  defaultValue,
  control,
}: ControllerProps) {
  return (
    <div className="flex flex-1 flex-col">
      <Controller
        name={name}
        rules={FORM_VALIDATION_RULES[name]}
        control={control}
        defaultValue={defaultValue || ""}
        render={render}
      />
    </div>
  );
}
