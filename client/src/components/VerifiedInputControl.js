// Import libraries
import React from "react"
import PropTypes from "prop-types"
import regexes from "../helpers/Regexes"

// Import componens
import {Form} from "react-bootstrap"

// Import stylesheets
import "../style/Baseline.css"
import "../style/VerifiedInputControl.css"

// Define component
class VerifiedInputControl extends React.Component{

	// Default state
	default_state = {
		verified: "empty",
		emptied: false
	}
	state = JSON.parse(JSON.stringify(this.default_state))

	// Method that handles the change of the component
	componentDidUpdate(){

		var new_state = this.state

		if (this.props.value === "" && !new_state.emptied){
			new_state.verified = "empty"
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
				new_state.verified = "empty"
			}
			else if (!this.validateText(this.props.verifiedType, value)){
				new_state.verified = "illegal"
				new_state.emptied = false
			}
			else{
				new_state.verified = "legal"
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
			case "non-empty":
				return regexes.simple.empty.test(text)
			case "alphas":
				return regexes.simple.alphas.test(text)
			case "numbers":
				return regexes.simple.numbers.test(text)
			case "name":
				return regexes.compound.name.test(text)
			case "password":
				return regexes.compound.password.test(text)
			case "email":
				return regexes.compound.email.test(text)
			default:
				break
		}

	}

	// Method that renders the component
	render(){

		var className = ["VerifiedInputControl", this.state.verified].join(" ")

		return (

			<Form.Control 
				name={this.props.name} 
				className={className} 
				type={this.props.type}
				disabled={this.props.disabled}
				value={this.props.value} 
				placeholder={this.props.placeholder} 
				onChange={this.handleTextChange.bind(this)}
				autoCorrect="off" autoCapitalize="off" spellCheck="false" autoComplete="off" 
			/>

        )

	}

}

// Set up the required and default props
VerifiedInputControl.propTypes = {
	type: PropTypes.oneOf(["text", "number", "password", "email"]),
	verifiedType: PropTypes.oneOf(["non-empty", "alphas", "numbers", "name", "password", "email"]),
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