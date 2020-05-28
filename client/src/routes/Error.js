// Import libraries
import React from "react"
import {withRouter} from "react-router"
import PropTypes from "prop-types"

// Import components
import {Image} from "react-bootstrap"

// Import stylesheets
import "../style/Baseline.css"
import "../style/Error.css"

// Import configuration
import configuration from "../configuration/index"

// Get configuration
var all_routes_config = configuration.routes.all
var route_config = configuration.routes.errors

// Define used enumerations
export const ERROR_TYPES = {
    NOT_FOUND: 0,
    NOT_AUTHORIZED: 1,
    RESOLUTION_NOT_ALLOWED: 2
}

// Define component
class Error extends React.Component{

	// Method that renders the component
	render(){

        // Get error description
        var description
        switch (this.props.type){
            case ERROR_TYPES.NOT_FOUND:
                description = route_config.types.not_found.description
                break
            case ERROR_TYPES.NOT_AUTHORIZED:
                description = route_config.types.not_authorized.description
                break
            case ERROR_TYPES.RESOLUTION_NOT_ALLOWED:
                description = route_config.types.resolution_not_allowed.description
                break
            default:
                description = ""
                break
        }

		// Return
		return (

			<div id="ErrorRoute">
                <div class="ErrorContainer">
				    <Image src={all_routes_config.logo.black_source} alt={all_routes_config.logo.alt_text}/>
                    <div>
                        <b>{route_config.error_prefix}</b>: {description}
                    </div>
                </div>
			</div>

		)

	}

}

// Set up the required and default props
Error.propTypes = {
	type: PropTypes.oneOf([ERROR_TYPES.NOT_FOUND, ERROR_TYPES.NOT_AUTHORIZED, ERROR_TYPES.RESOLUTION_NOT_ALLOWED]).isRequired,
}

// Export
export default withRouter(Error)