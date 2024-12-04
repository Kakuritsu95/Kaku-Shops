import ReCAPTCHA from "react-google-recaptcha";

export default function ContactUs() {
  const captchaSiteKey = import.meta.env.VITE_APP_SITE_KEY;
  return (
    <ReCAPTCHA
      sitekey={captchaSiteKey}
      onChange={() => console.log("changed")}
    />
  );
}
