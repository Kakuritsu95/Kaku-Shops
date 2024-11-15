import authService from "../service/authService";
import { LoginCredentials, User } from "../types/userInterface";
import { useUserDetails } from "../context/UserDetailsContext";
import { Navigate } from "react-router";
import { useForm } from "react-hook-form";
import ControllerInput from "../ui/ControllerInput";
import TextInput from "../ui/TextInput";
import { LOGIN_FORM_VALIDATION_RULES } from "../constants/LOGIN_FORM_VALIDATION_RULES";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function LoginPage() {
  const { userId, initializeUser } = useUserDetails();

  const {
    formState: { isLoading, errors },
    control,
    handleSubmit,
  } = useForm<LoginCredentials>({
    defaultValues: { email: "user1@gmail.com", password: "11" },
  });
  const { data: user, mutate: login } = useMutation<
    User,
    AxiosError,
    LoginCredentials
  >({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data: User) => {
      initializeUser(data);
    },
  });
  function onSubmit(loginCredentials: LoginCredentials) {
    login(loginCredentials);
  }
  if (userId) return <Navigate to="/" />;
  return (
    <div className="sm:shadow-border mx-auto w-full space-y-10 rounded-xl p-5 sm:mt-24 sm:w-8/12 sm:px-10 sm:py-12 md:w-5/12 lg:w-4/12">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-gray-500">Please enter your details</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <ControllerInput
          name="email"
          control={control}
          validationRules={LOGIN_FORM_VALIDATION_RULES.email}
          render={({ field }) => (
            <TextInput
              errorMessage={errors?.email?.message}
              labelName="Email address"
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
              type="password"
              field={field}
            />
          )}
        />

        <Button type="brand" color="brand" size="medium">
          Sign in
        </Button>
      </form>
      <div className="space-x-2">
        <span>Dont have an account?</span>
        <Link to="/signup" className="text-sky-600 underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
