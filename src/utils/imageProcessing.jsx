import cv from "@techstark/opencv-js"; // OpenCV for JavaScript

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

const processImage = (file, setImage, imageRef) => {
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
            brightnessBoost: 20
        }); // Enhancing image using the lowlight function

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
export default processImage;