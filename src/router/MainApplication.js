// Import libraries
import React, {Suspense, lazy} from "react"

// Import components
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Loading from "../routes/Loading"

// Import configuration
import configuration from "../configuration/index"

// Get configuration
var router_config = configuration.router
var all_routes_config = configuration.routes.all

// Create lazy loading modules for routes
const LogGate = lazy(() => {
	return new Promise(resolve => {
	  setTimeout(() => resolve(import("../routes/LogGate")), all_routes_config.loading.delay)
	})
})
const Dashboard = lazy(() => {
	return new Promise(resolve => {
	  setTimeout(() => resolve(import("../routes/Dashboard")), all_routes_config.loading.delay)
	})
})
const NotFounded = lazy(() => {
	return new Promise(resolve => {
	  setTimeout(() => resolve(import("../routes/NotFounded")), all_routes_config.loading.delay)
	})
})

// Define derivated routes
const Login = () => <LogGate type="login"></LogGate>
const Register = () => <LogGate type="register"></LogGate>

// Define component
const MainApplication = () => (

	<Router>
		<Suspense fallback={<Loading/>}>
			<Switch>
				<Route exact path={router_config.home} component={Login}/>
				<Route path="/loading" component={Loading}/>
				<Route path={router_config.login} component={Login}/>
				<Route path={router_config.register} component={Register}/>
				<Route path={router_config.dashboard} component={Dashboard}/>
				<Route path={router_config.default} component={NotFounded}/>
			</Switch>
		</Suspense>
	</Router>

)

// Export
export default MainApplication