import { useForm } from "react-hook-form";

import { UpdatePassword } from "../../types/userInterface";
import ControllerInput from "../../ui/ControllerInput";
import TextInput from "../../ui/TextInput";
import userService from "../../service/userService";
import { useEffect } from "react";

export default function UserChangePasswordForm() {
  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
    clearErrors,
    watch,
  } = useForm<UpdatePassword>({
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });
  function onSubmit(data: UpdatePassword) {
    userService.changeAuthenticatedUserPassword(data);
  }
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmNewPassword");

  useEffect(() => {
    if (newPassword && confirmPassword && confirmPassword != newPassword)
      setError("newPassword", { message: "Passwords do not match" });
    else clearErrors("newPassword");
  }, [newPassword, confirmPassword, setError, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <ControllerInput
        control={control}
        name="oldPassword"
        render={({ field }) => (
          <TextInput
            field={field}
            type="password"
            labelName="Current password"
            error={errors.oldPassword}
          />
        )}
      />
      <ControllerInput
        control={control}
        name="newPassword"
        render={({ field }) => (
          <TextInput
            field={field}
            type="password"
            labelName="New password"
            error={errors.newPassword}
          />
        )}
      />
      <ControllerInput
        control={control}
        name="confirmNewPassword"
        render={({ field }) => (
          <TextInput
            field={field}
            type="password"
            labelName="Confirm password"
            error={errors.confirmNewPassword}
          />
        )}
      />
      <button>Submit</button>
    </form>
  );
}
