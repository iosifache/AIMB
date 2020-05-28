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
    FAIL: 2
}
export const LOGOUT_RESULT = {
    SUCCESS: 0,
    FAIL: 1
}

// Define object that works with the API
class APIWorker extends React.Component{

    full_host = api_config.details.host + ":" + api_config.details.port

    // Method that registers a new user
    register(full_name, email_address, plain_password){

        // Create server request
        return superagent.post(this.full_host + api_config.routes.register).withCredentials().set("Content-Type", "application/x-www-form-urlencoded").send({
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
        return superagent.post(this.full_host + api_config.routes.login).withCredentials().set("Content-Type", "application/x-www-form-urlencoded").send({
            email_address: email_address,
            plain_password: plain_password
        }).then(res => {

            var data = JSON.parse(res.text)

            // Check if logged with success
            switch (data.status){
                case "success":
                    return {
                        status: LOGIN_RESULT.SUCCESS,
                        full_name: data.account_details.full_name,
                        alerts: data.account_details.alerts
                    }
                case "invalid_credentials":
                    return {
                        status: LOGIN_RESULT.INVALID_CREDENTIALS
                    }
                default:
                    return {
                        status: LOGIN_RESULT.FAIL
                    }
            }

        }).catch(error => {

            // Log error
            console.error(error)
            return false

        })

    }

    // Method that logout the user
    logout(){

        // Create server request
        return superagent.post(this.full_host + api_config.routes.logout).withCredentials().set("Content-Type", "application/x-www-form-urlencoded").send().then(res => {

            var data = JSON.parse(res.text)

            // Check if logged with success
            console.log(data)
            console.log(data.status)
            switch (data.status){
                case "success":
                    return LOGOUT_RESULT.SUCCESS
                default:
                    return LOGOUT_RESULT.FAIL
            }

        }).catch(error => {

            // Log error
            console.error(error)
            return false

        })

    }

    // Method that gets the most recent datas about sectors
    getRecentSectorsData(){

        // Create server request
        return superagent.get(this.full_host + api_config.routes.get_sectors_data).withCredentials().send().then(res => {

            var data = JSON.parse(res.text)

            // Check if logged with success
            return data.sectors_data

        }).catch(error => {

            // Log error
            console.error(error)
            return false

        })

    }

    // Method that gets alerts
    getAlerts(){

        // Create server request
        return superagent.post(this.full_host + api_config.routes.get_alerts).withCredentials().set("Content-Type", "application/x-www-form-urlencoded").send().then(res => {

            var data = JSON.parse(res.text)

            // Check if logged with success
            console.log(data)
            console.log(data.status)
            return data.alerts

        }).catch(error => {

            // Log error
            console.error(error)
            return false

        })

    }

    // Method that creates a new alert
    createAlert(score_id, sector_id, operation_id, value){

        // Create server request
        return superagent.post(this.full_host + api_config.routes.create_alert).withCredentials().set("Content-Type", "application/x-www-form-urlencoded").send({
            score_id: score_id,
            sector_id: sector_id,
            operation_id: operation_id,
            value: value
        }).then(res => {

            var data = JSON.parse(res.text)

            // Check if logged with success
            console.log(data)
            console.log(data.status)
            switch (data.status){
                case "success":
                    return LOGOUT_RESULT.SUCCESS
                default:
                    return LOGOUT_RESULT.FAIL
            }

        }).catch(error => {

            // Log error
            console.error(error)
            return false

        })

    }

    // Method that removes an existent alert
    removeAlert(alert_id){

         // Create server request
         return superagent.post(this.full_host + api_config.routes.remove_alert).withCredentials().set("Content-Type", "application/x-www-form-urlencoded").send({
            alert_id: alert_id
        }).then(res => {

            var data = JSON.parse(res.text)

            // Check if logged with success
            console.log(data)
            console.log(data.status)
            switch (data.status){
                case "success":
                    return LOGOUT_RESULT.SUCCESS
                default:
                    return LOGOUT_RESULT.FAIL
            }

        }).catch(error => {

            // Log error
            console.error(error)
            return false

        })

    }

}

// Create an APIWorker that will be shared by all routes
const APIWorkerInstance = new APIWorker()

// Export
export default APIWorkerInstance