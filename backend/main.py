from flask import Flask, jsonify, request
from flask_cors import CORS
from database import Database
from api import API

app = Flask(__name__)
db = Database("./database.db")
api = API(db)

@app.route("/")
def main():
    return "<h1>Hello World</h1>"

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")

@app.route("/api/<path:route>", methods=["GET", "POST"])
def api_endpoint(route):
    """
    Serve JSON data
    :param route: String representing the path with $ipAddress:$port/api/ stripped off.
    :return: Appropriate response data.
    """
    return jsonify(api.parse_response(request.method, request.json, route))
