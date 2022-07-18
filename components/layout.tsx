import Image from "next/image";
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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth()

export const SignUpButton = ({
  showLoadingSpinner,
  setShowLoadingSpinner,
  loading,
  user,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoadingSpinner(true);
    createUser(e.target.elements.email.value, e.target.elements.password.value, e.target.elements.name.value);
    setTimeout(() => {
      setShowLoadingSpinner(false);
    }, 400);
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
                    Name
                  </label>
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <input
                    required
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
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex gap-1">
              <Button
                type="submit"
                colorScheme="green"
                isLoading={showLoadingSpinner}
              >
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
  showLoadingSpinner,
  setShowLoadingSpinner,
  loading,
  user,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoadingSpinner(true);
    signIn(e.target.elements.email.value, e.target.elements.password.value);
    setTimeout(() => {
      onClose();
      setShowLoadingSpinner(false);
    }, 400);
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
              <Button
                type="submit"
                colorScheme="green"
                isLoading={showLoadingSpinner}
              >
                Sign In
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export function LoginNav({
  showLoadingSpinner,
  setShowLoadingSpinner,
  loading,
  user,
}) {
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
      <div className="flex flex-row gap-4">
        <SignInButton
          showLoadingSpinner={showLoadingSpinner}
          setShowLoadingSpinner={setShowLoadingSpinner}
          loading={loading}
          user={user}
        />
        <SignUpButton
          showLoadingSpinner={showLoadingSpinner}
          setShowLoadingSpinner={setShowLoadingSpinner}
          loading={loading}
          user={user}
        />
      </div>
    </nav>
  );
}

export function SignOutNav({
  user,
  setShowLoadingSpinner,
  showLoadingSpinner,
}) {
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
      <div className="flex items-center flex-row gap-4 text-white">
        <div className="text-sm">{user}</div>
        <Button
          id="exchange-button"
          className="bg-white drop-shadow-sm rounded-full text-grey-600 px-4 py-2 text-center font-[558] transition-all"
          borderRadius="999px"
          leftIcon={<p>🚪</p>}
          isLoading={showLoadingSpinner}
          onClick={() => {
            setShowLoadingSpinner(true);
            setTimeout(() => {
              logOut();
              setShowLoadingSpinner(false);
            }, 400);
          }}
        >
          Log Out
        </Button>
      </div>
    </nav>
  );
}

export default function Layout({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  return (
    <div className=" text-white">
      <header className="flex flex-col gap-4 mt-4 mx-6">
        {user ? (
          <SignOutNav
            user={user.email}
            setShowLoadingSpinner={setShowLoadingSpinner}
            showLoadingSpinner={showLoadingSpinner}
          />
        ) : (
          <LoginNav
            showLoadingSpinner={showLoadingSpinner}
            setShowLoadingSpinner={setShowLoadingSpinner}
            loading={loading}
            user={user}
          />
        )}
        <div
          id="title-area"
          className="flex flex-row justify-between items-end w-full"
        >
          <div className="flex flex-row items-baseline gap-3">
            <h1 className="font-alpina">Indoor Garden</h1>
            <div></div>
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
