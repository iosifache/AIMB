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
    class ErrorCodes:
        BAD_REQUESTS = 400