import { useForm, SubmitHandler, ControllerRenderProps } from "react-hook-form";
import FormSection from "../../ui/FormSection";

import { OrderFormValues } from "../../types/orderForm";

import TextInput from "../../ui/TextInput";
import ControllerInput from "../../ui/ControllerInput";
import CityInput from "../../ui/CityInput";
import { GREEK_CITIES_WITH_POSTAL_CODES } from "../../constants/GREEK_CITIES_WITH_POSTAL_CODES";

export default function OrderInfoForm() {
  const {
    formState: { errors },
    control,
    watch,
    setValue,
    handleSubmit,
  } = useForm<OrderFormValues>();

  const onSubmit: SubmitHandler<OrderFormValues> = (data) => {
    console.log(data);
  };
  const city = watch("city");
  const postalCode = GREEK_CITIES_WITH_POSTAL_CODES.find(
    (c) => c.city === city,
  )?.postalCode;
  if (postalCode) {
    setValue("postalCode", postalCode);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
      <FormSection title="Contact information">
        <ControllerInput
          name="email"
          control={control}
          render={({ field }) => <TextInput field={field} labelName="Email" />}
        />
      </FormSection>
      <FormSection title="Shipping information">
        <div className="flex gap-5">
          <ControllerInput
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput field={field} labelName="First name" />
            )}
          />
          <ControllerInput
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput field={field} labelName="Last name" />
            )}
          />
        </div>
        <ControllerInput
          name="address"
          control={control}
          render={({ field }) => (
            <TextInput field={field} labelName="Address" />
          )}
        />
        <div className="flex gap-5">
          <ControllerInput
            name="city"
            control={control}
            render={({ field }) => <CityInput field={field} labelName="City" />}
          />
          <ControllerInput
            name="postalCode"
            control={control}
            render={({ field }) => (
              <TextInput field={field} labelName="Postal code" />
            )}
          />
        </div>
        <ControllerInput
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextInput field={field} labelName="Phone number" />
          )}
        />
      </FormSection>
      <button>ss</button>
    </form>
  );
}
