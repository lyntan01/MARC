from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

# OG one for testing, to delete if unused


@app.route('/result', methods=['GET'])
def index():
    trashImage = ""
    trashCategory = model(trashImage)
    return {'prediction': trashCategory, 'points': calculatePoints(trashCategory)}


@app.route('/prediction', methods=['GET', 'POST'])
def predict():
    if request.method == "POST" and request.json:
        try:
            # formData = request.json
            # trashCategory = model(formData['imagefield'])
            # response = jsonify({
            #     "statusCode": 200,
            #     "status": "Prediction made",
            #     "result": "Prediction: " + trashCategory,  # CHANGE LATER
            #     "image": formData['imagefield']  # DELETE LATER
            # })

            #  DEBUGGING
            response = jsonify({
                "result": "finally"
            })
            return response
        except Exception as error:
            return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })

# Returns the prediction of the trash classfication model
def model(trashImage):
    # Insert model here
    return "Prediction"

# Returns the number of points user earns for a trash item


def calculatePoints(trashCategory):
    # Insert logic here
    return 5
