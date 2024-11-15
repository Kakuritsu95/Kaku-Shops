import { useForm, SubmitHandler } from "react-hook-form";
import FormSection from "../../ui/FormSection";
import { OrderFormFields } from "../../types/orderFormFields";
import TextInput from "../../ui/TextInput";
import ControllerInput from "../../ui/ControllerInput";
import CityInput from "../../ui/CityInput";
import { GREEK_CITIES_WITH_POSTAL_CODES } from "../../constants/GREEK_CITIES_WITH_POSTAL_CODES";
import SelectDocumentTypeInput from "../../ui/SelectDocumentInput";
import { forwardRef, PropsWithChildren, useEffect } from "react";
import { ORDER_FORM_VALIDATION_RULES } from "../../constants/ORDER_FORM_VALIDATION_RULES";
import { useUserDetails } from "../../context/UserDetailsContext";
import { useMutation } from "@tanstack/react-query";
import orderService from "../../service/orderService";
import { AxiosError } from "axios";
import { OrderRequest } from "../../types/orderInterface";

export const OrderInfoForm = forwardRef<HTMLFormElement, PropsWithChildren>(
  function OrderInfoForm(_, formRef) {
    const { email } = useUserDetails();
    const {
      formState: { errors },
      control,
      watch,
      setValue,
      handleSubmit,
    } = useForm<OrderFormFields>({
      defaultValues: { proofType: "RECEIPT", email },
    });
    const city = watch("city");
    const userWantsInvoice = watch("proofType") == "INVOICE";

    useEffect(() => {
      const postalCode = GREEK_CITIES_WITH_POSTAL_CODES.find(
        (c) => c.city === city,
      )?.postalCode;
      if (postalCode) {
        setValue("postalCode", postalCode);
      }
    }, [city, setValue, watch]);
    const { mutate: placeOrder } = useMutation<void, AxiosError, OrderRequest>({
      mutationFn: (orderDetails) => orderService.placeOrder(orderDetails),
      onSuccess: () => console.log("submitted"),
    });
    const onSubmit: SubmitHandler<OrderFormFields> = (orderDetails) => {
      const { address, city, postalCode, ...userInfo } = orderDetails;
      placeOrder({ ...userInfo, address: { address, city, postalCode } });
    };

    return (
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        <FormSection title="Contact information">
          <ControllerInput
            name="email"
            control={control}
            validationRules={ORDER_FORM_VALIDATION_RULES.email}
            render={({ field }) => (
              <TextInput
                errorMessage={errors?.email?.message}
                labelName="Email"
                field={field}
              />
            )}
          />
        </FormSection>
        <FormSection title="Shipping information">
          <div className="flex gap-5">
            <ControllerInput
              name="firstName"
              control={control}
              validationRules={ORDER_FORM_VALIDATION_RULES.firstName}
              render={({ field }) => (
                <TextInput
                  errorMessage={errors?.firstName?.message}
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
                  errorMessage={errors?.lastName?.message}
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
                errorMessage={errors?.address?.message}
                labelName="Address"
                field={field}
              />
            )}
          />
          <div className="flex gap-5">
            <ControllerInput
              name="city"
              control={control}
              validationRules={ORDER_FORM_VALIDATION_RULES.city}
              render={({ field }) => (
                <CityInput
                  errorMessage={errors?.city?.message}
                  labelName="City"
                  field={field}
                />
              )}
            />
            <ControllerInput
              name="postalCode"
              control={control}
              validationRules={ORDER_FORM_VALIDATION_RULES.postalCode}
              render={({ field }) => (
                <TextInput
                  errorMessage={errors?.postalCode?.message}
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
                errorMessage={errors?.phoneNumber?.message}
                labelName="Phone number"
                field={field}
                maxLength={10}
              />
            )}
          />
        </FormSection>
        <FormSection title="Choose document type">
          <div className="flex gap-5">
            <ControllerInput
              name="proofType"
              control={control}
              validationRules={ORDER_FORM_VALIDATION_RULES.proofType}
              render={({ field }) => (
                <SelectDocumentTypeInput
                  labelName="Receipt"
                  errorMessage={errors?.proofType?.message}
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
                  errorMessage={errors?.proofType?.message}
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
                  errorMessage={errors?.vatNumber?.message}
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
  },
);
