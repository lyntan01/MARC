from flask import Flask

app = Flask(__name__)

@app.route('/home', methods=['GET'])
def index():
    trashImage = ""
    trashCategory = model(trashImage)
    return {'prediction': trashCategory, 'points': calculatePoints(trashCategory)}

# Returns the prediction of the trash classfication model
def model(trashImage):
    # Insert model here
    return "Prediction"

# Returns the number of points user earns for a trash item
def calculatePoints(trashCategory):
    # Insert logic here
    return 5
