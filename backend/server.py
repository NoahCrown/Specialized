from flask import Flask, request, abort, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        try:
            received_data = request.json  # Get the JSON data from the request
            if 'id' in received_data:
                data_id = received_data["id"]
                return jsonify({"id": data_id})  # Return 'id' field in JSON format
            else:
                return jsonify({"error": "No 'id' field found in the received JSON data"}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500  # Return any exception as a JSON response with 500 status code
    else:
        abort(400) 

if __name__ == '__main__':
    app.run()