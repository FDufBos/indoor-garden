import { Button, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

import { useUserAuth } from "../contexts/AuthContext";

export const PasswordReset: React.FC = () => {
  const router = useRouter();
  const emailRef = useRef(null);
  const [emailButtonEnabled, setEmailButtonEnabled] = useState(true);
  const { forgotPassword } = useUserAuth();

  const handleEmailInputChange = (e): void => {
    if (e.target.value) {
      setEmailButtonEnabled(false);
    }
  };

  const forgotPasswordHandler = async (e): Promise<void> => {
    e.preventDefault();
    setEmailButtonEnabled(true);
    const email = emailRef.current.value;
    if (email) {
      try {
        await forgotPassword(email).then(() => {
          router.push("/?success=password-reset-email-sent");
        });
      } catch (e) {
        throw Error(e);
      }
    }
  };

  return (
    <div className="relative bottom-24 m-6 flex flex-col items-center justify-center h-screen gap-12">
      <h1>Password Reset</h1>
      <form onSubmit={forgotPasswordHandler} className="">
        <FormLabel color="#FCFEF8">Email:</FormLabel>
        <div className="flex gap-2">
          <Input
            required
            id="email"
            name="email"
            type="email"
            ref={emailRef}
            placeholder="Enter your email"
            onChange={handleEmailInputChange}
            color="#FFF3B7"
            className="placeholder:text-water-100 placeholder:opacity-70"
          />
          <Button disabled={emailButtonEnabled} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default PasswordReset;
