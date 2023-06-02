import React, { useState, useRef } from "react";
import cv from "@techstark/opencv-js";
import { Tensor, InferenceSession } from "onnxruntime-web";
import Loader from "./loader";
import { detectImage } from "../utils/detect";
import Instructions from "./instructions";
import "../style/model.css";
import useLocalStorage from 'use-local-storage'


const Model = () => {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState("Loading OpenCV.js...");
  const [image, setImage] = useState(null);
  const inputImage = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [maxScore, setMaxScore] = useState(0);
  const pub = process.env.PUBLIC_URL;
  const img = pub + "/logo.png";

  // Configs
  const modelName = "dogEye.onnx";
  const modelInputShape = [1, 3, 640, 640];
  const topk = 100;
  const iouThreshold = 0.45;
  const scoreThreshold = 0.70;

  // wait until opencv.js initialized
  cv["onRuntimeInitialized"] = async () => {
    // create session
    setLoading("We will see you soon 👁️...");
    const [yolov8, nms] = await Promise.all([
      InferenceSession.create(`${process.env.PUBLIC_URL}/model/${modelName}`),
      InferenceSession.create(`${process.env.PUBLIC_URL}/model/nms-yolov8.onnx`),
    ]);

    // warmup main model
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

  // Function to render the content of the popover
  const renderPopoverContent = (score, threshold) => {
    // Conditionally render different components or messages based on the detection score
    // For example, you can return different components based on the score threshold
    console.log(score, threshold * 100);
    if (score >= threshold * 100) {
      return (
        <div id="share_pic">
          <h3> The Image is Good!</h3>
          <p>Click the button below to share it with the clinic</p>
          <button className="share-button">
            <i className="fas fa-envelope" /> Share
          </button>
        </div>
      );
    } else {
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

  return (
    <div className="Model" data-theme={theme}>
      <div class="theme-button">
        <button onClick={switchTheme}>
          {theme !== 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      {loading && <Loader>{loading}</Loader>}
      <div className="header">
      <img src={img} alt="Logo" className="logo" />
        <h1>Dogo-A-Eye Assistant</h1>
        {!image ? <Instructions /> : ""}
        <p>Please upload an image of your dog's eye</p>
      </div>

      <div className="content">
        <img
          ref={imageRef}
          src="#"
          alt=""
          style={{ display: image ? "block" : "none" }}
          onLoad={async () => {
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
      </div>

      <input
        type="file"
        ref={inputImage}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          // handle next image to detect
          if (image) {
            URL.revokeObjectURL(image);
            setImage(null);
          }

          const url = URL.createObjectURL(e.target.files[0]); // create image url
          imageRef.current.src = url; // set image source
          setImage(url);
        }}
      />
      <div className="btn-container">
        {!image && (
          <button
            className="upload-button"
            onClick={() => {
              inputImage.current.click();
            }}
          >
            Upload an Image
          </button>
        )}
        {image && renderPopoverContent(maxScore, scoreThreshold)}
      </div>
    </div>
  );
};

export default Model;
