from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    #render_template("app.html")
    location = request.form['location']
    noRooms = int(request.form['noRooms'])
    noParkSpaces = int(request.form['noParkSpaces'])
    petsAllowed = bool(request.form['petsAllowed'])
    balcony = bool(request.form['balcony'])
    garden = bool(request.form['garden'])
    newlyConst = bool(request.form['newlyConst'])
    livingSpace = float(request.form['livingSpace'])


    response = jsonify({
        'estimated_price': util.get_estimated_price(location=location, noRooms=noRooms, noParkSpaces=noParkSpaces, petsAllowed=petsAllowed, balcony=balcony, garden=garden, newlyConst=newlyConst, livingSpace=livingSpace)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()