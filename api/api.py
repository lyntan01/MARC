from flask import Flask, request, jsonify, make_response

app = Flask(__name__)


@app.route('/prediction', methods=['GET', 'POST'])
def predict():
    if request.method == "POST":
        try:
            formData = request.json
            trashCategory = model(formData['imagefield'])
            if trashCategory != "Trash":
                message = "This belongs to the " + trashCategory + " recycling bin!"
            else:
                message = "This item cannot be recycled. Please dispose of this in the nearest wastebin."

            response = jsonify({
                "statusCode": 200,
                "status": "Prediction made",
                "result": message, 
                "points": "You have earned " + str(calculatePoints(trashCategory)) + " points",
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
    return "Paper"

# Returns the number of points user earns for a trash item


def calculatePoints(trashCategory):
    # Insert logic here, sample logic below
    if trashCategory == "Trash":
        return 0
    return 5
