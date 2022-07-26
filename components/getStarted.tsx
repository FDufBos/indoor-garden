import { Divider, Flex, Button, Icon } from "@chakra-ui/react";
import { SignInButton, SignUpButton } from "./layout";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc'


const auth = getAuth();

import { useState } from "react";
const provider = new GoogleAuthProvider();


export default function GetStarted(props) {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const handleGoogleClick = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  return (
    <div className="flex flex-col items-stretch h-screen">
      <div className="h-3/4">
        <h1 className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl text-sun-100">
          Indoor Garden
        </h1>
        </div>
        <Divider size="lg"/>
        <div className="flex flex-col items-center justify-center h-1/4">
          <Flex
            direction="column"
            gap="24px"
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
          >
            <SignUpButton
              showLoadingSpinner={showLoadingSpinner}
              setShowLoadingSpinner={setShowLoadingSpinner}
            ></SignUpButton>
            <Button onClick={handleGoogleClick} leftIcon={<FcGoogle />} size="sm">
              Sign in with google
            </Button>
            <SignInButton
              showLoadingSpinner={showLoadingSpinner}
              setShowLoadingSpinner={setShowLoadingSpinner}
            ></SignInButton>
          </Flex>
        </div>
    </div>
  );
}
