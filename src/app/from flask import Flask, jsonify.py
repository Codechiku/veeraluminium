from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/welcome', methods=['GET'])
def welcome():
    return jsonify({
        "message": "Welcome to our API!"
    }), 200

if __name__ == '__main__':
    app.run(debug=True)