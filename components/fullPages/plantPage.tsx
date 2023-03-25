import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { GardenItem, Plant } from "@main/common-types";
import { arrayUnion, doc, getFirestore, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "react-query";

import { useUserAuth } from "../../contexts/AuthContext";
import { deletePlant } from "../../data/firestore";

// const auth = getAuth()

const variants = {
  hidden: { x: "30%", opacity: 0 },
  enter: {
    x: "0px",
    opacity: 1,
    transition: { ease: "circOut", duration: 0.3 },
  },
  exit: { x: "20%", opacity: 0, transition: { ease: "easeIn", duration: 0.3 } },
};

const storage = getStorage();
const db = getFirestore();

const PlantImageDropzone = ({ userId, plantId }): JSX.Element => {
  // const [imageUrls, setImageUrls] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const handleImageUpload = async (
    userId: string,
    plantId: string,
    imageFile: File
  ): Promise<void> => {
    const uniqueImageName = `${Date.now()}-${imageFile.name}`;
    const imagePath = `users/${userId}/plants/${plantId}/${uniqueImageName}`;

    const storageRef = ref(storage, imagePath);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    await uploadTask.on(
      "state_changed",
      // (snapshot) => {
      //   // You can display the upload progress here, e.g., using snapshot.bytesTransferred and snapshot.totalBytes
      // },
      // (error) => {
      //   // Handle upload errors here
      // },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Save the image URL to Firestore
        const plantRef = doc(db, `users/${userId}/garden`, plantId);
        await setDoc(
          plantRef,
          { images: arrayUnion(downloadURL) },
          { merge: true }
        );
        queryClient.invalidateQueries(`users/${userId}/garden`);
      }
    );
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        handleImageUpload(userId, plantId, file);
      });
    },
    [userId, plantId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{ border: "1px dashed gray", padding: "16px" }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image files here...</p>
      ) : (
        <p className="text-center">Drag and drop an image file here, or click to select a file</p>
      )}
    </div>
  );
};

export const PlantPage: React.FC<Partial<GardenItem & Plant>& { 
/** plantId : ID of plant from router */
plantId, 
/** user ID */
user: string;  }> = ({
  nickname,
  commonName,
  icon,
  level,
  timeTillNextWater,
  // wateringStreak,
  sunExposure,
  baseDaysBetweenWatering,
  soilType,
  bloomTime,
  plantId,
  images,
}) => {
  const { user, setFirestorePlants, firestorePlants } = useUserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();


  const handleHomeClick = (e): void => {
    e.preventDefault();
    Router.push("/garden");
  };

  const codexItems = [
    {
      title: "Name",
      value: commonName,
    },
    {
      title: "Sun Exposure",
      value: sunExposure,
    },
    {
      title: "Days between watering",
      value: baseDaysBetweenWatering,
    },
    {
      title: "Soil Type",
      value: soilType,
    },
    {
      title: "Bloom Time",
      value: bloomTime,
    },
  ];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      <Head>
        <title>{nickname} | Indoor Garden</title>
        <meta name="description" content="An Indoor Garden for Ya" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <nav className="flex justify-between mx-6 py-6">
        <button onClick={handleHomeClick}>
          <ChevronLeftIcon boxSize="2rem" focusable color="white" />
        </button>
        <button onClick={onOpen}>
          <Tooltip label="Delete" openDelay={400} rounded="full">
            <CloseIcon boxSize="1rem" focusable color="white" />
          </Tooltip>
        </button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Delete Plant</ModalHeader>
            <ModalBody>Are you sure you want to delete this plant?</ModalBody>
            <ModalFooter className="flex gap-1">
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={() => {
                  onClose();
                  deletePlant(router.query.name, user.uid);
                  setFirestorePlants(
                    firestorePlants.filter(
                      (plant) => plant.nickname !== nickname
                    )
                  );
                  Router.push("/");
                }}
                colorScheme="red"
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </nav>
      <div className="md:w-1/2">
        <header
          id="plant-info"
          className="relative bottom-4 flex mx-6 flex-col gap-3 justify-between items-center mb-6"
        >
          <div
            id="image-circle"
            className="bg-white relative w-20 h-20 rounded-full drop-shadow flex flex-col justify-center items-center"
          >
            <div id="plant-image" className="text-5xl text-center">
              {icon}
            </div>
            <div
              id="image-label"
              // eslint-disable-next-line max-len
              className="absolute bottom-0 right-0 flex items-center justify-center bg-water-100 h-8 w-8 rounded-full drop-shadow text-grey-600 font-[690]"
            >
              {level}
            </div>
          </div>
          <div id="titles" className="flex flex-col items-center">
            <h1 className="font-flexa">{nickname}</h1>
            <h2 className="text-white">{commonName}</h2>
            {/* <h3>{botanicalName}</h3> */}
          </div>
          <div className="flex flex-col items-center text-water-100 gap-0">
            {/* TODO: the timeTillNextWater and wateringStreak numbers are not showing up */}
            <div>💧 Water in {timeTillNextWater} days</div>
            {/* <div>🔥 Streak is {wateringStreak} days long</div> */}
          </div>
          <div
            id="plant-properties"
            className="flex justify-center text-sm gap-2 w-full mt-2 text-center h-[100%]"
          >
            <div className="flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-md w-full py-[8px] text-md leading-[110%]">
              Living Room
            </div>
            <div className="flex items-center justify-center bg-sun-100 text-amber-600 rounded-md w-full py-[8px] text-md leading-[110%]">
              {sunExposure}
            </div>
            <div className="flex items-center justify-center bg-sky-100 text-sky-600 rounded-md w-full py-[8px] text-md leading-[110%]">
              Water every {baseDaysBetweenWatering} days
            </div>
          </div>
        </header>
        <section id="memory-lane" className="flex flex-col gap-1 mx-6">
          <div
            id="above-the-divider"
            className="flex justify-between items-baseline"
          >
            <h1>Memory Lane</h1>
            <h2 className="text-water-100 font-alpina">View More</h2>
          </div>
          <hr />
          <div
            className="w-full h-full border border-water-100 
            border-dashed rounded-sm flex justify-center items-center text-white
             bg-slate-50 bg-opacity-25"
          >
            <PlantImageDropzone userId={user.uid} plantId={plantId} />
          </div>
          <div id="recent-plant-pics" className="mt-1">
            <div className="flex flex-wrap gap-[4px]">
              {images &&
                images.map((link, index) => (
                  <div
                    key={index}
                    className={`bg-image-${index}`}
                    style={{ width: "24%", paddingBottom: "25%" }}
                  />
                ))}
            </div>
            <style>
              {images &&
                images.map(
                  (link, index) => `
                    .bg-image-${index} {
                      background-image: url(${link});
                      background-size: cover;
                      background-position: center;
                    }
                  `
                )}
            </style>
          </div>
        </section>
        <section
          id="codex"
          className="bg-white h-96 min-h-screen  mt-8 mx-2 px-4 pt-4 rounded-xl rounded-b-none md:absolute md:top-8 md:left-1/2 md:w-[48%]"
        >
          <h1 className="text-monstera-400 text-lg font-bold">Codex</h1>
          <hr className="bg-monstera-400 h-[1px] " />

          {codexItems &&
            codexItems.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between">
                  <h2 className="text-monstera-400 font shrink-0">
                    {item.title}
                  </h2>
                  <div className="relative bottom-[6px] mx-2 w-full border-t-2 border-monstera-300 border-dotted shrink self-end" />
                  <h2 className="text-monstera-400 font-semibold shrink-0">
                    {item.value}
                  </h2>
                </div>
              </div>
            ))}
        </section>
      </div>
    </motion.div>
  );
};
export default PlantPage;
