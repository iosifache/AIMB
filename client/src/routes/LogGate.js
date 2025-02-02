// Import libraries
import React from "react"
import {withRouter} from "react-router-dom"
import PropTypes from "prop-types"
import APIWorkerInstance, {REGISTER_RESULT, LOGIN_RESULT} from "../helpers/APIWorker"

// Import components
import {Redirect} from "react-router-dom"
import {Container, Col, Button, Image} from "react-bootstrap"
import {Player} from "video-react"
import styled, {keyframes} from "styled-components"
import {fadeIn} from "react-animations"
import VerifiedInputControl, {VERIFIED_STATE} from "../components/VerifiedInputControl"
import ToastNotification, {FIXED_POSITION} from "../components/ToastNotification"

// Import stylesheets
import "../style/Baseline.css"
import "../style/LogGate.css"
import "../style/VerifiedInputControl.css"

// Import configuration
import configuration from "../configuration/index"

// Get configuration
var router_config = configuration.router
var all_routes_config = configuration.routes.all
var route_config = configuration.routes.log_gate

// Define used enumerations
export const LOGGATE_TYPES = {
    REGISTER: 0,
    LOGIN: 1,
}

// Define styled components
const FadeInAnimation = styled.div`
	opacity: 0; 
	animation-name: ${keyframes`${fadeIn}`};
	animation-duration: ${route_config.animation.duration};
	animation-fill-mode: forwards;
	animation-delay: ${route_config.animation.delay};
`

// Define route
class LogGate extends React.Component{

	// Set default state
	default_state = {
		sub_route_config: null,
		label: {
			link: ""
		},
		inputs: {
			full_name: {
				value: "",
				validity: VERIFIED_STATE.EMPTY
			},
			email: {
				value: "",
				validity: VERIFIED_STATE.EMPTY
			},
			password: {
				value: "",
				validity: VERIFIED_STATE.EMPTY
			}
		},
		redirect: {
			needed: false,
			link: "",
			optional_details: {
				full_name: "",
				alerts: []
			}
		},
		toast: {
			title: "",
			body: "",
			refresh_token: -1
		},
	}
	state = JSON.parse(JSON.stringify(this.default_state))

	// Method that prepares the component state
	componentWillMount(){

		var toast_body

		if (this.state.sub_route_config == null){

			// Set specific state
			switch (this.props.type){

				case LOGGATE_TYPES.REGISTER:
					toast_body = configuration.routes.register.toasts.bodies.welcome
					this.setState({
						sub_route_config: configuration.routes.register,
						label: {
							link: router_config.login
						},
						redirect: {
							needed: false,
							link: router_config.login
						},
					})
					break

				case LOGGATE_TYPES.LOGIN:
					toast_body = configuration.routes.login.toasts.bodies.welcome
					this.setState({
						sub_route_config: configuration.routes.login,
						label: {
							link: router_config.register
						},
						redirect: {
							needed: false,
							link: router_config.dashboard
						}
					})
					break

				default:
					break

			}

			// Launch toast
			this.launchToastNotification(all_routes_config.toasts.titles.notification, toast_body)
			
		}

	}

	// Method that launches a toast notification
	launchToastNotification(title, body, callback){

		// Set the new state and, if exists, call the callback
		this.setState({
			toast: {
				title: title,
				body: body,
				refresh_token: Math.random()
			}
		}, () => {

			if (callback)
				callback()

		})

	}

	// Method that handles the change of the input fields
	handleChange = event => {

		var {name, value} = event.detail.target
		var new_state = this.state.inputs

		new_state[name].value = value
		new_state[name].validity = Number(event.type)
		this.setState({
			inputs: new_state
		})

	}

	// Method that sends the credentials to server to be checked for login
	verifyLoginCredentials(email, password){

		// Call the APIWorker's login methods
		APIWorkerInstance.login(email, password).then(result => {

			var {status, full_name, alerts} = result

			// Verify the result of the request
			switch (status){

				case LOGIN_RESULT.SUCCESS:

					// Launch notification and redirect
					this.launchToastNotification(all_routes_config.toasts.titles.notification, this.state.sub_route_config.toasts.bodies.correct_credentials, () => {
						setTimeout(() => {
							this.redirectUser(full_name, alerts)
						}, 3000)
					})
					break

				case LOGIN_RESULT.INVALID_CREDENTIALS:
					this.launchToastNotification(all_routes_config.toasts.titles.notification, this.state.sub_route_config.toasts.bodies.incorrect_credentials)
					break
				
				case LOGIN_RESULT.FAIL:
					this.launchToastNotification(all_routes_config.toasts.titles.notification, this.state.sub_route_config.toasts.bodies.fail)
					break
				
				default:
					break

			}

				

		})

	}

	// Method that sends the informations to server to create a new user
	createNewUser(full_name, email_address, password){
			
		// Call the APIWorker's register methods
		APIWorkerInstance.register(full_name, email_address, password).then(result => {
				
			// Verify the result of the request
			switch (result){

				case REGISTER_RESULT.SUCCESS:

					// Launch notification and redirect
					this.launchToastNotification(all_routes_config.toasts.titles.notification, this.state.sub_route_config.toasts.bodies.valid_credentials, () => {
						setTimeout(() => {
							this.redirectUser()
						}, 3000)
					})
					break
				
				case REGISTER_RESULT.EMAIL_ALREADY_USED:
					this.launchToastNotification(all_routes_config.toasts.titles.notification, this.state.sub_route_config.toasts.bodies.email_already_used)
					break
				
				case REGISTER_RESULT.FAIL:
					this.launchToastNotification(all_routes_config.toasts.titles.notification, this.state.sub_route_config.toasts.bodies.fail)
					break

				default:
					break

			}

		})

	}

	// Method that redirects the user to the next page
	redirectUser(full_name, alerts){

		var redirect_state = this.state.redirect

		redirect_state.needed = true
		redirect_state.optional_details = {
			full_name: full_name,
			alerts: alerts
		}
		this.setState({
			redirect: redirect_state,
		})

	}

	// Method that handles the form submit
	submitForm(){

		switch (this.props.type){

			case LOGGATE_TYPES.REGISTER:

				// Verify input fields
				if (this.state.inputs.full_name.validity === VERIFIED_STATE.LEGAL && this.state.inputs.email.validity === VERIFIED_STATE.LEGAL && this.state.inputs.password.validity === VERIFIED_STATE.LEGAL){
					this.createNewUser(this.state.inputs.full_name.value, this.state.inputs.email.value, this.state.inputs.password.value)
					return
				}
				break

			case LOGGATE_TYPES.LOGIN:

				// Verify input fields
				if (this.state.inputs.email.validity === VERIFIED_STATE.LEGAL && this.state.inputs.password.validity === VERIFIED_STATE.LEGAL){
					this.verifyLoginCredentials(this.state.inputs.email.value, this.state.inputs.password.value)
					return
				}
				break

			default:
				break

		}
		
		// Launch toast if the credentials are invalid
		this.launchToastNotification(all_routes_config.toasts.titles.error, this.state.sub_route_config.toasts.bodies.credentials_error)

	}

	// Method that renders the element
	render(){

		const {history, location} = this.props

		// Check if a redirect is needed
		if (this.state.redirect.needed){
			history.push(location.pathname)
			return (
				<Redirect to={
					{
						pathname: this.state.redirect.link,
						state: this.state.redirect.optional_details
					}
				}/>
			)
		}

		// Generate inputs
		var inputs = this.state.sub_route_config.inputs.map((element, index) => {
			return (
				<VerifiedInputControl 
					verifiedType={element.verified_type} 
					name={element.name} 
					placeholder={element.placeholder} 
					onChange={this.handleChange} 
					value={this.state.inputs[element.name].value}
				/>
			)
		})

		// Return
		return (

			<div id="LogGateRoute">

				{/* Video player and its filter*/}
				<Player
					src={route_config.background_video.source} 
					autoPlay muted loop 
					className="BackgroundVideo"
				/>
				<Container className="BackgroundVideoFilter"></Container>

				{/* Inputs */}
				<Col lg={{span: 6, offset: 3}} className="FloatingContainer">
					<FadeInAnimation>
						<Image src={all_routes_config.logo.black_source} alt={all_routes_config.logo.alt_text}/>
						{inputs}
						<Button onClick={this.submitForm.bind(this)}>
							{this.state.sub_route_config.button.text}
						</Button>
					</FadeInAnimation>
				</Col>

				{/* Bottom label */}
				<Col lg={{span: 6, offset: 3}} className="BottomLabel">
					<FadeInAnimation>
						{this.state.sub_route_config.labels.first_part}
						<a href={this.state.label.link}>
							{this.state.sub_route_config.labels.link_part}
						</a>
						{this.state.sub_route_config.labels.last_part}
					</FadeInAnimation>
				</Col>

				{/* Toast notification */}
				<ToastNotification 
					title={this.state.toast.title} 
					body={this.state.toast.body}
					delay={all_routes_config.toasts.duration}
					refreshToken={this.state.toast.refresh_token}
					fixed={FIXED_POSITION.BOTTOM_LEFT}
					id="LogGateToastNotification"
				/>

			</div>

		)
	}

}

// Set up the required and default props
LogGate.propTypes = {
	type: PropTypes.oneOf([LOGGATE_TYPES.REGISER, LOGGATE_TYPES.LOGIN]).isRequired,
}

// Export
export default withRouter(LogGate)