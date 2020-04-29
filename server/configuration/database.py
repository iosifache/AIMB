# Class that models the configuration of database
class DatabaseConfiguration:
    SERVER_URL = "mongodb://localhost:27017/"
    class Databases:
        class AIMB:
            NAME = "aimb"
            class Collections:
                class Accounts:
                    NAME = "accounts"
                    class Constraints:
                        SALT_LENGTH = 10
                class Sectors:
                    NAME = "sectors"