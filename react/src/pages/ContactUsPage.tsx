const captchaSiteKey: string = import.meta.env.VITE_GOOGLE_RECAPTCHA_APP_KEY;
import AfterContactThanksMessage from "../ui/AfterContactThanksMessage";
import { useState } from "react";
import ContactUsForm from "../ui/ContactUsForm";

export default function ContactUsPage() {
  const [isFormSuccessfullySubmitted, setIsFormSuccessfullySubmitted] =
    useState<boolean>(true);
  const [guestFirstName, setGuestFirstName] = useState<string>();
  if (captchaSiteKey) {
    return (
      <div className="mx-auto w-full md:w-4/5 lg:px-12 xl:w-3/5">
        {isFormSuccessfullySubmitted ? (
          <AfterContactThanksMessage firstName={guestFirstName} />
        ) : (
          <>
            <h1 className="mb-5 text-3xl font-bold text-orange-500">
              Contact us!
            </h1>
            <ContactUsForm
              setIsFormSuccessfullySubmitted={setIsFormSuccessfullySubmitted}
              setGuestFirstName={setGuestFirstName}
              captchaSiteKey={captchaSiteKey}
            />
          </>
        )}
      </div>
    );
  }
}
