import { useForm } from "react-hook-form";
import { CreateUser } from "../types/userInterface";
import { useMutation } from "@tanstack/react-query";

import userService from "../service/userService";

import { AxiosError } from "axios";
import ControllerInput from "../ui/ControllerInput";
import TextInput from "../ui/TextInput";
import { REGISTER_FORM_VALIDATION_RULES } from "../constants/USER_FORM_VALIDATION_RULES";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

export default function Signup() {
  const {
    formState: { isLoading, errors },
    control,
    handleSubmit,
  } = useForm<CreateUser>({
    defaultValues: { email: "user1@gmail.com", password: "11" },
  });
  const { mutate: signup } = useMutation<void, AxiosError, CreateUser>({
    mutationFn: (credentials: CreateUser) => userService.register(credentials),
  });
  function onSubmit(userDetails: CreateUser) {
    signup(userDetails);
  }

  return (
    <div className="mx-auto w-full space-y-10 rounded-xl p-5 sm:mt-16 sm:w-8/12 sm:px-10 sm:py-12 sm:shadow-border md:w-5/12 lg:w-4/12">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Register shopping account</h2>
        <p className="text-gray-500">Please enter your details</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <ControllerInput
          name="email"
          control={control}
          validationRules={REGISTER_FORM_VALIDATION_RULES.email}
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
          validationRules={REGISTER_FORM_VALIDATION_RULES.password}
          render={({ field }) => (
            <TextInput
              errorMessage={errors?.password?.message}
              labelName="Password"
              type="password"
              field={field}
            />
          )}
        />
        <div className="flex gap-2">
          <ControllerInput
            name="firstName"
            control={control}
            validationRules={REGISTER_FORM_VALIDATION_RULES.name}
            render={({ field }) => (
              <TextInput
                errorMessage={errors?.firstName?.message}
                labelName="Firstname"
                field={field}
              />
            )}
          />
          <ControllerInput
            name="lastName"
            control={control}
            validationRules={REGISTER_FORM_VALIDATION_RULES.name}
            render={({ field }) => (
              <TextInput
                errorMessage={errors?.lastName?.message}
                labelName="Lastname"
                field={field}
              />
            )}
          />
        </div>

        <Button type="brand" color="brand" size="medium">
          Sign up
        </Button>
      </form>
      <div className="space-x-2">
        <span>Already have an account?</span>
        <Link to="/auth/login" className="text-sky-600 underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
