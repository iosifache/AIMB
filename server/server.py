#!/usr/bin/env python3

# Import libraries
from flask import Flask, request, jsonify, abort
from flask_cors import CORS, cross_origin

# Import handcrafted modules
from modules.request_processor import RequestProcessor
from configuration.server import ServerConfiguration

# Create Flask server and request processor
app = Flask(__name__)
cors = CORS(app)
request_processor = RequestProcessor()

# Add configuration
app.config["DEBUG"] = True
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["CORS_HEADERS"] = "Content-Type"

# Home route
@app.route(ServerConfiguration.Routes.HOME)
def home_route():

    return ServerConfiguration.Details.BANNER

# Login route
@app.route(ServerConfiguration.Routes.LOGIN, methods=[ServerConfiguration.Methods.POST])
def login_route():

    # Parameters
    try:
        email_address = request.form.get("email_address")
        plain_password = request.form.get("plain_password")
    except:
        abort(ServerConfiguration.ErrorCodes.BAD_REQUESTS)

    # Login user
    result = request_processor.login(email_address, plain_password)

    # Return
    return jsonify(result)

# Register route
@app.route(ServerConfiguration.Routes.REGISTER, methods=[ServerConfiguration.Methods.POST])
def register_route():

    # Parameters
    full_name = request.form.get("full_name")
    email_address = request.form.get("email_address")
    plain_password = request.form.get("plain_password")
    try:
        pass
    except:
        abort(ServerConfiguration.ErrorCodes.BAD_REQUESTS)

    # Verify parameters
    if (not full_name or not email_address or not plain_password):
        abort(ServerConfiguration.ErrorCodes.BAD_REQUESTS)

    # Register user
    result = request_processor.register(full_name, email_address, plain_password)

    # Return
    return jsonify(result)

# Run the server
app.run(ServerConfiguration.Details.HOST, ServerConfiguration.Details.PORT)