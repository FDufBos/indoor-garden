/* eslint-disable max-lines */
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useUserAuth } from "@main/contexts/AuthContext";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";

import { db } from "../utils/firebaseUtils";

// called for sendEmailVerification
const auth = getAuth();

export interface LoadingSpinnerProps {
  /** Should show the loading spinner */
  showLoadingSpinner: boolean;
  /** Set the loading spinner */
  setShowLoadingSpinner: (boolean) => void;
}

export interface ExitAnimationProps {
  /** The exit animation to use */
  exitAnimation: string;
  /** Set the exit animation */
  setExitAnimation: (string) => void;
}

export const SignUpButton: React.FC<LoadingSpinnerProps> = ({
  showLoadingSpinner,
  setShowLoadingSpinner,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp, name, setName } = useUserAuth();

  const handleSubmit = async (e): Promise<void> => {
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
            name,
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

export const SignInButton: React.FC<LoadingSpinnerProps> = ({
  showLoadingSpinner,
  setShowLoadingSpinner,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();

  const handleSubmit = async (e): Promise<void> => {
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
        setError("Wrong password - did you sign up with Google?");
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

            <ModalFooter className="flex gap-4">
              <Link href="/passwordreset" passHref>
                <p className="text-xs hover:underline cursor-pointer underline-offset-1 text-gray-800">
                  Forgot password?
                </p>
              </Link>
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

export const DesktopSidebarNav: React.FC<LoadingSpinnerProps & ExitAnimationProps> = ({
  setShowLoadingSpinner,
  showLoadingSpinner,
  setExitAnimation,
}) => {
  const { user, logOut, photoURL } = useUserAuth();
  const toast = useToast();
  const router = useRouter();

  const handleNewFormClick = async (e): Promise<void> => {
    if (user.emailVerified === false) {
      await sendEmailVerification(user);
      toast({
        title: "Please verify your email",
        position: "top",
        description: "Check your email for a verification link",
        status: "error",
        duration: 6000,
        isClosable: true,
        variant: "subtle",
        containerStyle: {
          width: "95vw",
          maxWidth: "900px",
        },
      });
      logOut();
    } else {
      e.preventDefault();
      router.push("/codex");
    }
  };

  return (
    <nav
      className="
    flex flex-col gap-4 items-center pt-[16px] 
    w-[200px] lg:w-[250px] border-r-[1px] border-water-100 
    min-h-full ml-6 transition-all duration-300 ease px-2"
    >
      <Link href="/profile" passHref>
        <div className="w-full flex justify-between">
          <div
            onClick={() => {
              setExitAnimation("exitLeft");
            }}
            id="profile-pic"
            className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer"
          >
            <Avatar w={10} h={10} src={photoURL} />
          </div>
          <Button
          id="exchange-button"
          className="drop-shadow-sm"
          borderRadius="999px"
          color=" #FCFEF8"
          bg = "none"
          
          isLoading={showLoadingSpinner}
          _hover={{
            border: "1px solid #FCFEF8",
            bg : "none"
          }}
          
          onClick={() => {
            setShowLoadingSpinner(true);
            setTimeout(() => {
              logOut();
              setShowLoadingSpinner(false);
            }, 400);
          }}
        >
          🚪
          <ArrowForwardIcon w={4} h={4} />
        </Button>
        </div>
      </Link>
      {user && user.emailVerified ? (
        <Button onClick={handleNewFormClick}  className="w-full">
          New Plant
        </Button>
      ) : (
        <Button onClick={handleNewFormClick} className="mx-6 mb-10">
          Verify email to add a plant
        </Button>
      )}
    </nav>
  );
};

export const LoginNav: React.FC<LoadingSpinnerProps> = ({
  showLoadingSpinner,
  setShowLoadingSpinner,
}) => (
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

export const SignOutNav: React.FC<LoadingSpinnerProps & ExitAnimationProps> = ({
  setShowLoadingSpinner,
  showLoadingSpinner,
  setExitAnimation,
}) => {
  const { logOut, photoURL } = useUserAuth();
  return (
    <nav
      id="explore"
      className=" flex flex-row justify-between items-center h-[40px] w-full"
    >
      <Link href="/profile" passHref>
        <div
          onClick={() => {
            setExitAnimation("exitLeft");
          }}
          id="profile-pic"
          className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer"
        >
          <Avatar w={10} h={10} src={photoURL} />
        </div>
      </Link>
      <div>
        <Button
          id="exchange-button"
          className="drop-shadow-sm"
          borderRadius="999px"
          isLoading={showLoadingSpinner}
          onClick={() => {
            setShowLoadingSpinner(true);
            setTimeout(() => {
              logOut();
              setShowLoadingSpinner(false);
            }, 400);
          }}
        >
          Log Out <ArrowForwardIcon w={4} h={4} />
        </Button>
        
      </div>
    </nav>
  );
};

export const Layout: React.FC<PropsWithChildren<ExitAnimationProps>> = ({
  children,
  exitAnimation,
  setExitAnimation,
}) => {
  const { user, userDocument, photoURL, setPhotoURL, name, getthreeUserIDs } =
    useUserAuth();

  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  useEffect(() => {
    if (photoURL) {
      setPhotoURL(photoURL);
    } else if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [photoURL, setPhotoURL, user]);

  return (
    <div className="text-white min-h-screen ">
      <div>
        <header className="pt-4 md:pt-0 mx-6 transition-all ease duration-300">
          <div className="flex flex-col-reverse gap-4 pb-4 md:hidden">
            <SignOutNav
              setShowLoadingSpinner={setShowLoadingSpinner}
              showLoadingSpinner={showLoadingSpinner}
              exitAnimation={exitAnimation}
              setExitAnimation={setExitAnimation}
            />
            <div
              id="title-area"
              className="flex flex-row justify-between items-end w-full"
            >
              <div className="flex flex-row items-baseline gap-3">
                {userDocument ? (
                  <h1>{`${userDocument.name}'s Garden`}</h1>
                ) : (
                  <h1>{name}</h1>
                )}
              </div>
              <Link href="/codex" passHref>
                <Image
                  src="/images/sun.svg"
                  width="35"
                  height="35"
                  className="hidden cursor-pointer"
                  alt="sun"
                />
              </Link>
            </div>
          </div>

        </header>
        <div className="md:flex">
          <div className="hidden md:block">
            <DesktopSidebarNav 
              setShowLoadingSpinner={setShowLoadingSpinner}
              showLoadingSpinner={showLoadingSpinner}
              setExitAnimation={setExitAnimation} 
              exitAnimation={exitAnimation}            
              />
          </div>
          {children}
        </div>
      </div>

      <footer className="w-full flex flex-col gap-4 mb-4 justify-center items-center">
        <div className="line w-full h-[1px] bg-white opacity-75" />
        <Button onClick={getthreeUserIDs}>Don&apos;t click</Button>
        👀👀
      </footer>
    </div>
  );
};

export default Layout;
/* eslint-enable max-lines */
