# Import handcrafted modules
from configuration.tokens import TokensCofiguration

# Class that models the configurations for IQAir API
class IQAirConfiguration:
    BASE_URL = "https://api.airvisual.com/v2"
    class Methods:
        GET = "GET"
    class RoutesFormatStrings:
        NEAREST_CITY = "nearest_city?lat={}&lon={}&key={}"
    class Secrets:
        KEY = TokensCofiguration.IQAIR