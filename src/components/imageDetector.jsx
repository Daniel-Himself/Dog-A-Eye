import React from "react";

const ImageDetector = ({
    imageRef, canvasRef,
    image,
    session, topk, iouThreshold, scoreThreshold, modelInputShape,
    detectImage, setMaxScore
}) => {
    const runDetection = async () => {
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
    };
    return (
        <div className="content">
            <img
                ref={imageRef}
                src="#"
                alt=""
                style={{ display: image ? "block" : "none" }}
                onLoad={runDetection}
            />
            <canvas
                id="canvas"
                width={modelInputShape[2]}
                height={modelInputShape[3]}
                ref={canvasRef}
            />
        </div>
    );
};

export default ImageDetector;
