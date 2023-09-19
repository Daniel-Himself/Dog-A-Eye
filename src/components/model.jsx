// Importing necessary libraries and components
import React, { useState, useRef, useEffect } from "react";
import cv from "@techstark/opencv-js"; // OpenCV for JavaScript
import { Tensor, InferenceSession } from "onnxruntime-web"; // ONNX Runtime for web
import Loader from "./loader"; // Loader component for loading state
import { detectImage } from "../utils/detect"; // Utility function for image detection
import Instructions from "./instructions"; // Instructions component
import "../style/model.css"; // Importing CSS
import useLocalStorage from 'use-local-storage'; // Custom hook for using local storage
import { toBlob } from "html-to-image";
import { WhatsappIcon } from "react-share";

// import ReactWhatsapp from "react-whatsapp";


const sendImageToServer = async (imageBlob) => {
    const formData = new FormData();
    formData.append('image', imageBlob);

    try {
        const response = await fetch('YOUR_SERVER_ENDPOINT_URL', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Image successfully sent to the server');
        } else {
            console.error('Failed to send image', response.statusText);
        }
    } catch (error) {
        console.error('Error sending image:', error);
    }
};

const Model = () => {
  // Checking if the user's preferred color scheme is dark
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Using local storage to save the user's preferred theme
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  //-------------------------------------------------
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--background', '#17263f');
    } else {
      document.documentElement.style.setProperty('--background', 'white');
    }
  }, [theme]);
  //-------------------------------------------------

  // Function to switch between light and dark themes
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // funcition to refresh the page
  const refresh = () => {
    window.location.reload();
  };

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

  const lowlight = (image, {
    luminocityThreshold = 50,       // Mean saturation level for enhancement decision
    claheClipLimit = 40,            // Contrast for adaptive histogram equalization
    claheTileSize = 8,              // Size of the region for histogram equalization
    brightnessBoost = 0             // Adjust overall brightness
  } = {}) => {

    // Convert the image to the HSV color space to calculate mean saturation
    let hsvImage = new cv.Mat();
    cv.cvtColor(image, hsvImage, cv.COLOR_BGR2HSV);

    // Split the H, S, V channels
    let hsvChannels = new cv.MatVector();
    cv.split(hsvImage, hsvChannels);

    // Calculate mean saturation
    let meanLuminocity = cv.mean(hsvChannels.get(2))[0];

    hsvImage.delete();
    hsvChannels.delete();

    if (meanLuminocity >= luminocityThreshold) {
      return image; // return the original image if mean saturation is above the threshold
    }

    // Convert the image to the LAB color space for enhancement
    let labImage = new cv.Mat();
    cv.cvtColor(image, labImage, cv.COLOR_BGR2Lab);

    // Split the L, a, b channels
    let labChannels = new cv.MatVector();
    cv.split(labImage, labChannels);

    // Adjust brightness if required
    if (brightnessBoost !== 0) {
      labChannels.get(0).convertTo(labChannels.get(0), -1, 1, brightnessBoost);
    }

    // Apply adaptive histogram equalization to the L channel
    let clahe = new cv.CLAHE(claheClipLimit, new cv.Size(claheTileSize, claheTileSize));
    clahe.apply(labChannels.get(0), labChannels.get(0));
    clahe.delete();

    // Merge the channels back
    cv.merge(labChannels, labImage);

    // Convert the image back to the BGR color space
    let enhancedImage = new cv.Mat();
    cv.cvtColor(labImage, enhancedImage, cv.COLOR_Lab2BGR);

    labImage.delete();
    labChannels.delete();

    return enhancedImage;
  }




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
        <div className="center">
          <div id="retake_pic">
            <h3> The Image is Not Clear Enough! </h3>
            <p>Please try again. Make sure the eye is well lit and centered in the frame</p>
            <button
              className="retake-button"
              onClick={() => {
                inputImage.current.click();
              }}>Retake an Image</button>
            <Instructions />
          </div>
        </div>
      );
    }
  };

  // Rendering the component
  return (

    <div className="Model" data-theme={theme}>


      <div className="theme-button">
        <button onClick={switchTheme}>
          {theme !== 'light' ? '☀️' : '🌙'}
        </button>
        <button onClick={refresh}>🔄 Start Over
        </button>
      </div>


      {loading && <Loader>{loading}</Loader>}
      {!loading ?
        <div className="header">
          <img src={img} alt="Logo" className="logo" />
          <h1>Dog-A-Eye Assistant</h1>
        </div> : ""}






      {!loading ? <div className="content">
        <img
          ref={imageRef}
          src="#"
          alt=""
          style={{ display: image ? "block" : "none" }}
          onLoad={async () => {
            // When the image is loaded, run the detection
            let score = await detectImage(
              imageRef.current,
              canvasRef.current,
              session,
              topk,
              iouThreshold,
              scoreThreshold,
              modelInputShape
            );
            setMaxScore(score);
          }}
        />
        <canvas
          id="canvas"
          width={modelInputShape[2]}
          height={modelInputShape[3]}
          ref={canvasRef}
        />
      </div> : ""}

      {!loading ? <div className="btn-container">

        <p className="please">Please upload an image of your dog's eye 👁️</p>
        {!image && (
          <button
            className="primary-button"
            onClick={() => {
              inputImage.current.click();
            }}
          >
            Upload an Image
          </button>
        )}
        {!image ? <Instructions /> : ""}
        {image && renderPopoverContent(maxScore, scoreThreshold)}
      </div> : ""}

      {!loading ? <input
        type="file"
        ref={inputImage}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const imageUrl = URL.createObjectURL(file);

            // Load the image using JavaScript's Image object
            let tempImage = new Image();
            tempImage.src = imageUrl;
            tempImage.onload = () => {
              // Create a temporary canvas to draw the uploaded image
              let tempCanvas = document.createElement('canvas');
              tempCanvas.width = tempImage.width;
              tempCanvas.height = tempImage.height;
              let ctx = tempCanvas.getContext('2d');
              ctx.drawImage(tempImage, 0, 0, tempImage.width, tempImage.height);

              // Read the image into OpenCV
              let image = cv.imread(tempCanvas);

              const enhancedImage = lowlight(image, {
                claheClipLimit: 15,
                claheTileSize: 1,
                brightnessBoost: 20}); // Enhancing image using the lowlight function

              // Convert the enhanced OpenCV image to a data URL
              cv.imshow(tempCanvas, enhancedImage);
              const enhancedImageUrl = tempCanvas.toDataURL('image/png');

              imageRef.current.src = enhancedImageUrl;
              setImage(enhancedImageUrl);

              // Clean up
              try {
                image.delete();
                enhancedImage.delete();
              } catch (error) {
                console.log(error);
              }
            };
          }
        }}

      /> : ""}


    </div>
  );
};

export default Model;
