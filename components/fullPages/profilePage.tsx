import Head from "next/head";
import Router from "next/router";
import Image from "next/image";
import {
  Avatar,
  Heading,
  Flex,
  useDisclosure,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  SkeletonCircle,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../utils/firebaseUtils";

import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import { updateEmail } from "firebase/auth";

import { useUserAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";

//Framer Import
import { motion } from "framer-motion";

  //Framer Animation Variants
  const variants = {
    hidden: { x: "-20px", opacity: 0 },
    enter: { x: "0px", opacity: 1 },
    exit: { x: "-100px", opacity: 0 },
  };

export default function ProfilePage({}) {
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

  const handleHomeClick = (e) => {
    e.preventDefault();
    setHiddenAnimation("hiddenLeft");
    Router.push("/garden");
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleEmailInputChange = (e) => {
    if (e.target.value) {
      setEmailButtonEnabled(false);
    }
  };

  const handlePasswordChange = (e) => {
    if (e.target.value) {
      setEmailButtonEnabled(false);
    }
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    updateUserPassword(e.target.password.value);
    e.target.reset();
    console.log("success");
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    //get the new email
    //get the value from the form input called email
    const newEmail = e.target.email.value;
    console.log(newEmail);

    const docRef = doc(db, "users", user.uid);
    if (newEmail != userDocument.email) {
      updateEmail(user, newEmail)
        .then(async () => {
          console.log("new email is: " + user.email);
          Router.push("/");
        })
        .then(async () => {
          await updateDoc(docRef, {
            email: newEmail,
          }).then(() => {
            console.log("doc updated");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (photoURL) {
      setPhotoURL(photoURL);
    } else if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    } else {
      setPhotoURL(null);
    }
    
  }, [user]);

  const handlePhotoURLSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedImage);
    console.log(user);
    try {
      uploadProfilePic(selectedImage, user, setLoading)
        .then(() => {
          onClose();
        })
        .then(() => {
          setPhotoURL(URL.createObjectURL(selectedImage));
        })
        .then(() => {
          setSelectedImage(null);
        });
    } catch {
      (err) => {
        setLoading(false);
        console.log(err);
      };
    }
  };

  return (
    <motion.div
    variants={variants}
    initial="hidden"
    animate="enter"
    exit="exit"
    transition={{ type: "intertia" }}
    >
      <Head>
        <title>{name} | Indoor Garden</title>
        <meta name="description" content="An Indoor Garden for Ya" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5C8B57" />
        <link rel="apple-touch-icon" href="/images/app_icons/icon.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#5C8B57" />
      </Head>

      <nav className="flex justify-between mx-6 py-6">
        <button>
          <SettingsIcon boxSize="1.2rem" focusable={true} color="white" />
        </button>
        <button onClick={handleHomeClick}>
          <ChevronRightIcon boxSize="2rem" focusable={true} color="white" />
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
          ></Avatar>
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
                      width={"250px"}
                      height={"250px"}
                      src={URL.createObjectURL(selectedImage)}
                      className=" rounded-full shadow-md w-28 h-28"
                    />
                    <br />
                  </div>
                )}
                <FormLabel
                  p={8}
                  cursor="pointer"
                  bg="#FFF3B7"
                  border="5px dotted #FAD042"
                  textAlign={"center"}
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
                  ></Input>
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
              <Button
                disabled={emailButtonEnabled}
                type="submit"
                onClick={() => {
                  console.log("blick");
                }}
              >
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
              <Button
                disabled={emailButtonEnabled}
                type="submit"
                onClick={() => {
                  console.log("blick");
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Flex>
    </motion.div>
  );
}
