# Class that models the configurations for IQAir API
class ScrapperConfiguration:
    PROCESS_LIVE_REQUESTS = True
    class QueryConstraints:
        class Sector:
            Minimum = 1
            Maximum = 6
        class RoomsCriteria:
            Minimum = 1
            Maximum = 3
        class AreaCriteria:
            Minimum = 10
            Maximum = 100
            Step = 10
    class Live:
        BASE_URL = "https://storia.ro"
        class Methods:
            GET = "GET"
        class Selectors:
            PRICE = "li.offer-item-price"
        class RoutesFormatStrings:
            RoomsCriteria = "vanzare/apartament/bucuresti/sectorul-{}/?search[filter_enum_rooms_num][0]={}"
            AreaCriteria = "vanzare/apartament/bucuresti/sectorul-{}/?search%5Bfilter_float_m%3Afrom%5D={}&search%5Bfilter_float_m%3Ato%5D={}"
    class Cache:
        class Names:
            class RoomsCriteria:
                Folder = "cached/storia.ro/rooms"
                FormatForFile = "{}.{}.html"
            class AreaCriteria:
                Folder = "cached/storia.ro/area"
                FormatForFile = "{}.{}-{}.html"