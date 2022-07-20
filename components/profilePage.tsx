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
} from "@chakra-ui/react";
import Head from "next/head";
import { ChevronRightIcon, SettingsIcon, CloseIcon } from "@chakra-ui/icons";
import Router, { useRouter } from "next/router";


export default function ProfilePage({ name, email, avatar }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleHomeClick = (e) => {
    e.preventDefault();
    Router.push("/");
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
       
        <button onClick={onOpen}>
          <Tooltip label='Delete'>
            <SettingsIcon boxSize="1.2rem" focusable={true} color="white" />
          </Tooltip>
        </button>
        <button onClick={handleHomeClick}>
          <ChevronRightIcon boxSize="2rem" focusable={true} color="white" />
        </button>
      </nav>
      <Flex direction="column" align="center" gap="16px">
        <Avatar></Avatar>
        <Heading as="h1" size="md">
          {name}
        </Heading>
      </Flex>
    </div>
  );
}
