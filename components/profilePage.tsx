import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Badge,
  Text,
  Highlight,
  Heading,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Switch,
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
} from "@chakra-ui/react";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../utils/firebaseUtils";
import { useUserAuth } from "../contexts/AuthContext";


import Head from "next/head";
import { ChevronRightIcon, SettingsIcon, CloseIcon } from "@chakra-ui/icons";
import Router, { useRouter } from "next/router";
import { useState, createContext } from "react";


export default function ProfilePage({ name, email, avatar }) {
  const { user, userDocument } = useUserAuth();
  
  const [photoURL, setPhotoURL] = useState("null");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleHomeClick = (e) => {
    e.preventDefault();
    Router.push("/");
  };

  const handlePhotoURLSubmit = async (e) => {
    e.preventDefault()
    //setDoc in firestore for user with avatarURL set to photoURL
    await updateDoc(doc(db, "users", user.uid), {
      avatarURL: photoURL,
    });
    onClose();
    console.log(photoURL);
    
  }

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
        <Avatar name={name} src={userDocument.avatarURL} onClick={onOpen} cursor="pointer"></Avatar>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <form onSubmit={handlePhotoURLSubmit}
          >
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Set Profile Pic</ModalHeader>

              <ModalBody>
                <FormLabel>
                  URL
                </FormLabel>
                <Input
                  name="photoURL"
                  onChange={(e) => {
                    setPhotoURL(e.target.value);
                  }}
                ></Input>
              </ModalBody>
              <ModalFooter className="flex gap-1">
                {/* <Button onClick={onClose}>Set image</Button> */}
                <Button type="submit" colorScheme="green">
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
