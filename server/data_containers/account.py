# Import libraries
from random import randint

# Import handcrafted modules
from helpers.password_hasher import PasswordHasher
from configuration.database import DatabaseConfiguration

# Class that models an account
class Account:

    # Members
    full_name: str = None
    email_address: str = None
    salt: str = None
    plain_password: str = None
    alerts: list = []

    # Contructor
    def __init__(self, email_address: str, plain_password: str = None, full_name: str = None, salt: str = None, alerts: list = None) -> None:
        
        # Initialize members
        self.email_address = email_address
        self.plain_password = plain_password
        self.full_name = full_name
        if (alerts):
            self.alerts = alerts

        # Create salt if it is not specified
        hash_length = DatabaseConfiguration.Databases.AIMB.Collections.Accounts.Constraints.SALT_LENGTH
        if (not salt):
            self.salt = ''.join(["{}".format(randint(0, 9)) for num in range(0, hash_length)])
        else:
            self.salt = salt

    # Public method for converting the object into a dictionaries
    def convert_to_dict(self, without_alerts = False) -> dict:

        result = {}
        
        # Initialize members of dict
        result["email_address"] = self.email_address
        if (self.full_name):
            result["full_name"] = self.full_name
        if (self.plain_password):
            result["salt"] = self.salt
            result["hashed_password"] = PasswordHasher().hash_password(self.plain_password, self.salt)
        if (not without_alerts):
            result["alerts"] = self.alerts

        # Return
        return result