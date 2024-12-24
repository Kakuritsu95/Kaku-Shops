import { useForm } from "react-hook-form";
import ControllerInput from "./ControllerInput";
import contactUsService from "../service/contactUsService";
import { ContactFormFields } from "../types/ContactFormInterface";
import TextInput from "./TextInput";
import { CONTACT_FORM_VALIDATION_RULES } from "../constants/CONTACT_FORM_VALIDATION_RULES";
import DropdownOptionsInput from "./DropdownOptionsInput";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "./Button";
import Spinner from "./Spinner";
import { CONTACT_SUBJECTS } from "../constants/CONTACT_SUBJECTS";

export default function ContactUsForm({
  captchaSiteKey,
  setGuestFirstName,
  setIsFormSuccessfullySubmitted,
}: {
  captchaSiteKey: string;
  setGuestFirstName: (guestFirstName: string) => void;
  setIsFormSuccessfullySubmitted: (isSubmitted: boolean) => void;
}) {
  const {
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ContactFormFields>();

  async function onSubmit(data: ContactFormFields) {
    try {
      await contactUsService(data);
      setIsFormSuccessfullySubmitted(true);
      setGuestFirstName(getValues("firstName"));
    } catch {
      return;
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControllerInput
        control={control}
        name="firstName"
        defaultValue=""
        validationRules={CONTACT_FORM_VALIDATION_RULES.firstName}
        render={({ field }) => (
          <TextInput
            labelName="First name"
            field={field}
            error={errors.firstName}
          />
        )}
      />

      <ControllerInput
        control={control}
        name="lastName"
        defaultValue=""
        validationRules={CONTACT_FORM_VALIDATION_RULES.lastName}
        render={({ field }) => (
          <TextInput
            labelName="Last name"
            field={field}
            error={errors.lastName}
          />
        )}
      />
      <ControllerInput
        control={control}
        name="email"
        defaultValue=""
        validationRules={CONTACT_FORM_VALIDATION_RULES.email}
        render={({ field }) => (
          <TextInput labelName="Email" field={field} error={errors.email} />
        )}
      />
      <ControllerInput
        control={control}
        name="subject"
        defaultValue=""
        validationRules={CONTACT_FORM_VALIDATION_RULES.subject}
        render={({ field }) => (
          <DropdownOptionsInput
            labelName="Subject"
            dropdownOptions={CONTACT_SUBJECTS}
            field={field}
            error={errors.subject}
          />
        )}
      />
      <ControllerInput
        control={control}
        name="orderRefCode"
        validationRules={CONTACT_FORM_VALIDATION_RULES.orderRefCode}
        render={({ field }) => (
          <TextInput
            labelName="Order reference code"
            field={field}
            error={errors?.orderRefCode}
          />
        )}
      />
      <ControllerInput
        control={control}
        name="message"
        validationRules={CONTACT_FORM_VALIDATION_RULES.message}
        render={({ field }) => (
          <>
            <textarea
              onChange={field.onChange}
              className="mt-1.5 border p-1 pl-2.5 focus:outline-none"
              rows={4}
              placeholder="Please give us more details..."
              maxLength={2000}
            />
          </>
        )}
      />

      <ControllerInput
        control={control}
        name="recaptchaToken"
        validationRules={CONTACT_FORM_VALIDATION_RULES.recaptchaToken}
        render={({ field }) => (
          <div>
            <label>{errors?.recaptchaToken?.message}</label>
            <ReCAPTCHA sitekey={captchaSiteKey} onChange={field.onChange} />
          </div>
        )}
      />

      <Button isSubmitting={isSubmitting} color="sky" size="medium">
        {isSubmitting ? <Spinner size={24} /> : "Send message"}
      </Button>
    </form>
  );
}
