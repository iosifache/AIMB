// Import libraries
import React from "react"
import PropTypes from "prop-types"
import regexes from "../helpers/Regexes"

// Import componens
import {Form} from "react-bootstrap"

// Import stylesheets
import "../style/Baseline.css"
import "../style/VerifiedInputControl.css"

// Define used enumerations
export const VERIFIED_STATE = {
	EMPTY: 0,
	ILLEGAL: 1,
	LEGAL: 2
}
export const VERIFIED_TYPE = {
	NON_EMPTY: 0,
	ALPHAS: 1,
	NUMBERS: 2,
	NAME: 3,
	PASSWORD: 4,
	EMAIL: 5
}

// Define component
class VerifiedInputControl extends React.Component{

	// Default state
	default_state = {
		verified: VERIFIED_STATE.EMPTY,
		emptied: false
	}
	state = JSON.parse(JSON.stringify(this.default_state))

	// Method that handles the change of the component
	componentDidUpdate(){

		var new_state = this.state

		if (this.props.value === "" && !new_state.emptied){
			new_state.verified = VERIFIED_STATE.EMPTY
			new_state.emptied = true
			this.setState(new_state)
		}

	}

	// Method that handles the change of the content
	handleTextChange = event => {

		var {value} = event.target
		var new_state = this.state
		var new_event

		if (this.props.verifiedType === ""){
			this.props.onChange(event)
		}
		else {

			if (value === ""){
				new_state.verified = VERIFIED_STATE.EMPTY
			}
			else if (!this.validateText(this.props.verifiedType, value)){
				new_state.verified = VERIFIED_STATE.ILLEGAL
				new_state.emptied = false
			}
			else{
				new_state.verified = VERIFIED_STATE.LEGAL
				new_state.emptied = false
			}

			new_event = new CustomEvent(new_state.verified, {
				detail: {
					target: event.target
				}
			})

			this.props.onChange(new_event)
			this.setState(new_state)

		}

	}

	// Method that verifies the type of the text
	validateText(type, text){

		switch (type){
			case VERIFIED_TYPE.NON_EMPTY:
				return regexes.simple.empty.test(text)
			case VERIFIED_TYPE.ALPHAS:
				return regexes.simple.alphas.test(text)
			case VERIFIED_TYPE.NUMBERS:
				return regexes.simple.numbers.test(text)
			case VERIFIED_TYPE.NAME:
				return regexes.compound.name.test(text)
			case VERIFIED_TYPE.PASSWORD:
				return regexes.compound.password.test(text)
			case VERIFIED_TYPE.EMAIL:
				return regexes.compound.email.test(text)
			default:
				break
		}

	}

	// Method that renders the component
	render(){

		var verifiedClass, className, type

		switch (this.state.verified){
			case VERIFIED_STATE.EMPTY:
				verifiedClass = "empty"
				break
			case VERIFIED_STATE.LEGAL:
				verifiedClass = "legal"
				break
			case VERIFIED_STATE.ILLEGAL:
				verifiedClass = "illegal"
				break
			default:
				break
		}
		className = ["VerifiedInputControl", verifiedClass].join(" ")

		switch (this.props.verifiedType) {
			case VERIFIED_TYPE.NON_EMPTY:
				type = "text"
				break
			case VERIFIED_TYPE.ALPHAS:
				type = "text"
				break
			case VERIFIED_TYPE.NUMBERS:
				type = "text"
				break
			case VERIFIED_TYPE.NAME:
				type = "text"
				break
			case VERIFIED_TYPE.PASSWORD:
				type = "password"
				break
			case VERIFIED_TYPE.EMAIL:
				type = "email"
				break
			default:
				break
		}

		return (

			<Form.Control 
				name={this.props.name} 
				className={className} 
				type={type}
				disabled={this.props.disabled}
				value={this.props.value} 
				placeholder={this.props.placeholder} 
				onChange={this.handleTextChange.bind(this)}
				autoCapitalize="off" spellCheck="false" autoComplete="off" 
			/>

        )

	}

}

// Set up the required and default props
VerifiedInputControl.propTypes = {
	verifiedType: PropTypes.oneOf([VERIFIED_TYPE.NON_EMPTY, VERIFIED_TYPE.ALPHAS, VERIFIED_TYPE.NUMBERS, VERIFIED_TYPE.NAME, VERIFIED_TYPE.PASSWORD, VERIFIED_TYPE.EMAIL]),
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired
}
VerifiedInputControl.defaultProps = {
	type: "text",
	disabled: false,
	verifiedType: ""
}

// Export
export default VerifiedInputControl