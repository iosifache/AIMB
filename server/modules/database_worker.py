# Import libraries
from pymongo import MongoClient, database

# Class that interfaces with database
class DatabaseWorker:

    # Members
    _server_address: str = None
    _connection: MongoClient = None
    _used_database: database.Database = None
    _used_database_name: str = None
    _used_collection: database.Collection = None
    _used_collection_name: str = None

    # Constructor
    def __init__(self, server_address: str) -> None:

        # Set members
        self._server_address = server_address

        # Connect to database
        self._connection = MongoClient(server_address)

    # Public method for using a database
    def use_database(self, database_name: str) -> bool:

        # Check if the requested database is the old one
        if (database_name == self._used_database_name):
            return True

        # Check if database exists
        if (database_name not in self._connection.database_names()):
            return False

        # Move to database
        self._used_database = self._connection[database_name]
        self._used_database_name = database_name

        # Return
        return True

    # Public method for using a collection
    def use_collection(self, collection_name: str) -> bool:

        # Check if the requested collection is the old one
        if (collection_name == self._used_collection_name):
            return True

        # Check if collection exists
        if (collection_name not in self._used_database.collection_names()):
            return False

        # Move to collection
        self._used_collection = self._used_database[collection_name]
        self._used_collection_name = collection_name

        # Return
        return True

    # Public method for inserting a value into a collection
    def insert_value(self, new: dict) -> bool:

        # Insert value
        result = self._used_collection.insert_one(new)

        # Return
        return result.acknowledged

    # Public method for querying the collection
    def query(self, query: dict) -> dict:

        # Query collection
        result = self._used_collection.find_one(query)
        
        # Return
        return result