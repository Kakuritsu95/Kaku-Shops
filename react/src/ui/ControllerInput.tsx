import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { OrderFormValues } from "../types/orderForm";
import React from "react";

export default function ControllerInput({
  name,
  render,
  defaultValue,
  control,
}: {
  name: keyof OrderFormValues;
  defaultValue?: string;
  render: (props: {
    field: ControllerRenderProps<OrderFormValues, keyof OrderFormValues>;
  }) => React.ReactElement;
  control: Control<OrderFormValues>;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={render}
      />
    </div>
  );
}
