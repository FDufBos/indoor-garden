import Image from "next/image";
import React from "react";
import { createUser, logOut, signIn } from "../data/firestore";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useControllableProp,
  useControllableState,
} from "@chakra-ui/react";
import { useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const SignUpButton = ({
  isLoggedIn,
  onLoginStatusChange,
  setUserEmail,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginStatusChange(true);
    createUser(e.target.elements.email.value, e.target.elements.password.value);
    setUserEmail(e.target.elements.email.value);
    onClose();
  };
  return (
    <div>
      <Button
        id="exchange-button"
        className="bg-white drop-shadow-sm rounded-full text-grey-600 px-4 py-2 text-center font-[558] transition-all"
        borderRadius="999px"
        leftIcon={<p>🌱</p>}
        onClick={onOpen}
      >
        Create Account
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Create Account</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex gap-1">
              <Button type="submit" colorScheme="green">
                Create Account
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export const SignInButton = ({
  isLoggedIn,
  onLoginStatusChange,
  setUserEmail,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginStatusChange(true);
    signIn(e.target.elements.email.value, e.target.elements.password.value);
    setUserEmail(e.target.elements.email.value);
    onClose();
  };
  return (
    <div className="flex flex-row gap-4">
      <Button
        id="exchange-button"
        className="bg-white drop-shadow-sm rounded-full text-grey-600 px-4 py-2 text-center font-[558] transition-all"
        borderRadius="999px"
        leftIcon={<p>☀️</p>}
        onClick={onOpen}
      >
        Sign In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Sign In</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex gap-1">
              <Button type="submit" colorScheme="green">
                Sign In
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export function AccountButtons({
  isLoggedIn,
  onLoginStatusChange,
  setUserEmail,
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     const email = user.email;
  //     console.log(email);
  //     return (
  //       <nav
  //         id="explore"
  //         className=" flex flex-row justify-between items-center h-[40px] w-full"
  //       >
  //         <div
  //           id="profile-pic"
  //           className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full"
  //         >
  //           <Image
  //             src="/images/memoji/male-1.png"
  //             width="30"
  //             height="30"
  //             className="drop-shadow"
  //           />
  //         </div>

  //         <div className="flex items-center flex-row gap-4 text-white">
  //           <div className="text-sm">{email}</div>
  //           <Button
  //             id="exchange-button"
  //             className="bg-white drop-shadow-sm rounded-full text-grey-600 px-4 py-2 text-center font-[558] transition-all"
  //             borderRadius="999px"
  //             leftIcon={<p>👋</p>}
  //             isLoading={isLoading}
  //             onClick={() => {
  //               setIsLoading(true);
  //               setTimeout(() => {
  //                 setLoggedIn(false);
  //                 setIsLoading(false);
  //                 logOut();
  //               }, 1600);
  //             }}
  //           >
  //             Log Out
  //           </Button>
  //         </div>
  //       </nav>
  //     );
  //   } else {
  //     // User is signed out
  //     console.log("you are not signed in");
  //     return (
  //       <nav
  //         id="explore"
  //         className=" flex flex-row justify-between items-center h-[40px] w-full"
  //       >
  //         <div
  //           id="profile-pic"
  //           className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full"
  //         >
  //           <Image
  //             src="/images/memoji/male-1.png"
  //             width="30"
  //             height="30"
  //             className="drop-shadow"
  //           />
  //         </div>

  //         <div className="flex flex-row gap-4">
  //           <SignInButton
  //             isLoggedIn={loggedIn}
  //             onLoginStatusChange={setLoggedIn}
  //             setUserEmail={setEmail}
  //           />
  //           <SignUpButton
  //             isLoggedIn={loggedIn}
  //             onLoginStatusChange={setLoggedIn}
  //             setUserEmail={setEmail}
  //           />
  //         </div>
  //       </nav>
  //     );
  //   }
  // });

  return (
    <nav
      id="explore"
      className=" flex flex-row justify-between items-center h-[40px] w-full"
    >
      <div
        id="profile-pic"
        className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full"
      >
        <Image
          src="/images/memoji/male-1.png"
          width="30"
          height="30"
          className="drop-shadow"
        />
      </div>

      {!loggedIn ? (
        <div className="flex flex-row gap-4">
          <SignInButton
            isLoggedIn={loggedIn}
            onLoginStatusChange={setLoggedIn}
            setUserEmail={setEmail}
          />
          <SignUpButton
            isLoggedIn={loggedIn}
            onLoginStatusChange={setLoggedIn}
            setUserEmail={setEmail}
          />
        </div>
      ) : (
        <div className="flex items-center flex-row gap-4 text-white">
          <div className="text-sm">{email}</div>
          <Button
            id="exchange-button"
            className="bg-white drop-shadow-sm rounded-full text-grey-600 px-4 py-2 text-center font-[558] transition-all"
            borderRadius="999px"
            leftIcon={<p>👋</p>}
            isLoading={isLoading}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setLoggedIn(false);
                setIsLoading(false);
                logOut();
              }, 1600);
            }}
          >
            Log Out
          </Button>
        </div>
      )}
    </nav>
  );
}

export default function Layout({ children }) {
  return (
    <div className=" text-white">
      <header className="flex flex-col gap-4 mt-4 mx-6">
        <AccountButtons
          isLoggedIn={undefined}
          onLoginStatusChange={undefined}
          setUserEmail={undefined}
        />
        <div
          id="title-area"
          className="flex flex-row justify-between items-end w-full"
        >
          <div className="flex flex-row items-baseline gap-3">
            <h1 className="font-alpina">Indoor Garden</h1>
          </div>
          <Image src="/images/sun.svg" width="35" height="35" />
        </div>
        <div className="line w-full h-[1px] bg-white opacity-75 -translate-y-2 mb-4"></div>
      </header>
      {children}
      <footer className="flex flex-col justify-center items-center">
        <div className="line w-full h-[1px] bg-white opacity-75 -translate-y-1"></div>
        👀👀
      </footer>
    </div>
  );
}
