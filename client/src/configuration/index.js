// Import configuration
import api_config from "./api"
import router_config from "./router"
import routes_config from "./routes"
import sectors_margins_config from "./sectors_margins"

// Define global configuration object
const config = {
	api: api_config,
	router: router_config,
	routes: routes_config,
	sectors_margins: sectors_margins_config
}

// Export
export default config