import { useForm } from "react-hook-form";
import { CreateUser } from "../types/userInterface";
import { useMutation } from "@tanstack/react-query";
import userService from "../service/userService";
import { AxiosError } from "axios";
import ControllerInput from "../ui/ControllerInput";
import TextInput from "../ui/TextInput";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { REGISTER_FORM_VALIDATION_RULES } from "../constants/FORM_VALIDATION_RULES";

export default function SignupPage() {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateUser>({
    defaultValues: { email: "user1@gmail.com", password: "11" },
  });
  const { mutate: signup, isPending: isSigning } = useMutation<
    void,
    AxiosError,
    CreateUser
  >({
    mutationFn: (credentials: CreateUser) => userService.register(credentials),
  });
  function onSubmit(userDetails: CreateUser) {
    signup(userDetails);
  }

  return (
    <div className="h-[40rem] w-full rounded-xl sm:bg-[url('https://images.unsplash.com/photo-1536059540012-f2ed455bc0b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] sm:bg-cover sm:bg-center sm:pt-12">
      <div className="mx-auto w-full space-y-10 rounded-xl bg-white p-5 opacity-95 sm:w-8/12 sm:px-10 sm:py-12 sm:shadow-border md:w-5/12 lg:w-4/12">
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
                error={errors?.email}
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
                error={errors?.password}
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
              validationRules={REGISTER_FORM_VALIDATION_RULES.firstName}
              render={({ field }) => (
                <TextInput
                  error={errors?.firstName}
                  labelName="Firstname"
                  field={field}
                />
              )}
            />
            <ControllerInput
              name="lastName"
              control={control}
              validationRules={REGISTER_FORM_VALIDATION_RULES.lastName}
              render={({ field }) => (
                <TextInput
                  error={errors?.lastName}
                  labelName="Lastname"
                  field={field}
                />
              )}
            />
          </div>

          <Button
            type="brand"
            color="brand"
            size="medium"
            isSubmitting={isSigning}
          >
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
    </div>
  );
}
