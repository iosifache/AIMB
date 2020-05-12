# Import libraries
import requests

# Import handcrafted modules
from modules.database_worker import DatabaseWorker
from data_containers.sector import Sector
from configuration.iqair_api import IQAirConfiguration
from configuration.database import DatabaseConfiguration

# Class that models the air quality provider
class AirQualityProvider:

	# Members
	_database_worker: DatabaseWorker = None

	# Constructor
	def __init__(self):

		# Init members
		self._database_worker = DatabaseWorker(DatabaseConfiguration.SERVER_URL)
		self._database_worker.use_database(DatabaseConfiguration.Databases.AIMB.NAME)

	# Method for converting US AQI to grade
	def _convert_aqi_to_grade(self, aqi) -> float:

		grade = 0

		if (aqi < 50):

			# Map 0 - 50 interval (good) to 8 - 10
			grade = 10 - (aqi / 50) * 2

		elif (aqi < 100):

			# Map 50 - 100 interval (moderate) to 6 - 8
			grade = 8 - ((aqi - 50) / 50) * 2

		elif (aqi < 150):

			# Map 100 - 150 interval (unhealthy for sensitive grous) to 4 - 6
			grade = 6 - ((aqi - 100) / 50) * 2

		elif (aqi < 200):

			# Map 150 - 200 interval (unhealthy) to 2 - 4
			return float(round(4 - ((aqi - 150) / 50) * 2, 2))

		elif (aqi < 300):

			# Map 200 - 300 interval (very unhealthy) to 0 - 2
			return float(round(2 - ((aqi - 200) / 100) * 2, 2))

		else:
			
			# If grater that 300, map directly to 0
			grade = 0
	
		# Return
		return float(round(grade, 2))

	# Method for getting the air quality for a specific location
	def _get_air_quality_for_coordinates(self, latitude:float, longitude:float) -> int:

		# Build URL
		full_url = IQAirConfiguration.BASE_URL + "/" + IQAirConfiguration.RoutesFormatStrings.NEAREST_CITY.format(latitude, longitude, IQAirConfiguration.Secrets.KEY)
		
		# Create request
		payload = {}
		headers= {}
		response = requests.request(IQAirConfiguration.Methods.GET, full_url, headers = headers, data = payload)

		# Get air quality
		details_about_location = response.json()
		air_quality = details_about_location["data"]["current"]["pollution"]["aqius"]

		# Return
		return int(air_quality)

	# Method for r the air quality for each sector
	def refresh_sectors_air_quality(self) -> None:

		# Move to specific collection in database
		self._database_worker.use_collection(DatabaseConfiguration.Databases.AIMB.Collections.Sectors.NAME)

		# Get sectors data
		result = self._database_worker.query_all()

		# Verify the result
		if (result):

			# Create containers
			sectors: list = []
			for sector in result:
				sectors.append(Sector(sector["name"], sector["latitude"], sector["longitude"], sector["average_price_per_room"], sector["average_price_per_square_meter"], sector["average_air_quality"], sector["score"]))

			# Query the API
			for sector in sectors:

				aqi = self._get_air_quality_for_coordinates(sector.latitude, sector.longitude)
				grade = self._convert_aqi_to_grade(aqi)
				sector.average_air_quality = grade

				# Print
				#print("[+] New grade for {} is {}, computed by AQI {}".format(sector.name, grade, aqi))		

			# Get all dictionaries into one list
			sectors_dict = []
			for sector in sectors:
				sectors_dict.append(sector.convert_to_dict())

			# Remove all documents from collection before inserting new ones
			self._database_worker.delete_all()

			# Insert new data into the collection
			self._database_worker.insert_many(sectors_dict)