import { toBlob } from "html-to-image";
import { WhatsappIcon } from "react-share";
import Instructions from "./instructions";


const DetectionFeedback = ({
    inputImage, imageRef,
    images, maxAttempts,
    score, threshold
}) => {
    
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

    // If the score is above the threshold, render a message indicating a good image
    if (images.length === maxAttempts) {
        const best = images.reduce((prev, current) => (prev.score > current.score) ? prev : current);
        imageRef.current = best.image
        return (<div className="share_pic">
            <h3>(Out of Attempts) Here the best image</h3>
            <p>Click the button below to share it with the clinic</p>
            <div className="bottom-button-con">
            <button onClick={shareImage} className="share-icon">
                <WhatsappIcon size={32} round={true} />
            </button>
            </div>
        </div>)
    }
    if (score >= threshold * 100) {
        
        // Share the image using the Web Share API

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
            <h3> ({maxAttempts - images.length} out of {maxAttempts} Attempts Remain) The Image is Not Clear Enough </h3>
            <p>
              Let's try again.
              {
                score > 0 
                ? " Make sure the eye is well lit and centered in the frame, you may try using flash now"
                : " Make sure that only one eye is in the frame at a time"
              }
              </p>
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
export default DetectionFeedback;