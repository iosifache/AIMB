# Import libraries
import requests
import bs4
import re

# Import handcrafted modules
from modules.database_worker import DatabaseWorker
from data_containers.sector import Sector
from configuration.scrapper import ScrapperConfiguration
from configuration.database import DatabaseConfiguration

# Class that models the scrapper of apartments
class Scrapper:

    # Members
	_database_worker: DatabaseWorker = None
	_sectors_data: list = []

	# Constructor
	def __init__(self):

		# Init members
		self._database_worker = DatabaseWorker(DatabaseConfiguration.SERVER_URL)
		self._database_worker.use_database(DatabaseConfiguration.Databases.AIMB.NAME)

		# Get current data about sectors
		self._database_worker.use_collection(DatabaseConfiguration.Databases.AIMB.Collections.Sectors.NAME)
		result = self._database_worker.query_all()
		if (result):

            # Create containers
			for sector in result:
				self._sectors_data.append(Sector(sector["name"], sector["latitude"], sector["longitude"], sector["average_price_per_room"], sector["average_price_per_square_meter"], sector["average_air_quality"], sector["score"]))

	# Destructor
	def __del__(self):

		# Create dictionaries
		sectors_dict = []
		for sector in self._sectors_data:
			sectors_dict.append(sector.convert_to_dict())

		# Insert into database
		self._database_worker.delete_all()
		self._database_worker.insert_many(sectors_dict)

	# Private method that computes the sum of prices for apartments found
	def _get_sum_of_prices(self, full_filename: str, full_url: str = None) -> int:

		# Check filename argument
		if (not full_filename):
			return -1

		# Create request
		if (full_url):

			# Request page
			page = requests.get(full_url)

			# Save content
			content = page.content
			open(full_filename, "wb").write(content)

		else:

			# Read cached file content
			content = open(full_filename, "r").read()
		
		# Init Beautiful Soup scrapper
		scrapper = bs4.BeautifulSoup(content, "html.parser")

		# Get prices
		prices = []
		for raw_price in scrapper.select(ScrapperConfiguration.Live.Selectors.PRICE):
			new_price = re.findall(r"\d+", str(raw_price))[0]
			prices.append(new_price)
		
		# Compute average
		sum = 0
		for price in prices:
			sum += 1000 * int(price)

		# Return
		return (sum, len(prices))

    # Private method that refreshes datas about apartments, regarding number of rooms
	def _refresh_prices_per_number_of_rooms(self):

		sectors = range(ScrapperConfiguration.QueryConstraints.Sector.Minimum, ScrapperConfiguration.QueryConstraints.Sector.Maximum + 1)
		for sector in sectors:

			# Set averages list, containing price averages for each one
			averages_per_sector = []

			# Iterate through the interval of rooms
			sampled_interval = range(ScrapperConfiguration.QueryConstraints.RoomsCriteria.Minimum, ScrapperConfiguration.QueryConstraints.RoomsCriteria.Maximum + 1)
			for number_of_rooms in sampled_interval:

				# Create filename
				filename = ScrapperConfiguration.Cache.Names.RoomsCriteria.FormatForFile.format(sector, number_of_rooms)
				full_filename = ScrapperConfiguration.Cache.Names.RoomsCriteria.Folder + "/" + filename

				# Create URL
				full_url = None
				if (ScrapperConfiguration.PROCESS_LIVE_REQUESTS):
					full_url = ScrapperConfiguration.Live.BASE_URL + "/" + ScrapperConfiguration.Live.RoutesFormatStrings.RoomsCriteria.format(sector, number_of_rooms)

				# Get average
				(sum, count) = self._get_sum_of_prices(full_filename, full_url)
				average = sum / (count * number_of_rooms)
				averages_per_sector.append(average)
   
			# Compute average per sector
			averages_sum = 0
			for sector_average in averages_per_sector:
				averages_sum += sector_average
			full_average = averages_sum / len(averages_per_sector)

			# Add price average to sector
			self._sectors_data[sector - 1].average_price_per_room = int(full_average)

			# Log
			print("[+] Average price per room, for Sector {}, is {}".format(sector, int(full_average)))

	# Private method that refreshes datas about apartments, regarding number of square meters
	def _refresh_prices_per_number_of_square_meters(self):

		# Iterate through sectors
		sectors = range(ScrapperConfiguration.QueryConstraints.Sector.Minimum, ScrapperConfiguration.QueryConstraints.Sector.Maximum + 1)
		for sector in sectors:

			# Set averages list, containing price averages for each one
			averages_per_sector = []

			# Iterate through the interval of square meters
			sampled_interval = range(ScrapperConfiguration.QueryConstraints.AreaCriteria.Minimum, ScrapperConfiguration.QueryConstraints.AreaCriteria.Maximum, ScrapperConfiguration.QueryConstraints.AreaCriteria.Step)
			for inferior_limit in sampled_interval:

				# Set superior limit of the current interval
				superior_limit = inferior_limit + ScrapperConfiguration.QueryConstraints.AreaCriteria.Step

				# Create filename
				filename = ScrapperConfiguration.Cache.Names.AreaCriteria.FormatForFile.format(sector, inferior_limit, superior_limit)
				full_filename = ScrapperConfiguration.Cache.Names.AreaCriteria.Folder + "/" + filename

				# Create URL
				full_url = None
				if (ScrapperConfiguration.PROCESS_LIVE_REQUESTS):
					full_url = ScrapperConfiguration.Live.BASE_URL + "/" + ScrapperConfiguration.Live.RoutesFormatStrings.AreaCriteria.format(sector, inferior_limit, superior_limit)

				# Get average
				(sum, count) = self._get_sum_of_prices(full_filename, full_url)
				average = sum / (count * (inferior_limit + ScrapperConfiguration.QueryConstraints.AreaCriteria.Step / 2))
				averages_per_sector.append(average)
   
			# Compute average per sector
			averages_sum = 0
			for sector_average in averages_per_sector:
				averages_sum += sector_average
			full_average = averages_sum / len(averages_per_sector)

			# Add price average to sector
			self._sectors_data[sector - 1].average_price_per_square_meter = int(full_average)

			# Log
			print("[+] Average price per square meter, for Sector {}, is {}".format(sector, int(full_average)))

	# Public method that refreshes datas about apartments
	def refresh_apartments_prices(self):

		# Refresh prices per room
		self._refresh_prices_per_number_of_rooms()

		# Refresh prices per share meter
		self._refresh_prices_per_number_of_square_meters()