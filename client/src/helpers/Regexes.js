// Define regex-container object
const regexes = {
	simple: {
		empty: /\S+/,
		numbers: /^\d*(\.){0,1}\d*$/,
		alphas: /^[a-zA-Z\s]*$/
	},
	compound: {
		name: /^[a-zA-Z-\s]*$/,
		email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
		password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
	}

}

// Export
export default regexes