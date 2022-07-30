import { useUserAuth } from "../contexts/AuthContext";
import { Button, Input, FormLabel } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function PasswordReset() {
  const router = useRouter();
  const emailRef = useRef(null);
  const [emailButtonEnabled, setEmailButtonEnabled] = useState(true);
  const { forgotPassword } = useUserAuth();

  const handleEmailInputChange = (e) => {
    if (e.target.value) {
      setEmailButtonEnabled(false);
    }
  };

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    setEmailButtonEnabled(true);
    const email = emailRef.current.value;
    if (email) {
      try {
        forgotPassword(email).then(() => {
          console.log("Password reset email sent");
          router.push("/?success=password-reset-email-sent");
        })
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="relative bottom-24 m-6 flex flex-col items-center justify-center h-screen gap-12">
      <h1>Password Reset</h1>
      <form
        onSubmit={forgotPasswordHandler}
        className=""
      >
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
}
