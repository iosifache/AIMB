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

// Define component
class ToastNotification extends React.Component{

	// Default state
	default_state = {
		hidden: false
	}
	state = this.default_state

	// Constructor
	constructor(){

		super()
		this.hideNotification = this.hideNotification.bind(this)

	}

	// Method that verifies if there are changes in toast body
	componentDidUpdate(prevProps){

		if(prevProps.body !== this.props.body || prevProps.refreshToken !== this.props.refreshToken){
			this.setState({
				hidden: false
			})
		}

	}

	// Method that hides the notification
	hideNotification(){

		this.setState({
			hidden: true
		})

	}

	// Render
	render(){

		var hidded_class, fixed_class, className

		// Join all the className
		hidded_class = (this.state.hidden) ? "hidden" : ""
		switch (this.props.fixed){
			case "top-left":
				fixed_class = "fixedTopRight"
				break
			case "bottom-right":
				fixed_class = "fixedBottomRight"
				break
			case "bottom-left":
				fixed_class = "fixedBottomLeft"
				break
			default:
				fixed_class = "fixedTopRight"
				break
		}
		className = ["ToastNotification", hidded_class, fixed_class, this.props.className].join(" ")

		// Return
		return(
			<Toast className={className} autohide delay={this.props.delay} onClose={this.hideNotification}>
				<Toast.Header>
					{
						(this.props.icon) ? (
							<img src={this.props.icon} className="rounded mr-2" alt="Toast Icon"/>
						) : (
							""
						)
					}
					<strong className="mr-auto">{this.props.title}</strong>
					<small>{all_routes_config.toasts.time_caption}</small>
				</Toast.Header>
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
	fixed: PropTypes.oneOf(["top-left", "bottom-right", "bottom-left", "top-right"]),
	className: PropTypes.string,
}
ToastNotification.defaultProps = {
	refreshToken: "",
	className: ""
}

// Export
export default ToastNotification