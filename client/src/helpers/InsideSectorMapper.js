// Import libraries
import React from "react"
import "point-in-polygon"

// Import configuration
import configuration from "../configuration/index"
import inside from "point-in-polygon"

// Get configuration
var sectors_margins = configuration.sectors_margins

// Define object that map a point inside a sector
class InsideSectorMapper extends React.Component{

    sectors = [
        [sectors_margins.center, sectors_margins.between.one_two, sectors_margins.between.six_one],
        [sectors_margins.center, sectors_margins.between.one_two, sectors_margins.between.two_three],
        [sectors_margins.center, sectors_margins.between.three_four, sectors_margins.between.two_three],
        [sectors_margins.center, sectors_margins.between.three_four, sectors_margins.between.four_five],
        [sectors_margins.center, sectors_margins.between.five_six, sectors_margins.between.four_five],
        [sectors_margins.center, sectors_margins.between.five_six, sectors_margins.between.six_one]
    ]

    mapPoint(latitude, longitude){

        var mapped_sector = -1

        // Search the fitted sector
        this.sectors.forEach((sector, index) => {
            if (inside([longitude, latitude], sector))
                mapped_sector = index
        })

        // Return
        return mapped_sector

    }

}

// Create an InsideSectorMapper
const InsideSectorMapperInstance = new InsideSectorMapper()

// Export
export default InsideSectorMapperInstance