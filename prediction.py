import numpy as np
from keras.models import load_model
import cv2
import os

model = load_model('model.h5')

class ReadNumber():
    def predict(imagePath):
        img = cv2.imread(imagePath, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (28, 28))

        img = img.astype('float32')
        img = img.reshape(1,28,28,1)

        img /= 255.0

        prediction = model.predict(img)
        pred = np.argmax(prediction)

        return pred