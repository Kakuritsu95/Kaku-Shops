import authService from "../service/authService";
import { LoginCredentials, Role } from "../types/userInterface";
import { useUserDetails } from "../context/UserDetailsContext";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import ControllerInput from "../ui/ControllerInput";
import TextInput from "../ui/TextInput";
import { LOGIN_FORM_VALIDATION_RULES } from "../constants/LOGIN_FORM_VALIDATION_RULES";
import { Button } from "../ui/Button";
import { useEffect } from "react";

export default function LoginPage() {
  const { userId, initializeUser } = useUserDetails();
  const navigate = useNavigate();

  const {
    formState: { isLoading, errors },
    control,
    handleSubmit,
  } = useForm<LoginCredentials>({
    defaultValues: { email: "user1@gmail.com", password: "11" },
  });

  function onSubmit(data: LoginCredentials) {
    authService.login(data);
    initializeUser({ role: Role.USER, email: "123", userId: 1 });
  }
  if (userId) return <Navigate to="/" />;
  return (
    <div className="mx-auto w-3/5 bg-orange-500 px-24 py-56">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <ControllerInput
          name="email"
          control={control}
          validationRules={LOGIN_FORM_VALIDATION_RULES.email}
          render={({ field }) => (
            <TextInput
              errorMessage={errors?.email?.message}
              labelName="Email"
              field={field}
            />
          )}
        />
        <ControllerInput
          name="password"
          control={control}
          validationRules={LOGIN_FORM_VALIDATION_RULES.password}
          render={({ field }) => (
            <TextInput
              errorMessage={errors?.email?.message}
              labelName="Password"
              field={field}
            />
          )}
        />
        <Button type="brand" color="brand" size="full">
          Login
        </Button>
      </form>
    </div>
  );
}
