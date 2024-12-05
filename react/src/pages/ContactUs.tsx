import ReCAPTCHA from "react-google-recaptcha";
import ControllerInput from "../ui/ControllerInput";
import { useForm } from "react-hook-form";
import { ContactFormFields } from "../types/ContactFormInterface";
import TextInput from "../ui/TextInput";
import { CONTACT_FORM_VALIDATION_RULES } from "../constants/CONTACT_FORM_VALIDATION_RULES";
import { CONTACT_SUBJECTS } from "../constants/CONTACT_SUBJECTS";
import DropdownOptionsInput from "../ui/DropdownOptionsInput";
import { Button } from "../ui/Button";
import contactUsService from "../service/contactUsService";

export default function ContactUs() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ContactFormFields>();
  const captchaSiteKey: string = import.meta.env.VITE_GOOGLE_RECAPTCHA_APP_KEY;
  async function onSubmit(data: ContactFormFields) {
    await contactUsService(data);
  }
  console.log(errors);
  if (captchaSiteKey) {
    return (
      <div className="mx-auto w-full md:w-4/5 lg:w-3/5 lg:px-12">
        <h1 className="mb-5 text-3xl font-bold text-orange-500">Contact us!</h1>
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
              <textarea
                onChange={field.onChange}
                className="overflow-hidden border p-1 pl-2.5"
                rows={4}
              >
                asd
              </textarea>
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

          <Button color="sky" size="medium">
            Send message
          </Button>
        </form>
      </div>
    );
  }
}
