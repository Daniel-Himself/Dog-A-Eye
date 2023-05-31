import React, { useState, useRef, useEffect } from "react";
import { Tensor, InferenceSession } from "onnxruntime-web";
import Loader from "./components/loader";
import { detectImage } from "./utils/detect";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState("Loading OpenCV.js...");
  const [image, setImage] = useState(null);
  const inputImage = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  // Configs
  const modelName = "dogEye.onnx";
  const modelInputShape = [1, 3, 640, 640];
  const topk = 100;
  const iouThreshold = 0.45;
  const scoreThreshold = 0.7;

  useEffect(() => {
    const loadOpenCV = async () => {
      await new Promise((resolve) => {
        window.Module = {
          onRuntimeInitialized: resolve,
        };
        setLoading("Loading OpenCV.js...");
        const script = document.createElement("script");
        script.src = "https://docs.opencv.org/master/opencv.js";
        script.async = true;
        script.onload = () => {
          setLoading("Initializing OpenCV...");
          window.Module = undefined; // Cleanup global variable
        };
        document.body.appendChild(script);
      });

      const [yolov8, nms] = await Promise.all([
        InferenceSession.create(`${process.env.PUBLIC_URL}/model/${modelName}`),
        InferenceSession.create(`${process.env.PUBLIC_URL}/model/nms-yolov8.onnx`),
      ]);

      // Warmup main model
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

    loadOpenCV();
  }, []);

  return (
    <div className="App">
      {loading && <Loader>{loading}</Loader>}
      <header className="header bg-primary text-white py-4">
        <div className="container text-center">
          <h1 className="mb-4">Dogo-A-Eye Assistant</h1>
          <p>Please upload an image of your dog's eye</p>
          <p>Serving: <code className="code">{modelName}</code></p>
        </div>
      </header>

      <div className="content mt-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <img
                ref={imageRef}
                src="#"
                alt=""
                className={image ? "d-block" : "d-none"}
                onLoad={() => {
                  detectImage(
                    imageRef.current,
                    canvasRef.current,
                    session,
                    topk,
                    iouThreshold,
                    scoreThreshold,
                    modelInputShape
                  );
                }}
              />
              <canvas
                id="canvas"
                width={modelInputShape[2]}
                height={modelInputShape[3]}
                ref={canvasRef}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <input
              type="file"
              ref={inputImage}
              accept="image/*"
              className="d-none"
              onChange={(e) => {
                // Handle next image to detect
                if (image) {
                  URL.revokeObjectURL(image);
                  setImage(null);
                }

                const url = URL.createObjectURL(e.target.files[0]); // Create image URL
                imageRef.current.src = url; // Set image source
                setImage(url);
              }}
            />
            <div className="btn-group" role="group">
              <button
                className="btn btn-primary"
                onClick={() => {
                  inputImage.current.click();
                }}
              >
                Open local image
              </button>
              {image && (
                // Show close btn when there is image
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    inputImage.current.value = "";
                    imageRef.current.src = "#";
                    URL.revokeObjectURL(image);
                    setImage(null);
                  }}
                >
                  Close image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
