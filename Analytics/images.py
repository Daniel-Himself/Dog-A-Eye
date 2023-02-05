from pandas import DataFrame
from cv2 import imread, imshow, waitKey, destroyAllWindows
from glob import glob
from pathlib import Path
from re import match
import matplotlib.pyplot as plt

def fetch_images(dir_path, ext='jpg'):
    return [(file, imread(file)) for file in glob(f'{dir_path}/*.{ext}')]



if __name__ == '__main__':
    filenames, img = zip(*fetch_images("cats+dogs"))
    df = DataFrame({"img": img}, index=filenames)
    df['width'] = df.img.apply(lambda x: x.shape[1])
    df['height'] = df.img.apply(lambda x: x.shape[0])
    for i in range(10):
        plt.figure(i)
        plt.imshow(df.img[i])
    plt.show()
    