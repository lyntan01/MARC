from flask import Flask, request, jsonify, make_response

app = Flask(__name__)


@app.route('/prediction', methods=['GET', 'POST'])
def predict():
    if request.method == "POST" and request.json:
        try:
            formData = request.json
            trashCategory = model(formData['imagefield'])
            response = jsonify({
                "statusCode": 200,
                "status": "Prediction made",
                "result": "Prediction: " + trashCategory, 
                "image": formData['imagefield']  # DELETE LATER
            })

            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        except Exception as error:
            return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })

    else:
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

# Returns the prediction of the trash classfication model


def model(trashImage):
    # Insert model here
    return "Prediction"

# Returns the number of points user earns for a trash item


def calculatePoints(trashCategory):
    # Insert logic here
    return 5
