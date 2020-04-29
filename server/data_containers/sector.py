# Class that models a sector
class Sector:

    # Members
    name: str = None
    latitude: float = None
    longitude: float = None
    average_price_per_room: int = None
    average_price_per_square_meter: int = None
    average_air_quality: int = None
    score: float = None

    # Contructor
    def __init__(self, name: str, latitude: float, longitude: float, average_price_per_room: int, average_price_per_square_meter: int, average_air_quality: int, score: float = None) -> None:
        
        # Initialize members
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.average_price_per_room = average_price_per_room
        self.average_price_per_square_meter = average_price_per_square_meter
        self.average_air_quality = average_air_quality
        self.score = score

    # Public method for setting the score
    def set_score(self, new_score: float):

        self.score = new_score

    # Public method for converting the object into a dictionaries
    def convert_to_dict(self) -> dict:

        result = {}
        
        # Initialize members of dict
        result["name"] = self.name
        result["latitude"] = self.latitude
        result["longitude"] = self.longitude
        result["average_price_per_room"] = self.average_price_per_room
        result["average_price_per_square_meter"] = self.average_price_per_square_meter
        result["average_air_quality"] = self.average_air_quality
        if (self.score):
            result["score"] = self.score

        # Return
        return result