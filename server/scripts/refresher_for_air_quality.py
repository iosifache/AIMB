#!/usr/bin/env python3

# Import handcrafted modules
from modules.air_quality_provider import AirQualityProvider

# Refresh the air quality
AirQualityProvider().refresh_sectors_air_quality()