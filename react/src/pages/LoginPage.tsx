import authService from "../service/authService";
import { LoginCredentials, User } from "../types/userInterface";
import { useUserContext } from "../context/UserDetailsContext";
import { Navigate } from "react-router";
import { useForm } from "react-hook-form";
import ControllerInput from "../ui/ControllerInput";
import TextInput from "../ui/TextInput";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LOGIN_FORM_VALIDATION_RULES } from "../constants/FORM_VALIDATION_RULES";

export default function LoginPage() {
  const { userId, initializeUser } = useUserContext();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<LoginCredentials>({
    defaultValues: { email: "user1@gmail.com", password: "11" },
  });
  const { mutate: login } = useMutation<User, AxiosError, LoginCredentials>({
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
    <div className="h-[40rem] w-full rounded-xl sm:bg-[url('https://images.unsplash.com/photo-1536059540012-f2ed455bc0b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] sm:bg-cover sm:bg-center sm:pt-24">
      <div className="mx-auto h-full w-full space-y-10 rounded-xl bg-white p-5 opacity-95 sm:h-auto sm:w-8/12 sm:px-10 sm:py-12 sm:shadow-border md:w-5/12 lg:w-4/12">
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
                error={errors?.email}
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
                error={errors?.password}
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
    </div>
  );
}
