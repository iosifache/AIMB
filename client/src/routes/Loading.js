// Import libraries
import React from "react"
import {withRouter} from "react-router"

// Import components
import {Spinner, Image} from "react-bootstrap"
import styled, {keyframes} from "styled-components"
import {fadeOut} from "react-animations"

// Import stylesheets
import "../style/Baseline.css"
import "../style/Loading.css"

// Import configuration
import configuration from "../configuration/index"

// Get configuration
var all_routes_config = configuration.routes.all
var route_config = configuration.routes.loading

// Define styled components
const FadeOutAnimation = styled.div`
	animation-name: ${keyframes`${fadeOut}`};
	animation-duration: ${route_config.animation.duration};
	animation-delay: ${route_config.animation.delay}; 
	animation-fill-mode: forwards;
`

// Define component
class Loading extends React.Component{

	// Method that renders the component
	render(){

		// Return
		return (

			<div id="LoadingRoute">
				<div className="SpinnerContainer">

					{/* Spinner effect */}
					<FadeOutAnimation>
						<Image src={all_routes_config.logo.black_source} alt={all_routes_config.logo.alt_text}/>
						<Spinner animation="grow"/>
					</FadeOutAnimation>

				</div>
			</div>
		
		)

	}

}

// Export
export default withRouter(Loading)