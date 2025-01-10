import { useForm } from "react-hook-form";
import { Address } from "../../types/orderInterface";
import ControllerInput from "../../ui/ControllerInput";
import { useEffect } from "react";
import useUserDetails from "../../hooks/useUserDetails";
import TextInput from "../../ui/TextInput";
import { Button } from "../../ui/Button";
import DropdownOptionsInput from "../../ui/DropdownOptionsInput";
import {
  GREEK_CITIES,
  GREEK_CITIES_WITH_POSTAL_CODES,
} from "../../constants/GREEK_CITIES_WITH_POSTAL_CODES";
import useUpdateUserDetails from "../../hooks/useUpdateUserDetails";
import { ADDRESS_FORM_VALIDATION_RULES } from "../../constants/FORM_VALIDATION_RULES";

export default function UserDetailsSettingsForm() {
  const { userDetails } = useUserDetails();
  const { updateUserDetails, isUpdating } = useUpdateUserDetails();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm<Address>({
    defaultValues: {
      city: "",
      address: "",
      postalCode: "",
    },
  });
  useEffect(() => {
    if (userDetails) reset(userDetails.address);
  }, [reset, userDetails]);
  function onSubmit(address: Address) {
    updateUserDetails({ address });
  }
  const city = watch("city");
  useEffect(() => {
    const postalCode = GREEK_CITIES_WITH_POSTAL_CODES.find(
      (c) => c.city === city,
    )?.postalCode;
    if (postalCode) {
      setValue("postalCode", postalCode);
    }
  }, [city, setValue, watch]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ControllerInput
        control={control}
        name="address"
        validationRules={ADDRESS_FORM_VALIDATION_RULES.address}
        render={({ field }) => (
          <TextInput field={field} error={errors.address} labelName="Address" />
        )}
      />
      <div className="flex gap-2 sm:gap-5">
        <ControllerInput
          name="city"
          control={control}
          validationRules={ADDRESS_FORM_VALIDATION_RULES.city}
          render={({ field }) => (
            <DropdownOptionsInput
              error={errors?.city}
              dropdownOptions={GREEK_CITIES}
              labelName="City"
              field={field}
            />
          )}
        />
        <ControllerInput
          name="postalCode"
          control={control}
          validationRules={ADDRESS_FORM_VALIDATION_RULES.postalCode}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              error={errors?.postalCode}
              labelName="Postal code"
              field={field}
              maxLength={5}
            />
          )}
        />
      </div>

      <div className="text-right">
        <Button color="black" size="large" isSubmitting={isUpdating}>
          Save
        </Button>
      </div>
    </form>
  );
}
