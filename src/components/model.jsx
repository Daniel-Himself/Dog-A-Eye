// Importing necessary libraries and components
import cv from "@techstark/opencv-js"; // OpenCV for JavaScript
import { toBlob } from "html-to-image";
import { InferenceSession, Tensor } from "onnxruntime-web"; // ONNX Runtime for web
import React, { useRef, useState } from "react";
import { WhatsappIcon } from "react-share";
import useLocalStorage from 'use-local-storage'; // Custom hook for using local storage
import "../style/model.css"; // Importing CSS
import { detectImage } from "../utils/detect"; // Utility function for image detection
import ThemeSwitcher from "./themeSwitcher";
import Instructions from "./instructions"; // Instructions component
import ImageDetector from "./imageDetector";
import Loader from "./loader"; // Loader component for loading state
import Header from "./header";
import ImageUpload from "./imageUpload";

const Model = () => {
  // Checking if the user's preferred color scheme is dark
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Using local storage to save the user's preferred theme
  const [theme, ] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');


  // Setting up state variables
  const [session, setSession] = useState(null); // Session for ONNX Runtime
  const [loading, setLoading] = useState("Loading OpenCV.js..."); // Loading state
  const [image, setImage] = useState(null); // Image to be detected
  const inputImage = useRef(null); // Reference to the input element for image upload
  const imageRef = useRef(null); // Reference to the image element
  const canvasRef = useRef(null); // Reference to the canvas element
  const [maxScore, setMaxScore] = useState(0); // Maximum score from detection
  const pub = process.env.PUBLIC_URL; // Public URL from environment variables
  const img = theme === 'light' ? pub + "/logo.png" : pub + "/LogoDarkMode.png";// Logo image URL


  // Configurations for the model and detection
  const modelName = "dogEye.onnx"; // Model file name
  const modelInputShape = [1, 3, 640, 640]; // Input shape for the model
  const topk = 100; // Top K results to consider
  const iouThreshold = 0.45; // Intersection over Union threshold for detection
  const scoreThreshold = 0.70; // Score threshold for detection

  // wait until opencv.js initialized
  cv["onRuntimeInitialized"] = async () => {
    // Creating session for ONNX Runtime
    setLoading("We will see you soon 👁️...");
    const [yolov8, nms] = await Promise.all([
      InferenceSession.create(`${process.env.PUBLIC_URL}/model/${modelName}`),
      InferenceSession.create(`${process.env.PUBLIC_URL}/model/nms-yolov8.onnx`),
    ]);

    // Warming up the model
    setLoading("Warming up model...");
    const tensor = new Tensor(
      "float32",
      new Float32Array(modelInputShape.reduce((a, b) => a * b)),
      modelInputShape
    );
    await yolov8.run({ images: tensor });

    setSession({ net: yolov8, nms: nms });
    setLoading(null);
  };

  // eslint-disable-next-line
  const handleLowlight = (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    fetch('/enhance-image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.blob())
      .then((imageBlob) => {
        // Convert the received image blob to a URL
        const imageUrl = URL.createObjectURL(imageBlob);

        // Update the state or DOM with the processed image
        imageRef.current.src = imageUrl; // set image source
        setImage(imageUrl);
      })
      .catch((error) => {
        console.error('Error processing image:', error);
      });
  };

  // Function to render thepopover content based on the detection score
  const renderPopoverContent = (score, threshold) => {
    // Logging the score and threshold
    console.log(score, threshold * 100);

    // If the score is above the threshold, render a message indicating a good image
    if (score >= threshold * 100) {
      // Share the image using the Web Share API
      const shareImage = async () => {
        try {
          const blob = await toBlob(imageRef.current);
          const filesArray = [new File([blob], "dog-eye.jpg", { type: "image/jpeg" })];
          const shareData = {
            files: filesArray,
          };
          await navigator.share(shareData);
        } catch (error) {
          console.error("Error sharing image:", error);
        }
      };

      return (
        <div className="share_pic">
          <h3>The Image is Good!</h3>
          <p>Click the button below to share it with the clinic</p>
          <div className="bottom-button-con">
            <button onClick={shareImage} className="share-icon">
              <WhatsappIcon size={32} round={true} />
            </button>
          </div>
        </div>
      );
    } else {
      // If the score is below the threshold, render a message indicating a bad image
      return (
        <div id="retake_pic">
          <h3> The Image is Not Clear Enough! </h3>
          <p>Please try again. Make sure the eye is well lit and centered in the frame</p>
          <Instructions />
          <button
            className="retake-button"
            onClick={() => {
              inputImage.current.click();
            }}
          >
            Retake an Image
          </button>
        </div>
      );
    }
  };

  // const [showPopover, setShowPopover] = useState(false); // State for showing the popover
    
    // Rendering the component
    return (
      <div className="Model" data-theme={theme}>
        <ThemeSwitcher />
        {loading && <Loader>{loading}</Loader>}
        {!loading && (
          <>
            <Header img={img} image={image}/>
            <ImageDetector
              imageRef={imageRef}
              canvasRef={canvasRef} 
              modelInputShape={modelInputShape}
              image={image}
              session={session}
              topk={topk}
              iouThreshold={iouThreshold}
              scoreThreshold={scoreThreshold}
              detectImage={detectImage}
              setMaxScore={setMaxScore}
            />
            <div className="btn-container">
              <ImageUpload
                inputImage={inputImage}
                imageRef={image}
                setImage={setImage}
                handleLowlight={handleLowlight}
              />
              {!image && (
                <button
                  onClick={() => {
                    inputImage.current.click();
                  }}
                >
                  Upload an Image
                </button>
              )}
              {image && renderPopoverContent(maxScore, scoreThreshold)}
            </div>
          </>
        )}
    </div>
  );
};
export default Model;
