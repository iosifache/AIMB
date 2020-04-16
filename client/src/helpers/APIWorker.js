// Import libraries
import React from "react"
import superagent from "superagent"

// Import configuration
import configuration from "../configuration/index"

// Get configuration
var api_config = configuration.api

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
            if (data.created === true)
                return true
            else
                return false

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
            console.log(data)
            if (data.logged === true)
                return true
            else
                return false

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
                average_price: 3638,
                average_air_quality: 0,
                score: 7
            },
            {
                name: "Sector 2",
                average_price: 6036,
                average_air_quality: 0,
                score: 3
            },
            {
                name: "Sector 3",
                average_price: 7721,
                average_air_quality: 1,
                score: 0
            },
            {
                name: "Sector 4",
                average_price: 8607,
                average_air_quality: 5,
                score: 8
            },
            {
                name: "Sector 5",
                average_price: 7263,
                average_air_quality: 6,
                score: 9
            },
            {
                name: "Sector 6",
                average_price: 1525,
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