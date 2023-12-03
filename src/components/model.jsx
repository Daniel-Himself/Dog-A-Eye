// Importing necessary libraries and components
import React, { useState, useRef} from "react";
import cv from "@techstark/opencv-js"; // OpenCV for JavaScript
import { Tensor, InferenceSession } from "onnxruntime-web"; // ONNX Runtime for web
import Loader from "./loader"; // Loader component for loading state
import { detectImage } from "../utils/detect"; // Utility function for image detection
import Instructions from "./instructions"; // Instructions component
import "../style/model.css"; // Importing CSS
// import useLocalStorage from 'use-local-storage'; // Custom hook for using local storage
// import { toBlob } from "html-to-image";
// import { WhatsappIcon } from "react-share";
import useTheme from "./useTheme"
import processImage from "../utils/imageProcessing";
import DetectionFeedback from "./detection";


const SessionManager = ({switchTheme, theme}) => {
  const refresh = () => {
    window.location.reload();
  };
  return (
    <div className="theme-button">
      <button onClick={switchTheme}>
        {theme !== 'light' ? '☀️' : '🌙'}
      </button>
      <button onClick={refresh}>
        🔄 Start Over
      </button>
    </div>
  )
}

const ImageUploader = ({ onImageUpload, inputImage }) => (
  <input type="file" ref={inputImage} accept="image/*"
  style={{ display: "none" }}
  onChange={onImageUpload} />
);

const Model = () => {
  
  // Setting up state variables
  const [theme, switchTheme] = useTheme()
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

  // Rendering the component
  return (

    <div className="Model" data-theme={theme}>
      <SessionManager theme={theme} switchTheme={switchTheme}/>
      {loading && <Loader/>}
      {!loading ?
        <div className="header">
          <img src={img} alt="Logo" className="logo" />
          <h1>Dog-A-Eye Assistant</h1>
        </div> : ""}
      {(!image && !loading) && <p className="please">Please upload an image of your dog's eye 👁️</p>}
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
        {image && <DetectionFeedback 
          inputImage={inputImage} imageRef={imageRef} 
          score={maxScore} threshold={scoreThreshold}
        />}
        {/* {image && getDetectionFeedback(maxScore, scoreThreshold)} */}
      </div> : ""}

      {!loading ? <ImageUploader
        inputImage={inputImage}
        onImageUpload= {(e) => {
          const file = e.target.files[0];
          if (file) {
            processImage(file, setImage, imageRef)
          }
        }}

      /> : ""}
    </div>
  );
};

export default Model;
