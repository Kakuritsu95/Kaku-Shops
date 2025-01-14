import { FaCheck } from "react-icons/fa6";
import InfoMessageTip from "./InfoMessageTip";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
export default function AfterContactThanksMessage({
  firstName,
}: {
  firstName: string | undefined;
}) {
  return (
    <div className="mt-44 space-y-6">
      <div className="flex flex-col items-center justify-center gap-5 text-center md:flex-row md:text-start">
        <h2 className="text-[1.7rem] font-bold text-orange-500 xl:text-3xl">
          Thank you for reaching out to us {firstName && ", " + firstName}
        </h2>
        <div>
          <FaCheck
            className="rounded-full border-2 border-green-600 p-3 text-green-600"
            size={60}
          />
        </div>
      </div>
      <InfoMessageTip type="success" size="large">
        Your message has been received and will be reviewed by our team. We will
        do our best to assist you as soon as possible, typically within the next
        few days.
      </InfoMessageTip>
      <Link to="/" className="flex justify-end text-lg text-blue-700">
        <div className="flex items-center space-x-2 border-b border-blue-700">
          <span>Back to</span> <FaHome size={18} />
        </div>
      </Link>
    </div>
  );
}
