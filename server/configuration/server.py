# Class that models the configuration of server
class ServerConfiguration:
    class Details:
        HOST = "0.0.0.0"
        PORT = "3001"
        BANNER = "Hello! This is AIMB official API.."
    class Methods:
        GET = "GET"
        POST = "POST"
    class Routes:
        HOME = "/"
        LOGIN = "/login"
        REGISTER = "/register"
        LOGOUT = "/logout"
        GET_ALERTS = "/get_alerts"
        GET_SECTORS_DATA = "/get_sectors_data"
    class SessionMembers:
        LOGGED_USER_EMAIL_ADDRESS = "logged_user_email_address"
    class ErrorCodes:
        BAD_REQUESTS = 400
        UNAUTHENTICATED = 401