// Import libraries
import React from "react"
import PropTypes from "prop-types"

// Import components
import {Toast} from "react-bootstrap"

// Import stylesheet
import "../style/Baseline.css"
import "../style/ToastNotification.css"

// Import configuration
import configuration from "../configuration/index"

// Get configuration
var all_routes_config = configuration.routes.all

// Define used enumerations
export const FIXED_POSITION = {
	TOP_LEFT: 0,
	TOP_RIGHT: 1,
	BOTTOM_LEFT: 2,
	BOTTOM_RIGHT: 3
}

// Define component
class ToastNotification extends React.Component{

	// Default state
	default_state = {
		hidden: false
	}
	state = JSON.parse(JSON.stringify(this.default_state))

	// Method that verifies if there are changes in toast body
	componentDidUpdate(prevProps){

		if(prevProps.body !== this.props.body || prevProps.refreshToken !== this.props.refreshToken){
			this.setState({
				hidden: false
			})
		}

	}

	// Method that hides the notification
	hide(){

		this.setState({
			hidden: true
		})

	}

	// Method that renders the component
	render(){

		var hidded_class, fixed_class, className

		// Join all the className
		hidded_class = (this.state.hidden || this.props.refreshToken === -1) ? "hidden" : ""
		switch (this.props.fixed){
			case FIXED_POSITION.TOP_LEFT:
				fixed_class = "fixedTopRight"
				break
			case FIXED_POSITION.BOTTOM_RIGHT:
				fixed_class = "fixedBottomRight"
				break
			case FIXED_POSITION.BOTTOM_LEFT:
				fixed_class = "fixedBottomLeft"
				break
			case FIXED_POSITION.TOP_RIGHT:
				fixed_class = "fixedTopRight"
				break
			default:
				break
		}
		className = ["ToastNotification", hidded_class, fixed_class, this.props.className].join(" ")

		// Return
		return(

			<Toast 
				className={className} 
				autohide delay={this.props.delay} 
				onClose={this.hide.bind(this)}
				id={this.props.id}
			>

				{/* Toast header */}
				<Toast.Header>
					{
						(this.props.icon) ? (
							<img 
								src={this.props.icon} 
								className="rounded mr-2" 
								alt="Toast Icon"
							/>
						) : (
							""
						)
					}
					<strong className="mr-auto">{this.props.title}</strong>
					<small>{all_routes_config.toasts.time_caption}</small>
				</Toast.Header>

				{/* Toast body */}
				<Toast.Body>
					{this.props.body}
				</Toast.Body>

			</Toast>

		)
	}

}

// Set up the required and default props
ToastNotification.propTypes = {
	icon: PropTypes.string,
	body: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	refreshToken: PropTypes.string,
	delay: PropTypes.string.isRequired,
	fixed: PropTypes.oneOf([FIXED_POSITION.TOP_RIGHT, FIXED_POSITION.TOP_LEFT, FIXED_POSITION.BOTTOM_RIGHT, FIXED_POSITION.BOTTOM_LEFT]),
	className: PropTypes.string,
	id: PropTypes.string
}
ToastNotification.defaultProps = {
	refreshToken: -1,
	className: "",
	id: ""
}

// Export
export default ToastNotification