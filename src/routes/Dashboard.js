// Import libraries
import React from "react"
import {withRouter} from "react-router"

// Import components
import {Container, Navbar, Nav} from "react-bootstrap"
import {MdAddAlert} from "react-icons/md"
import {FiLogOut} from "react-icons/fi"
import ReactMapGL from "react-map-gl";
import SortableTable from "../components/SortableTable"

// Import stylesheets
import "../style/Baseline.css"
import "../style/Dashboard.css"

// Import configuration
import configuration from "../configuration/index"

// Get configuration
var all_routes_config = configuration.routes.all
var route_config = configuration.routes.dashboard

// Define component
class Dashboard extends React.Component{

    // Default state
    default_state = {
        viewport: route_config.map.default_viewport,
        data: this.generateDatas()
    }
    state = this.default_state

    // Method that modifies the viewport
    _onViewportChange = viewport => this.setState({viewport});

    // Method for generating datas (will be removed after connecting to API)
    generateDatas(){

        var data = []

        for (var i = 1; i < 7; i++){
            data.push(["Sector " + i, Math.floor(Math.random() *  10000), Math.floor(Math.random() *  10), Math.floor(Math.random() *  10)])
        }
        return data

    }

	// Render
	render(){

        const {viewport} = this.state
        var data = this.state.data

		// Return
		return (

            <div id="DashboardRoute">

                <Navbar bg="dark" variant="dark" id="menu">
                        <Container>
                        <Navbar.Brand>
                            <img
                                alt={all_routes_config.app_details.name.short}
                                src={all_routes_config.logo.white_source}
                                className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <Nav.Link>
                                    <MdAddAlert/>
                                    {route_config.menu.items.alerts}
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link>
                                    <FiLogOut/>
                                    {route_config.menu.items.logout}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>

                <div id="MapContainer">
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={all_routes_config.secrets.mapbox_token}
                        width="100%" height="100%" className="map"
                        onViewportChange={this._onViewportChange}
                        mapStyle="mapbox://styles/iosifache/ck8dao8c20voi1io4kjur93v6"
                    />
                </div>

                <SortableTable columnNames={route_config.table.column_names} data={data}/>

            </div>
		
		)

	}
}

// Export
export default withRouter(Dashboard)