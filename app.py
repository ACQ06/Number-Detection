from flask import Flask, render_template, request
import base64
import os
from prediction import ReadNumber
from io import BytesIO
from PIL import Image

app = Flask(__name__, static_url_path='/static')

IMAGE_FOLDER = 'images'
app.config['UPLOAD_FOLDER'] = IMAGE_FOLDER

@app.route("/", methods=['GET'])
def mainpage():
    return render_template('mainpage.html')

@app.route("/handwritten", methods = ['GET'])
def handwritten():
    return render_template('handwritten.html')


@app.route("/handwritten/predict", methods = ['POST'])
def predict():
    if request.method == 'POST':
        data = request.form["image"]
        bytes_decoded = base64.b64decode(data)
        img = Image.open(BytesIO(bytes_decoded))
        out_jpg = img.convert("RGB")
        filename = "predictImage.png"
        out_jpg.save(filename)
        number = ReadNumber.predict(filename)
        os.remove(filename)
        return str(number)

@app.route("/chart", methods = ['GET'])
def chart():
    return render_template('chart.html')

@app.route("/about", methods = ['GET'])
def about():
    return render_template('about.html')