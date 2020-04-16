# Import handcrafted modules
from data_containers.account import Account
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
        result = self._database_worker.query(dict_account)

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
                    "logged": True,
                    "account_details": {
                        "full_name": result["full_name"]
                    }
                }

        # Return
        return {
            "logged": False
        }

    # Public method that registers an account
    def register(self, full_name: str, email_address: str, plain_password: str) -> dict:

        # Move to specific collection in database
        self._database_worker.use_collection(DatabaseConfiguration.Databases.AIMB.Collections.Accounts.NAME)

        # Create user and get its dictionary representation
        account = Account(email_address, plain_password, full_name)
        dict_account = account.convert_to_dict()

        # Insert the account
        result = self._database_worker.insert_value(dict_account)

        # Verify if inserted
        if (result):

            # Return
            return {
                "created": True
            }

        # Return
        return {
            "created": False
        }