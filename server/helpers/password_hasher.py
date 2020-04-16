# Import libraries
from Crypto.Hash import SHA256

# Class that hashes the password
class PasswordHasher:

    def hash_password(self, password: str, salt: str = None) -> str:

        # Create salted password
        if (salt):
            salted_password = str.encode(password + salt)
        else:
            salted_password = str.encode(password)

        # Create hash
        hash = SHA256.new(salted_password)

        # Return
        return hash.hexdigest()