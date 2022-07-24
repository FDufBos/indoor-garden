import Image from "next/image";
import Link from "next/link";
("../data/firestore");
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
  Alert,
  AlertIcon,
  AlertDescription,
  Input,
  Avatar,
  SkeletonCircle,
  Spacer,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, sendEmailVerification } from "firebase/auth";

import { useUserAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebaseUtils";

//called for sendEmailVerification
const auth = getAuth();

export const SignUpButton = ({ showLoadingSpinner, setShowLoadingSpinner }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp, name, setName } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowLoadingSpinner(true);
    try {
      await signUp(email, password)
        .then(async () => {
          await sendEmailVerification(auth.currentUser);
        })
        .then(async () => {
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            authProvider: "Username and Password",
            email,
            name: name,
            timeCreated: serverTimestamp(),
          });
          setName(name);
        })
        .then(() => {
          setTimeout(() => {
            setShowLoadingSpinner(false);

            onClose();
          }, 200);
        });
    } catch (err) {
      setShowLoadingSpinner(false);
      if (err.code === "auth/email-already-in-use") {
        setError(`Email already in use`);
      } else if (err.code === "auth/internal-error") {
        setError(`Have you filled everything out?`);
      } else {
        setError(err.code);
      }
    }
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
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            onClick={() => {
              setError("");
            }}
          />
          <ModalHeader>Create Account</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm">
                    Name
                  </label>
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <Alert status="error" borderRadius="xl">
                    <AlertIcon />
                    <AlertDescription fontSize="sm">{error}</AlertDescription>
                  </Alert>
                )}
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

export const SignInButton = ({ showLoadingSpinner, setShowLoadingSpinner }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowLoadingSpinner(true);
    try {
      await logIn(email, password).then(() => {
        setTimeout(() => {
          setShowLoadingSpinner(false);
          onClose();
        }, 700);
      });
    } catch (err) {
      // setError(err.message);
      setShowLoadingSpinner(false);
      if (err.code === "auth/wrong-password") {
        setError("Wrong password friend");
      } else if (err.code === "auth/user-not-found") {
        setError(`Email doesn't exist`);
      } else if (err.code === "auth/internal-error") {
        setError(`Have you filled everything out?`);
      } else {
        setError(err.code);
      }
    }
  };

  return (
    <div>
      <Button
        id="exchange-button"
        size="sm"
        background="none"
        className="drop-shadow-sm rounded-full"
        borderRadius="999px"
        color="#FCFEF8"
        display="flex"
        alignItems="center"
        leftIcon={<div>☀️</div>}
        onClick={onOpen}
        _hover={{
          textDecoration: "underline",
        }}
      >
        <p>Sign In</p>
        <Spacer px="2px" />
        <ArrowForwardIcon w={4} h={4} />
      </Button>
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            onClick={() => {
              setError("");
            }}
          />
          <ModalHeader>Sign In</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <Input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <Input
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="bg-grey-100 rounded-md border-2 border-grey-300 px-4 py-2 text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <Alert status="error" borderRadius="xl">
                    <AlertIcon />
                    <AlertDescription fontSize="sm">{error}</AlertDescription>
                  </Alert>
                )}
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

export function LoginNav({ showLoadingSpinner, setShowLoadingSpinner }) {
  return (
    <nav id="explore" className="">
      <div className="flex flex-row md:gap-4 items-center justify-between md:justify-end w-full ">
        <SignUpButton
          showLoadingSpinner={showLoadingSpinner}
          setShowLoadingSpinner={setShowLoadingSpinner}
        />
        <SignInButton
          showLoadingSpinner={showLoadingSpinner}
          setShowLoadingSpinner={setShowLoadingSpinner}
        />
      </div>
    </nav>
  );
}

export function SignOutNav({ setShowLoadingSpinner, showLoadingSpinner }) {
  const { logOut, photoURL } = useUserAuth();

  return (
    <nav
      id="explore"
      className=" flex flex-row justify-between items-center h-[40px] w-full"
    >
      <Link href="/profile">
        <div
          id="profile-pic"
          className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer"
        >
          <Avatar w={10} h={10} src={photoURL}></Avatar>
        </div>
      </Link>
      <div className="flex items-center flex-row gap-4 text-white">
        <Button
          id="exchange-button"
          className="drop-shadow-sm rounded-full text-grey-600"
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
  const { user, userDocument, photoURL, setPhotoURL, name } = useUserAuth();

  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  useEffect(() => {
    if (photoURL) {
      setPhotoURL(photoURL);
    } else if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  return (
    <div className=" text-white">
      <header className="flex flex-col gap-4 pt-4 mx-6">
      <div className="flex flex-col-reverse md:flex-col gap-4 pb-4 md:pb-0">
          <SignOutNav
            setShowLoadingSpinner={setShowLoadingSpinner}
            showLoadingSpinner={showLoadingSpinner}
          />
          <div
            id="title-area"
            className="flex flex-row justify-between items-end w-full"
          >
            <div className="flex flex-row items-baseline gap-3">
              {userDocument ? (
                <h1>{userDocument.name + "'s Garden"}</h1>
              ) : (
                <h1>{name}</h1>
              )}
            </div>
            <Image
              src="/images/sun.svg"
              width="35"
              height="35"
              className="hidden"
            />
          </div>
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
