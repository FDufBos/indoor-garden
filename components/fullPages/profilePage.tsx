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
  Editable,
  EditablePreview,
  EditableInput,
  IconButton,
  ButtonGroup,
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
import { auth, db, storage } from "../../utils/firebaseUtils";

import { ChevronRightIcon, SettingsIcon, CheckIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import { updateEmail } from "firebase/auth";

import { useUserAuth } from "../../contexts/AuthContext";
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

  const handleEmailChange = async (e) => {
    console.log(e)
    const docRef = doc(db, "users", user.uid);
    if (e != userDocument.email) {
      await updateDoc(docRef, {
        email: e,
      }).then(() => {console.log("doc updated");});
      
      updateEmail(user, e)
        .then(async () => {
          console.log("new email is: " + user.email);
          Router.push("/");
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
        <Editable
          defaultValue={user?.email ? user.email : userDocument.email}
          
          onSubmit={handleEmailChange}
        >
          <div className="flex items-center gap-4">
            <FormLabel color="#FCFEF8">Email:</FormLabel> 
            <Input as={EditablePreview} w={80} color="#FCFEF8" position="relative" />
            <Input name="email" as={EditableInput} w={80} color="#FFF3B7" />
            <Button
              aria-label="Submit"
              // icon={<ChevronRightIcon />}
              // onSubmit={e => {e.preventDefault()
              //   handleEmailChange(e)
              // }}
              type="submit"
            >Submit</Button>
          </div>
        </Editable>
        
      </Flex>
    </div>
  );
}