#!/usr/bin/env python3

# Import libraries
from flask import Flask, request, session, jsonify, abort
from flask_session import Session
from flask_cors import CORS, cross_origin
import os

# Import handcrafted modules
from modules.request_processor import RequestProcessor
from configuration.server import ServerConfiguration

# Create Flask server and request processor
app = Flask(__name__)
cors = CORS(app, supports_credentials = True)
request_processor = RequestProcessor()

# Set app secret
app.secret_key = os.urandom(24)

# Set session
app.config["SESSION_TYPE"] = "mongodb"
Session(app)

# Add configuration
app.config["DEBUG"] = True
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["CORS_HEADERS"] = "Content-Type"

# Default route
@app.route(ServerConfiguration.Routes.HOME)
def home_route():
   
    return ServerConfiguration.Details.BANNER

# Route for login
@app.route(ServerConfiguration.Routes.LOGIN, methods = [ServerConfiguration.Methods.POST])
@cross_origin(supports_credentials = True)
def login_route():

    # Parameters
    try:
        email_address = request.form.get("email_address")
        plain_password = request.form.get("plain_password")
    except:
        abort(ServerConfiguration.ErrorCodes.BAD_REQUESTS)

    # Login user
    result = request_processor.login(email_address, plain_password)

    # Set session if the login was successfully
    if (result["status"] == "success"):
        session[ServerConfiguration.SessionMembers.LOGGED_USER_EMAIL_ADDRESS] = email_address
    # Return
    return jsonify(result)

# Route for register
@app.route(ServerConfiguration.Routes.REGISTER, methods = [ServerConfiguration.Methods.POST])
@cross_origin(supports_credentials = True)
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

# Route for logout
@app.route(ServerConfiguration.Routes.LOGOUT, methods = [ServerConfiguration.Methods.POST])
@cross_origin(supports_credentials = True)
def logout():

    # Verify if user is logged
    if (ServerConfiguration.SessionMembers.LOGGED_USER_EMAIL_ADDRESS not in session):
        abort(ServerConfiguration.ErrorCodes.UNAUTHENTICATED)

    # Logout user
    result = request_processor.logout()

    # Remove session
    session.pop(ServerConfiguration.SessionMembers.LOGGED_USER_EMAIL_ADDRESS, None)

    # Return
    return result

# Route for getting user's alerts
@app.route(ServerConfiguration.Routes.GET_ALERTS, methods = [ServerConfiguration.Methods.GET])
@cross_origin(supports_credentials = True)
def get_alerts_route():

    # Verify if user is logged
    if (ServerConfiguration.SessionMembers.LOGGED_USER_EMAIL_ADDRESS not in session):
        abort(ServerConfiguration.ErrorCodes.UNAUTHENTICATED)

    # Get alerts
    result = request_processor.get_alerts(session[ServerConfiguration.SessionMembers.LOGGED_USER_EMAIL_ADDRESS])

    # Return
    return jsonify(result)

# Route for getting datas about sectors
@app.route(ServerConfiguration.Routes.GET_SECTORS_DATA, methods = [ServerConfiguration.Methods.GET])
@cross_origin(supports_credentials = True)
def get_sectors_data():

    # Verify if user is logged
    if (ServerConfiguration.SessionMembers.LOGGED_USER_EMAIL_ADDRESS not in session):
        abort(ServerConfiguration.ErrorCodes.UNAUTHENTICATED)

    # Get sectors data
    result = request_processor.get_sectors_data()

    # Return
    return jsonify(result)

# Run the server
app.run(ServerConfiguration.Details.HOST, ServerConfiguration.Details.PORT)