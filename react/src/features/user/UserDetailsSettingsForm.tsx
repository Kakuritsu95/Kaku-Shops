import { useForm } from "react-hook-form";
import ControllerInput from "../../ui/ControllerInput";
import { UserDetails } from "../../types/userInterface";
import TextInput from "../../ui/TextInput";
import useUserDetails from "../../hooks/useUserDetails";
import { useEffect } from "react";

import { Button } from "../../ui/Button";

import useUpdateUserDetails from "../../hooks/useUpdateUserDetails";
import { USER_DETAILS_FORM_VALIDATION_RULES } from "../../constants/FORM_VALIDATION_RULES";

export default function UserDetailsSettingsForm() {
  const { userDetails } = useUserDetails();
  const { updateUserDetails } = useUpdateUserDetails();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<UserDetails>({
    defaultValues: { email: "", firstName: "", lastName: "", phoneNumber: "" },
  });

  async function onSubmit(data: UserDetails) {
    updateUserDetails(data);
  }

  useEffect(() => {
    if (userDetails) reset(userDetails);
  }, [reset, userDetails]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ControllerInput
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            field={field}
            error={errors.email}
            labelName="Email"
            disabled={true}
          />
        )}
      />
      <ControllerInput
        control={control}
        name="firstName"
        validationRules={USER_DETAILS_FORM_VALIDATION_RULES.firstName}
        render={({ field }) => (
          <TextInput
            field={field}
            error={errors.firstName}
            labelName="First name"
          />
        )}
      />
      <ControllerInput
        control={control}
        name="lastName"
        validationRules={USER_DETAILS_FORM_VALIDATION_RULES.lastName}
        render={({ field }) => (
          <TextInput
            field={field}
            error={errors.lastName}
            labelName="Last name"
          />
        )}
      />
      <ControllerInput
        control={control}
        name="phoneNumber"
        validationRules={USER_DETAILS_FORM_VALIDATION_RULES.phoneNumber}
        render={({ field }) => (
          <TextInput
            field={field}
            error={errors.phoneNumber}
            labelName="Phone number"
          />
        )}
      />
      <div className="text-right">
        <Button color="black" size="large">
          Save
        </Button>
      </div>
    </form>
  );
}
