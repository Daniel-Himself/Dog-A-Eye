import React from "react";
import { WhatsappIcon } from "react-share";
import Instructions from "./instructions";
import { toBlob } from "html-to-image";
const PopoverContent = (score, threshold, inputImage, imageRef) => {
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
export default PopoverContent;