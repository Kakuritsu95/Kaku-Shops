import { useNavigate, useParams } from "react-router";
import authService from "../service/authService";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import InfoMessageTip from "../ui/InfoMessageTip";
import { Link } from "react-router-dom";

export default function AccountVerificationPage() {
  const { verificationToken } = useParams<string>();
  const navigate = useNavigate();
  useEffect(() => {
    async function verify(): Promise<AxiosResponse | undefined> {
      if (verificationToken)
        try {
          return await authService.activateUser(verificationToken);
        } catch (error) {
          if (axios.isAxiosError(error)) navigate("/");
        }
    }
    verify();
  }, [verificationToken, navigate]);

  return (
    <div className="mt-5 space-y-5 text-center">
      <InfoMessageTip size="large" type="success">
        Your account has been successfully activated! You can now proceed with
        fulfilling your orders!
      </InfoMessageTip>

      <p className="text-2xl text-gray-700">
        <span>You can now </span>
        <Link className="text-sky-700 underline" to="/auth/login">
          login
        </Link>
        <span> and fullfill your orders!</span>
      </p>
      <img className="mx-auto w-2/3" src="/public/goshop.png" />
    </div>
  );
}
