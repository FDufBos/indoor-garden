import Head from "next/head";
import Router from "next/router";
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
import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";

import { useUserAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export default function ProfilePage({}) {
  const { user, userDocument, uploadProfilePic, photoURL, setPhotoURL, name } =
    useUserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    Router.push("/");
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
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
    uploadProfilePic(selectedImage, user, setLoading)
      .then(() => {
        onClose();
    })
      .then(() => {
        setPhotoURL(URL.createObjectURL(selectedImage));
      })
      .then(() => {
        setSelectedImage(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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
      <Flex direction="column" align="center" gap="16px">
        <Avatar
            src={photoURL}
            icon={<SkeletonCircle size="12" />}
            onClick={onOpen}
            cursor="pointer"
          ></Avatar>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <form onSubmit={handlePhotoURLSubmit}>
            <ModalContent>
              <ModalCloseButton />

              <ModalHeader>Set Profile Pic</ModalHeader>

              <ModalBody>
                {/* {selectedImage && (
                  <div>
                    <img
                      alt="not found"
                      width={"80px"}
                      src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>
                      Remove
                    </button>
                  </div>
                )} */}
                <FormLabel>URL</FormLabel>

                <Input
                  type="file"
                  name="profile-pic"
                  onChange={handleChange}
                  accept="image/*"
                ></Input>
              </ModalBody>
              <ModalFooter className="flex gap-1">
                {/* <Button onClick={onClose}>Set image</Button> */}
                <Button disabled={loading || !selectedImage} type="submit" colorScheme="green">
                  Set Image
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
        <Heading as="h1" size="md">
          {name}
        </Heading>
      </Flex>
    </div>
  );
}
