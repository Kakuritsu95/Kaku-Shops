import { useForm, SubmitHandler } from "react-hook-form";
import FormSection from "../../ui/FormSection";
import { OrderFormFields } from "../../types/orderFormFields";
import TextInput from "../../ui/TextInput";
import ControllerInput from "../../ui/ControllerInput";
import {
  GREEK_CITIES,
  GREEK_CITIES_WITH_POSTAL_CODES,
} from "../../constants/GREEK_CITIES_WITH_POSTAL_CODES";
import SelectDocumentTypeInput from "../../ui/SelectDocumentInput";
import { forwardRef, PropsWithChildren, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "../../service/orderService";
import { AxiosError } from "axios";
import { OrderRequest } from "../../types/orderInterface";
import { useNavigate } from "react-router";
import DropdownOptionsInput from "../../ui/DropdownOptionsInput";
import { ORDER_FORM_VALIDATION_RULES } from "../../constants/FORM_VALIDATION_RULES";
import useUserDetails from "../../hooks/useUserDetails";

export const OrderInfoForm = forwardRef<
  HTMLFormElement,
  PropsWithChildren<{ setIsSubmitting: (value: boolean) => void }>
>(function OrderInfoForm({ setIsSubmitting }, formRef) {
  const queryClient = useQueryClient();
  const { userDetails } = useUserDetails();

  const {
    formState: { errors },
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
  } = useForm<OrderFormFields>({
    defaultValues: {
      proofType: "RECEIPT",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      phoneNumber: "",
      postalCode: "",
      vatNumber: "",
    },
  });
  const city = watch("city");
  const userWantsInvoice = watch("proofType") == "INVOICE";
  const navigate = useNavigate();

  useEffect(() => {
    const postalCode = GREEK_CITIES_WITH_POSTAL_CODES.find(
      (c) => c.city === city,
    )?.postalCode;
    if (postalCode) {
      setValue("postalCode", postalCode);
    }
  }, [city, setValue, watch]);
  useEffect(() => {
    if (userDetails)
      reset({
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        address: userDetails.address?.address,
        city: userDetails.address?.city,
        postalCode: userDetails.address?.postalCode,
        phoneNumber: userDetails.phoneNumber,
      });
  }, [userDetails, reset]);
  const { mutate: placeOrder, data: orderRefCode } = useMutation<
    string,
    AxiosError,
    OrderRequest
  >({
    mutationFn: (orderDetails) => orderService.placeOrder(orderDetails),
    onSuccess: () => {
      setIsSubmitting(false);
      queryClient.resetQueries({ queryKey: ["cart"] });
    },
    onError: () => setIsSubmitting(false),
  });
  const onSubmit: SubmitHandler<OrderFormFields> = (orderDetails) => {
    setIsSubmitting(true);
    const { address, city, postalCode, ...userInfo } = orderDetails;
    placeOrder({ ...userInfo, address: { address, city, postalCode } });
  };
  if (orderRefCode) navigate(`/order/${orderRefCode}`);
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-1/2"
    >
      <FormSection title="Contact information">
        <ControllerInput
          name="email"
          control={control}
          validationRules={ORDER_FORM_VALIDATION_RULES.email}
          render={({ field }) => (
            <TextInput error={errors?.email} labelName="Email" field={field} />
          )}
        />
      </FormSection>
      <FormSection title="Shipping information">
        <div className="flex gap-2 sm:w-full sm:gap-5">
          <ControllerInput
            name="firstName"
            control={control}
            validationRules={ORDER_FORM_VALIDATION_RULES.firstName}
            render={({ field }) => (
              <TextInput
                error={errors?.firstName}
                labelName="First name"
                field={field}
              />
            )}
          />
          <ControllerInput
            name="lastName"
            control={control}
            validationRules={ORDER_FORM_VALIDATION_RULES.lastName}
            render={({ field }) => (
              <TextInput
                error={errors?.lastName}
                labelName="Last name"
                field={field}
              />
            )}
          />
        </div>
        <ControllerInput
          name="address"
          control={control}
          validationRules={ORDER_FORM_VALIDATION_RULES.address}
          render={({ field }) => (
            <TextInput
              error={errors?.address}
              labelName="Address"
              field={field}
            />
          )}
        />
        <div className="flex gap-2 sm:gap-5">
          <ControllerInput
            name="city"
            control={control}
            validationRules={ORDER_FORM_VALIDATION_RULES.city}
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
            defaultValue=""
            validationRules={ORDER_FORM_VALIDATION_RULES.postalCode}
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
        <ControllerInput
          name="phoneNumber"
          control={control}
          validationRules={ORDER_FORM_VALIDATION_RULES.phoneNumber}
          render={({ field }) => (
            <TextInput
              error={errors?.phoneNumber}
              labelName="Phone number"
              field={field}
              maxLength={10}
            />
          )}
        />
      </FormSection>
      <FormSection title="Choose document type">
        <div className="flex gap-2 sm:gap-5">
          <ControllerInput
            name="proofType"
            control={control}
            validationRules={ORDER_FORM_VALIDATION_RULES.proofType}
            render={({ field }) => (
              <SelectDocumentTypeInput
                labelName="Receipt"
                error={errors?.proofType}
                value="RECEIPT"
                field={field}
              />
            )}
          />
          <ControllerInput
            name="proofType"
            control={control}
            validationRules={ORDER_FORM_VALIDATION_RULES.proofType}
            render={({ field }) => (
              <SelectDocumentTypeInput
                labelName="invoice"
                error={errors?.proofType}
                value="INVOICE"
                field={field}
              />
            )}
          />
        </div>
        {userWantsInvoice && (
          <ControllerInput
            name="vatNumber"
            control={control}
            validationRules={ORDER_FORM_VALIDATION_RULES.vatNumber}
            render={({ field }) => (
              <TextInput
                error={errors?.vatNumber}
                labelName="Vat number"
                field={field}
                maxLength={9}
              />
            )}
          />
        )}
      </FormSection>
    </form>
  );
});
