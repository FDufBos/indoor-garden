import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonCircle,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
// Framer Import
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";

import { useUserAuth } from "../../contexts/AuthContext";
import { db } from "../../utils/firebaseUtils";
import Settings from "./settings";

// Framer Animation Variants
const variants = {
  hidden: { x: "-30%", opacity: 0 },
  enter: {
    x: "0px",
    opacity: 1,
    transition: { ease: "circOut", duration: 0.3 },
  },
  exit: {
    x: "-20%",
    opacity: 0,
    transition: { ease: "easeIn", duration: 0.3 },
  },
};

export const ProfilePage: React.FC = () => {
  const {
    user,
    userDocument,
    uploadProfilePic,
    photoURL,
    setPhotoURL,
    name,
    updateUserPassword,
    setHiddenAnimation,
  } = useUserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailButtonEnabled, setEmailButtonEnabled] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleHomeClick = (e): void => {
    e.preventDefault();
    setHiddenAnimation("hiddenLeft");
    Router.push("/garden");
  };

  const handleChange = (e): void => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleEmailInputChange = (e): void => {
    if (e.target.value) {
      setEmailButtonEnabled(false);
    }
  };

  const handlePasswordChange = (e): void => {
    if (e.target.value) {
      setEmailButtonEnabled(false);
    }
  };

  const handlePasswordChangeSubmit = (e): void => {
    e.preventDefault();
    updateUserPassword(e.target.password.value);
    e.target.reset();
  };

  const handleEmailChange = async (e): Promise<void> => {
    e.preventDefault();
    // get the new email
    // get the value from the form input called email
    const newEmail = e.target.email.value;

    const docRef = doc(db, "users", user.uid);
    if (newEmail !== userDocument.email) {
      await updateEmail(user, newEmail)
        .then(async () => {
          await Router.push("/");
        })
        .then(async () => {
          await updateDoc(docRef, {
            email: newEmail,
          });
        })
        .catch((error) => {
          throw Error(error);
        });
    }
  };

  const handleSettingsOpen = (e): void => {
    e.preventDefault();
    setSettingsOpen(true);
  };

  useEffect(() => {
    if (photoURL) {
      setPhotoURL(photoURL);
    } else if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    } else {
      setPhotoURL(null);
    }
  }, [photoURL, setPhotoURL, user]);

  const handlePhotoURLSubmit = async (e): Promise<void> => {
    e.preventDefault();
    try {
      await uploadProfilePic(selectedImage, user, setLoading)
        .then(() => {
          onClose();
        })
        .then(() => {
          setPhotoURL(URL.createObjectURL(selectedImage));
        })
        .then(() => {
          setSelectedImage(null);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  if (!userDocument) {
    // TODO: Eventually this should be replace by pre-populating the data using getServerSideProps
    return <div>Loading</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      <Head>
        <title> {userDocument?.name} | Indoor Garden</title>
        <meta name="description" content="An Indoor Garden for Ya" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5C8B57" />
        <link rel="apple-touch-icon" href="/images/app_icons/icon.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#5C8B57" />
      </Head>
      {settingsOpen ? (
        <Settings
          setSettingsOpen={(value: boolean) => setSettingsOpen(value)}
        />
      ) : null}
      <nav className="flex justify-between mx-6 py-6">
        <button onClick={handleSettingsOpen}>
          <SettingsIcon boxSize="1.2rem" focusable color="white" />
        </button>
        <button onClick={handleHomeClick}>
          <ChevronRightIcon boxSize="2rem" focusable color="white" />
        </button>
      </nav>
      <Flex direction="column" align="center" gap="16px" marginX="6">
        <Tooltip label="Set Profile Image" placement="top" openDelay={400}>
          <Avatar
            src={photoURL}
            icon={<SkeletonCircle isLoaded={loading} size="12" />}
            onClick={onOpen}
            cursor="pointer"
            size="lg"
          />
        </Tooltip>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedImage(null);
          }}
        >
          <ModalOverlay />
          <form onSubmit={handlePhotoURLSubmit}>
            <ModalContent bg="#FCFEF8" color="#606F73" borderRadius={8}>
              <ModalCloseButton />

              <ModalHeader>Set Profile Pic</ModalHeader>

              <ModalBody>
                {selectedImage && (
                  <div className="flex flex-col justify-center items-center mb-8">
                    <Image
                      alt="Not found"
                      width="250px"
                      height="250px"
                      src={URL.createObjectURL(selectedImage)}
                      className="rounded-full shadow-md w-28 h-28"
                    />
                    <br />
                  </div>
                )}
                <FormLabel
                  p={8}
                  cursor="pointer"
                  bg="#FFF3B7"
                  border="5px dotted #FAD042"
                  textAlign="center"
                  className="hover:scale-[99%] transition-all"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files[0]) {
                      setSelectedImage(e.dataTransfer.files[0]);
                    }
                  }}
                >
                  <Input
                    type="file"
                    name="profile-pic"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  Browse
                  <br /> or <br />
                  drag and drop a file
                </FormLabel>
              </ModalBody>
              <ModalFooter className="flex gap-1">
                <Button
                  isLoading={loading}
                  disabled={loading || !selectedImage}
                  type="submit"
                  colorScheme="green"
                >
                  Set Image
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
        <Heading as="h1" size="lg">
          {userDocument ? userDocument.name : name}
        </Heading>
        <div className="flex flex-col gap-8 mt-6">
          <form
            onSubmit={handleEmailChange}
            className="flex flex-wrap items-center md:gap-4 justify-between"
          >
            <FormLabel color="#FCFEF8">Email:</FormLabel>
            <div className="flex gap-2">
              <Input
                required
                id="email"
                name="email"
                type="email"
                placeholder={user?.email ? user.email : userDocument.email}
                onChange={handleEmailInputChange}
                color="#FFF3B7"
                className="placeholder:text-water-100 placeholder:opacity-70"
              />
              <Button disabled={emailButtonEnabled} type="submit">
                Submit
              </Button>
            </div>
          </form>
          <form
            onSubmit={handlePasswordChangeSubmit}
            className="flex flex-wrap items-center md:gap-4 justify-between"
          >
            <FormLabel color="#FCFEF8">Password:</FormLabel>
            <div className="flex gap-2">
              <Input
                required
                id="password"
                name="password"
                type="password"
                placeholder="•••••••••••••••"
                onChange={handlePasswordChange}
                color="#FFF3B7"
                className="placeholder:text-water-100 placeholder:opacity-70"
              />
              <Button disabled={emailButtonEnabled} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Flex>
    </motion.div>
  );
};
export default ProfilePage;
