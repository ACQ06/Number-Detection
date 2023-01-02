from keras.datasets import mnist
from keras.utils import to_categorical
from keras.models import Sequential
from keras.layers import Conv2D, MaxPool2D, Flatten, Dense, Dropout
import pandas as pd

pixel_width = 28
pixel_height = 28
num_channel = 1
num_classes = 10

input_shape = (pixel_width,pixel_height,num_channel)

(X_train, y_train), (X_test, y_test) = mnist.load_data()

X_train = X_train.astype('float32')
X_test = X_test.astype('float32')

X_train /= 255.0
X_test /= 255.0

y_train = to_categorical(y_train)
y_test = to_categorical(y_test)

model = Sequential()
model.add(Conv2D(filters=32, kernel_size=(3,3), activation='relu', input_shape=input_shape))
model.add(MaxPool2D(2))
model.add(Dropout(.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(num_classes, activation='softmax'))

model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

model_logs = model.fit(X_train,y_train,epochs=10)

logs = pd.DataFrame(model_logs.history)

hist_csv_file = 'history.csv'

with open(hist_csv_file, mode='w') as f:
    logs.to_csv(f)

loss, accuracy = model.evaluate(X_test, y_test)

print('Accuracy: ', accuracy)
print('Loss: ', loss)

model.save('model.h5')