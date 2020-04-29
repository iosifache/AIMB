# Import handcrafted modules
from data_containers.account import Account
from data_containers.sector import Sector
from modules.database_worker import DatabaseWorker
from configuration.database import DatabaseConfiguration

# Class that models a request processor
class RequestProcessor:

    # Members
    _database_worker: DatabaseWorker = None

    # Constructor
    def __init__(self):

        # Init members
        self._database_worker = DatabaseWorker(DatabaseConfiguration.SERVER_URL)
        self._database_worker.use_database(DatabaseConfiguration.Databases.AIMB.NAME)

    # Public method that check a user credentials
    def login(self, email_address: str, plain_password: str) -> dict:

        # Move to specific collection in database
        self._database_worker.use_collection(DatabaseConfiguration.Databases.AIMB.Collections.Accounts.NAME)

        # Create user and get its dictionary representation
        account = Account(email_address)
        dict_account = account.convert_to_dict()
        
        # Search his account
        result = self._database_worker.query_one(dict_account)

        # Verify if exists
        if (result):

            # Set account members
            account.plain_password = plain_password
            account.salt = result["salt"]

            # Verify password
            dict_account = account.convert_to_dict()
            if (dict_account["hashed_password"] == result["hashed_password"]):

                # Return
                return {
                    "status": "success",
                    "account_details": {
                        "full_name": result["full_name"]
                    }
                }

        # Return
        return {
            "status": "invalid_credentials"
        }

    # Public method that registers an account
    def register(self, full_name: str, email_address: str, plain_password: str) -> dict:

        # Move to specific collection in database
        self._database_worker.use_collection(DatabaseConfiguration.Databases.AIMB.Collections.Accounts.NAME)

        # Create user and get its dictionary representation
        account = Account(email_address)
        dict_account = account.convert_to_dict()

        # Search the account
        result = self._database_worker.query_one(dict_account)

        # If an account exists, then return
        if (result):
            return {
                "status": "email_already_used"
            }

        # Add new data to the account if it doens't already exists
        account.plain_password = plain_password
        account.full_name = full_name
        dict_account = account.convert_to_dict()

        # Insert the account
        result = self._database_worker.insert_one(dict_account)

        # Verify if inserted
        if (result):

            # Return
            return {
                "status": "success"
            }

        # Return
        return {
            "status": "failed"
        }

    # Public method for logout an user
    def logout(self) -> dict:

        # Return
        return {
            "status": "success"
        }

    # Public method for getting alerts for one user
    def get_alerts(self, email_address: str) -> dict:

        # Create user and get its dictionary representation
        account = Account(email_address)
        dict_account = account.convert_to_dict()

        # Search the account
        result = self._database_worker.query_one(dict_account)

        # Verify the result
        if (result):
            
            # Return
            return {
                "alerts" : result["alerts"]
            }
    
    # Public method for getting sectors data
    def get_sectors_data(self) -> dict:

        # Move to specific collection in database
        self._database_worker.use_collection(DatabaseConfiguration.Databases.AIMB.Collections.Sectors.NAME)

        # Get sectors data
        result = self._database_worker.query_all()

        # Verify the result
        if (result):

            # Create containers
            sectors = []
            for sector in result:
                sectors.append(Sector(sector["name"], sector["latitude"], sector["longitude"], sector["average_price_per_room"], sector["average_price_per_square_meter"], sector["average_air_quality"], sector["score"]))

            # Create dictionaries
            sectors_dict = []
            for sector in sectors:
                sectors_dict.append(sector.convert_to_dict())

            # Return
            return {
                "sectors_data" : sectors_dict
            }