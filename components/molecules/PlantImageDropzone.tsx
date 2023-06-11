import {
  arrayUnion,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const storage = getStorage();
const db = getFirestore();

const PlantImageDropzone = ({
  userId,
  plantId,
  setUploadedImages,
}): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleImageUpload = (
    userId: string,
    plantId: string,
    imageFile: File,
    onUploadSuccess: (downloadURL: string) => void
  ): void => {
    const uniqueImageName = `${Date.now()}-${imageFile.name}`;
    const imagePath = `users/${userId}/plants/${plantId}/${uniqueImageName}`;
    const thumbnailPath = `${imagePath}+_100x100.webp`;
    // eslint-disable-next-line no-console
    console.log(thumbnailPath);

    const storageRef = ref(storage, imagePath);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const plantRef = doc(db, `users/${userId}/garden`, plantId);
        await updateDoc(plantRef, {
          images: arrayUnion({
            url: downloadURL,
            // thumbnail: thumbnailURL,
            timestamp: Timestamp.now(),
          }),
        });
        setUploadComplete(true);
        setUploading(false);
        onUploadSuccess(downloadURL); // Call the callback function with the new image URL
      }
    );
    const thumbnailURL = getDownloadURL(ref(storage, thumbnailPath));
    // eslint-disable-next-line no-console
    console.log(thumbnailURL);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        handleImageUpload(userId, plantId, file, (downloadURL) => {
          setUploadedImages((prevImages) => [...prevImages, downloadURL]);
        });
      });
    },
    [userId, plantId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragOver: () => {
      setDragOver(true);
    },
    onDragLeave: () => {
      setDragOver(false);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full cursor-pointer p-3 ${
        dragOver ? "bg-white bg-opacity-50" : ""
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image files here...</p>
      ) : (
        <p className="text-center">
          Drag and drop an image file here, or click to select a file
        </p>
      )}
      {uploading ? (
        <div className="border-1 border-white rounded">
          <div
            className="bg-water-100 h-3 rounded"
            style={{ width: `${progress}%`, transition: "width 1s" }}
          />
        </div>
      ) : null}
      {uploadComplete ? (
        <div className="text-monstera-800 font-semibold text-lg rounded p-2 m-2 flex items-center justify-center">
          <p className="">Upload complete!</p>
        </div>
      ) : null}
    </div>
  );
};

export default PlantImageDropzone;
