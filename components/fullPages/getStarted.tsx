import { Divider, Flex, Button, Icon, useToast } from "@chakra-ui/react";
import { SignInButton, SignUpButton } from "../layout";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import {useEffect } from "react";
import { useUserAuth } from "../../contexts/AuthContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebaseUtils";
import { addPlant } from "../../data/firestore";


import Head from "next/head";

const auth = getAuth();

import { useState } from "react";
const provider = new GoogleAuthProvider();

export default function GetStarted(props) {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const {
    user,
    firestorePlants,
    documentIDs,
    setFirestorePlants,
    setDocumentIDs,
    logOut,
    setName,
    name
  } = useUserAuth();

  const router = useRouter();
  const { success } = router.query;
  const toast = useToast();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (success == "password-reset-email-sent") {
      toast({
        title: "Success",
        position: 'top',
        description: "Check your email for a password reset link",
        status: "success",
        duration: 6000,
        isClosable: true,
        variant: "subtle",
        containerStyle: {
          width: '95vw',
          maxWidth: '900px',
        },
      });
    }
  }, [success]);

  const handleGoogleClick = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const googleUser = result.user;
        
        // ...
      }).then(async () => {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          authProvider: "Google",
          email: auth.currentUser.email,
          name: auth.currentUser.displayName,
          timeCreated: serverTimestamp(),
        });
        setName(name);
        addPlant(
          {
            icon: "🌱",
            commonName: "Welcome Plant",
            nickname: "Hi!",
            timeTillNextWater: 0,
            wateringStreak: 0,
            level: 1,
            timeCreated: serverTimestamp(),
            timeLastWatered: serverTimestamp(),
          },
          user.uid
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="flex flex-col items-stretch h-screen">
      <Head>
        <title>Indoor Garden 🌱</title>
      </Head>
      <div className="h-[80%]">
        <h1 className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl text-sun-100">
          Indoor Garden
        </h1>
      </div>
      {/* <Divider size="lg" /> */}
      {/* TODO: make it so that this bottom part is attached to bottom isntead of being below the block above. */}
      <div className="flex flex-col items-center justify-center h-[50%]">
        <Flex
          direction="column"
          gap="32px"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100%"
        >
          <SignUpButton
            showLoadingSpinner={showLoadingSpinner}
            setShowLoadingSpinner={setShowLoadingSpinner}
          ></SignUpButton>
          <Button onClick={handleGoogleClick} leftIcon={<FcGoogle />} size="sm" className="text-sm">
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
