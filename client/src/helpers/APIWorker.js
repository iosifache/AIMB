// Import libraries
import React from "react"
import superagent from "superagent"

// Import configuration
import configuration from "../configuration/index"

// Get configuration
var api_config = configuration.api

// Define used enumerations
export const REGISTER_RESULT = {
    SUCCESS: 0,
    EMAIL_ALREADY_USED: 1,
    FAIL: 2
}
export const LOGIN_RESULT = {
    SUCCESS: 0,
    INVALID_CREDENTIALS: 1,
    FAIL: 1
}

// Define object that works with the API
class APIWorker extends React.Component{

    full_host = api_config.details.host + ":" + api_config.details.port

    // Method that registers a new user
    register(full_name, email_address, plain_password){

        // Create server request
        return superagent.post(this.full_host + api_config.routes.register).set("Content-Type", "application/x-www-form-urlencoded").send({
            full_name: full_name,
            email_address: email_address,
            plain_password: plain_password
        }).then(res => {

            var data = JSON.parse(res.text)

            // Check if logged with success
            switch (data.status){
                case "success":
                    return REGISTER_RESULT.SUCCESS
                case "email_already_used":
                    return REGISTER_RESULT.EMAIL_ALREADY_USED
                case "failed":
                    return REGISTER_RESULT.FAIL
                default:
                    return REGISTER_RESULT.FAIL
            }

        }).catch(error => {

            // Log error
            console.error(error)
            return false

        })

    }

    // Method that logins an existent user
    login(email_address, plain_password){

        // Create server request
        return superagent.post(this.full_host + api_config.routes.login).set("Content-Type", "application/x-www-form-urlencoded").send({
            email_address: email_address,
            plain_password: plain_password
        }).then(res => {

            var data = JSON.parse(res.text)

            // Check if logged with success
            switch (data.status){
                case "success":
                    return LOGIN_RESULT.SUCCESS
                case "invalid_credentials":
                    return LOGIN_RESULT.INVALID_CREDENTIALS
                default:
                    return LOGIN_RESULT.FAIL
            }

        }).catch(error => {

            // Log error
            console.error(error)
            return false

        })

    }

    // Method that logout the user
    logout(){

        // Return
        return true

    }

    // Method that gets the most recent datas about sectors
    getRecentSectorsData(){

        // Return
        return [
            {
                name: "Sector 1",
                average_price_per_room: 3638,
                average_price_per_square_meter: 16,
                average_air_quality: 0,
                score: 7
            },
            {
                name: "Sector 2",
                average_price_per_room: 6036,
                average_price_per_square_meter: 25,
                average_air_quality: 0,
                score: 3
            },
            {
                name: "Sector 3",
                average_price_per_room: 7721,
                average_price_per_square_meter: 31,
                average_air_quality: 1,
                score: 0
            },
            {
                name: "Sector 4",
                average_price_per_room: 8607,
                average_price_per_square_meter: 40,
                average_air_quality: 5,
                score: 8
            },
            {
                name: "Sector 5",
                average_price_per_room: 7263,
                average_price_per_square_meter: 39,
                average_air_quality: 6,
                score: 9
            },
            {
                name: "Sector 6",
                average_price_per_room: 1525,
                average_price_per_square_meter: 10,
                average_air_quality: 2,
                score: 1
            }
        ]

    }

    // Method that gets the existent alerts of the user
    getUsersAlerts(){

        // Return
        return [
            {
                score_id: 0,
                sector_id: 0,
                operation_id: 0,
                value: 100
            },
            {
                score_id: 1,
                sector_id: 1,
                operation_id: 1,
                value: 200
            }
        ]

    }

    // Method that creates a new alert
    createAlert(score_id, sector_id, operation_id, value){

        // Return
        return true

    }

    // Method that removes an existent alert
    removeAlert(alert_id){

        // Return
        return true

    }

}

// Create an APIWorker that will be shared by all routes
const APIWorkerInstance = new APIWorker()

// Export
export default APIWorkerInstance