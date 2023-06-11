import { CloseIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const ImageModal = ({
  imageUrl,
  onClose,
  uploadedImages,
  selectedImageIndex,
  setSelectedImageIndex,
}): JSX.Element => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [modalPosition, setModalPosition] = useState(0);
  const uploadedImagesRef = useRef([]);
  const thumbnailContainerRef = useRef(null);

  const centerThumbnail = useCallback((index: number): void => {
    const thumbnailElement = uploadedImagesRef.current[index];
    const thumbnailContainer = thumbnailContainerRef.current;
    if (thumbnailElement && thumbnailContainer) {
      const toCenter =
        thumbnailElement.getBoundingClientRect().left -
        (thumbnailElement.offsetWidth / 2 - 100) -
        window.innerWidth / 2;
      thumbnailContainer.scrollLeft += toCenter;
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleImageClick = useCallback(
    (index: number): void => {
      setSelectedImageIndex(index);
      centerThumbnail(index);
    },
    [setSelectedImageIndex, centerThumbnail]
  );

  const modalVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: "5%" },
    visible: { opacity: 1, y: "0%" },
  };

  useEffect(() => {
    const handleKeyDown = (event): void => {
      switch (event.key) {
        case "ArrowLeft": {
          // Navigate to the previous image
          const prevIndex = selectedImageIndex - 1;
          if (prevIndex >= 0) {
            setSelectedImageIndex(prevIndex);
            centerThumbnail(prevIndex);
          }
          break;
        }
        case "ArrowRight": {
          // Navigate to the next image
          const nextIndex = selectedImageIndex + 1;
          if (nextIndex < uploadedImages.length) {
            setSelectedImageIndex(nextIndex);
            centerThumbnail(nextIndex);
          }
          break;
        }
        default:
          break;
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedImageIndex,
    setSelectedImageIndex,
    centerThumbnail,
    uploadedImages.length,
  ]);

  const handleImageLoad = (): void => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    setModalPosition(window.scrollY);
  }, []);

  useEffect(() => {
    centerThumbnail(selectedImageIndex);
  }, [selectedImageIndex, centerThumbnail]);

  return (
    <motion.div
      style={{ top: `${modalPosition}px` }}
      className="fixed z-50 left-0 w-full h-screen bg-white overflow-hidden grid grid-cols-1 grid-rows-[1fr_50px] gap-x-6 gap-y-0"
      variants={modalVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="absolute top-0 right-0 p-4 z-10 cursor-pointer">
        <CloseIcon
          boxSize="1rem"
          focusable
          color="gray.800"
          onClick={onClose}
        />
      </div>
      {!isImageLoaded && (
        <div className="flex items-center justify-center h-full max-h-96">
          <Spinner color="gray.500" />
        </div>
      )}

      <motion.img
        className={`mx-auto row-span-1 h-full overflow-y-hidden p-8 md:px-48 lg:px-96 ${
          !isImageLoaded ? "hidden" : ""
        }`}
        src={imageUrl}
        alt="Full version of the thumbnail"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
        onClick={onClose}
        onLoad={handleImageLoad}
      />
      <div
        ref={thumbnailContainerRef}
        className="flex flex-nowrap px-1/2 overflow-x-hidden overflow-y-hidden h-[50px] w-auto cursor-grab select-none"
      >
        {uploadedImages &&
          uploadedImages
            .slice(0)
            .reverse()
            .map((imageURL: string, index: number) => (
              <div
                key={index}
                ref={(el) => {
                  uploadedImagesRef.current[index] = el;
                }}
                className={`h-24 flex-shrink-0 flex transition-all duration-400 ease justify-center select-none ${
                  index === selectedImageIndex
                    ? "w-12 ml-[16px] mr-[16px]"
                    : "w-6 ml-[1px] mr-[1px]"
                }`}
              >
                <Image
                  key={index}
                  className={`object-cover object-center h-full select-none ${
                    index === selectedImageIndex ? "w-full" : "w-full"
                  }`}
                  src={imageURL}
                  alt="Thumbnail"
                  width={index === selectedImageIndex ? "50" : "25"}
                  height="100"
                  quality="30"
                  onClick={() => {
                    handleImageClick(index);
                  }}
                  draggable="false"
                />
              </div>
            ))}
      </div>
    </motion.div>
  );
};

export default ImageModal;
