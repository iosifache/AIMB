// Import libraries
import React from "react"
import {withRouter} from "react-router-dom"
import PropTypes from "prop-types"

// Import components
import {Redirect} from "react-router-dom"
import {Container, Col, Button, Image} from "react-bootstrap"
import {Player} from "video-react"
import styled, {keyframes} from "styled-components"
import {fadeIn} from "react-animations"
import VerifiedInputControl from "../components/VerifiedInputControl"
import ToastNotification from "../components/ToastNotification"

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
		label_link: null,
		redirect: {
			needed: false,
			link: ""
		},
		toast: {
			title: all_routes_config.toasts.titles.notification,
			body: "",
			refresh_token: 0
		},
		inputs: {
			full_name: {
				value: "",
				validity: ""
			},
			email: {
				value: "",
				validity: ""
			},
			password: {
				value: "",
				validity: ""
			}
		}
	}
	state = this.default_state

	// Constructor
	constructor(){

		super()
		this.submitForm = this.submitForm.bind(this)

	}

	// Method that handles the mount of the component
	componentWillMount(){

		var toast_config = this.state.toast

		switch (this.props.type){
			case "login":
				toast_config.body = configuration.routes.login.toasts.bodies.welcome
				this.setState({
					sub_route_config: configuration.routes.login,
					label_link: router_config.register,
					toast: toast_config,
					redirect: {
						needed: false,
						link: router_config.dashboard
					}
				})
				break
			case "register":
				toast_config.body = configuration.routes.register.toasts.bodies.welcome
				this.setState({
					sub_route_config: configuration.routes.register,
					label_link: router_config.login,
					toast: toast_config,
					redirect: {
						needed: false,
						link: router_config.login
					},
				})
				break
			default:
				break
			
		}

	}

	// Method that handles the change of the input fields
	handleChange = event => {

		var {name, value} = event.detail.target
		var new_state = this.state

		new_state.inputs[name].value = value
		new_state.inputs[name].validity = event.type
		this.setState(new_state)

	}

	// Method that redirects the user to the next page
	redirectUser(){

		var redirect_state = this.state.redirect

		redirect_state.needed = true
		this.setState({
			redirect: redirect_state
		})

	}

	// Method that sends the credentials to server to be checked for login
	verifyLoginCredentials(email, password){

		this.redirectUser()

	}

	// Method that sends the informations to server to create a new user
	createNewUser(full_name, email, password){

		this.redirectUser()

	}

	// Method that handles the form submit
	submitForm(){

		switch (this.props.type){
			case "login":
				if (this.state.inputs.email.validity === "legal" && this.state.inputs.password.validity === "legal"){
					this.verifyLoginCredentials(this.state.inputs.email.value, this.state.inputs.password.value)
					return
				}
				break
			case "register":
				if (this.state.inputs.full_name.validity === "legal" && this.state.inputs.email.validity === "legal" && this.state.inputs.password.validity === "legal"){
					this.createNewUser(this.state.inputs.full_name.value, this.state.inputs.email.value, this.state.inputs.password.value)
					return
				}
				break
			default:
				break
		}

		this.setState({
			toast: {
				title: all_routes_config.toasts.titles.error,
				body: this.state.sub_route_config.toasts.bodies.credentials_error,
				refresh_token: Math.random()
			}
		})

	}

	// Render
	render(){

		const {history, location} = this.props

		// Check if redirect
		if (this.state.redirect.needed){
			history.push(location.pathname)
			return <Redirect to={
				{
					pathname: this.state.redirect.link,
					state: {}
				}
			}/>
		}

		// Generate inputs
		var inputs = this.state.sub_route_config.inputs.map((element, index) => {
			return (
				<VerifiedInputControl type={element.type} verifiedType={element.verified_type} name={element.name} placeholder={element.placeholder} onChange={this.handleChange} value={this.state.inputs[element.name].value}/>
			)
		})

		// Return
		return (

			<div id="LogGateRoute">

				<Player autoPlay muted loop src={route_config.background_video.source} className="BackgroundVideo"></Player>
				<Container className="BackgroundVideoFilter"></Container>

				<Col md={{span: 6, offset: 3}} className="FloatingContainer">
					<FadeInAnimation>
						<Image src={all_routes_config.logo.black_source}></Image>
						{inputs}
						<Button onClick={this.submitForm}>{this.state.sub_route_config.button.text}</Button>
					</FadeInAnimation>
				</Col>

				<Col md={{span: 6, offset: 3}} className="BottomLabel">
					<FadeInAnimation>
						{this.state.sub_route_config.labels.first_part}
						<a href={this.state.label_link}>
							{this.state.sub_route_config.labels.link_part}
						</a>
						{this.state.sub_route_config.labels.last_part}
					</FadeInAnimation>
				</Col>

				<ToastNotification 
					title={this.state.toast.title} 
					body={this.state.toast.body}
					delay={all_routes_config.toasts.duration}
					refreshToken={this.state.toast.refresh_token}
					show fixed="bottom-left" 
				/>

			</div>

		)
	}

}

// Set up the required and default props
LogGate.propTypes = {
	type: PropTypes.oneOf(["login", "register"]),
}

// Export
export default withRouter(LogGate)