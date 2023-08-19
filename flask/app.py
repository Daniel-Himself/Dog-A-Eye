from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
# import torch
import numpy as np
import io
# import model  # Assuming the model.py file is imported as a module
import cv2
import os

app = Flask(__name__)
CORS(app)

# current_directory = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(current_directory, 'snapshots', 'Epoch99.pth')
# DCE_net = model.enhance_net_nopool().cuda()
# DCE_net.load_state_dict(torch.load(model_path))

def lowlight(image):
    # Convert the image to the YUV color space
    yuv_image = cv2.cvtColor(image, cv2.COLOR_BGR2YUV)

    # Apply histogram equalization to the Y channel to enhance brightness
    yuv_image[:,:,0] = cv2.equalizeHist(yuv_image[:,:,0])

    # Convert the image back to the BGR color space
    enhanced_image = cv2.cvtColor(yuv_image, cv2.COLOR_YUV2BGR)

    # Apply gamma correction to further enhance the image
    gamma = 1.2
    lookup_table = np.array([((i / 255.0) ** (1 / gamma)) * 255 for i in np.arange(0, 256)]).astype("uint8")
    enhanced_image = cv2.LUT(enhanced_image, lookup_table)

    return enhanced_image
@app.route('/enhance-image', methods=['POST'])
def enhance_image():
    # Retrieve the uploaded image from the request
    image_file = request.files['image']
    image = Image.open(image_file)
    image_arr = np.array(image)

    # Process the image using the lowlight function
    processed_image = lowlight(image_arr)

    # Convert the processed image to bytes
    image_bytes_io = io.BytesIO()
    processed_image.save(image_bytes_io, format='PNG')
    image_bytes_io.seek(0)

    # Return the processed image as a file response
    return send_file(image_bytes_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
