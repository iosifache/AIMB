// Import libraries
import React from "react"
import {withRouter} from "react-router"
import MediaQuery from 'react-responsive'

// Import components
import {Container, Navbar, Nav, Modal, Button, ListGroup, Dropdown, InputGroup, Alert} from "react-bootstrap"
import ReactMapGL, {Marker} from "react-map-gl"
import {Redirect} from "react-router-dom"
import {FiLogOut} from "react-icons/fi"
import {FaCity, FaTrashAlt, FaBell, FaChevronRight, FaMap, FaCalculator} from "react-icons/fa"
import VerifiedInputControl, {VERIFIED_TYPE, VERIFIED_STATE} from "../components/VerifiedInputControl"
import SortableTable from "../components/SortableTable"
import ToastNotification, {FIXED_POSITION} from "../components/ToastNotification"
import Error, {ERROR_TYPES} from "../routes/Error"

// Import stylesheets
import "../style/Baseline.css"
import "../style/Dashboard.css"

// Import configuration
import configuration from "../configuration/index"
import {Row} from "react-bootstrap"
import APIWorkerInstance from "../helpers/APIWorker"

// Get configuration
var all_routes_config = configuration.routes.all
var router_config = configuration.router
var route_config = configuration.routes.dashboard

// Define enumerations
const MODAL_VARIANTS = {
	LIST: 0,
	ADD: 1
}
const VIEW_VARIANTS = {
	BIRDVIEW: 0,
	CALCULATOR: 1
}

// Define component
class Dashboard extends React.Component{

	// Default state
	default_state = {
		viewport: route_config.map.default_viewport,
		data: APIWorkerInstance.getRecentSectorsData(),
		highlighted_lines: [],
		current_view: VIEW_VARIANTS.CALCULATOR,
		modal_state: {
			opened: false,
			variant: MODAL_VARIANTS.LIST,
			new_alert: {
				score_id: -1,
				sector_id: -1,
				operation_id: -1,
				value: "",
				valid_value: VERIFIED_STATE.EMPTY
			}
		},
		calculator_state: {
			sector_id: {
				value: "",
				validity: VERIFIED_STATE.EMPTY
			},
			number_of_rooms: {
				value: "",
				validity: VERIFIED_STATE.EMPTY
			},
			number_of_square_meters: {
				value: "",
				validity: VERIFIED_STATE.EMPTY
			},
		},
		user_data: {
			existent_alerts: APIWorkerInstance.getUsersAlerts()
		},
		redirect: {
			needed: false,
			link: router_config.login
		},
		toast: {
			title: "",
			body: "",
			refresh_token: -1
		}
	}
	state = JSON.parse(JSON.stringify(this.default_state))
	
	// Method that launches a toast notification
	launchToastNotification(title, body, callback){

		// Set the new state with the new toast details
		this.setState({
			toast: {
				title: title,
				body: body,
				refresh_token: Math.random()
			}
		}, () => {

			// If exists, call the callback
			if (callback)
				callback()

		})

	}

	// Method that modifies the viewport of the map
	changeMapViewport = viewport => this.setState({viewport})

	// Method that moves the view to the birdview one
	moveToBirdview(){

		if (this.state.current_view === VIEW_VARIANTS.BIRDVIEW)

			// Refresh data
			this.setState({
				data: APIWorkerInstance.getRecentSectorsData()
			}, () => {
				this.launchToastNotification(all_routes_config.toasts.titles.notification, route_config.toasts.bodies.refreshed_datas)
			})

		else
			this.setState({
				current_view: VIEW_VARIANTS.BIRDVIEW
			})

	}

	// Method that moves the view to the calculator one
	moveToCalculator(){

		this.setState({
			current_view: VIEW_VARIANTS.CALCULATOR
		})

	}

	// Method that logs out the user
	logout(){

		var redirect_state = this.state.redirect

		if (APIWorkerInstance.logout()){
			this.launchToastNotification(all_routes_config.toasts.titles.notification, route_config.toasts.bodies.logout, () => {
				setTimeout(() => {
					redirect_state.needed = true
					this.setState({
						redirect: redirect_state
					})
				}, 3000)
			})
		}

	}

	// Method for setting the highlighted line from sortable table
	setHighlightedLine(index){

		this.setState({
			highlighted_lines: [index]
		})

	}

	// Method for clearing the highlighted line from sortable table
	clearHighlightedLine(){

		this.setState({
			highlighted_lines: []
		})

	}

	// Method that sets a value from the calculator
	setNewCalculatorValue = event => {

		var {name, value} = event.detail.target
		var old_modal_state = this.state.calculator_state

		old_modal_state[name].value = value
		old_modal_state[name].validity = Number(event.type)
		this.setState({
			calculator_state: old_modal_state
		})

	}

	// Method that computes the value of the apartment
	computeApartmentPrice(){

		//

	}

	// Method that sets the modal's opening
	setModalOpening(state){

		var old_modal_state = this.state.modal_state

		old_modal_state.opened = state
		if (!state){
			old_modal_state.variant = MODAL_VARIANTS.LIST
			this.clearNewAlertDetailsFromModal()
		}
		this.setState({
			modal_state: old_modal_state
		})

	}

	// Method that sets the modal variant
	toggleModalVariant(){

		var old_modal_state = this.state.modal_state

		if (old_modal_state.variant === MODAL_VARIANTS.LIST)
			old_modal_state.variant = MODAL_VARIANTS.ADD
		else
			old_modal_state.variant = MODAL_VARIANTS.LIST
		this.setState({
			modal_state: old_modal_state
		})

	}

	// Method that removes an existent alert
	removeExistentAlert(alert_id){

		var old_state = this.state

		if (APIWorkerInstance.removeAlert(alert_id)){
			old_state.user_data.existent_alerts.splice(alert_id, 1)
			this.setState(old_state, () => {
				this.launchToastNotification(all_routes_config.toasts.titles.notification, route_config.toasts.bodies.deleted_alert)
			})
			
		}

	}

	// Method that sets the value from the new alert's details
	setNewAlertValue = event => {

		var {value} = event.detail.target
		var old_modal_state = this.state.modal_state

		old_modal_state.new_alert.value = value
		old_modal_state.new_alert.valid_value = Number(event.type)
		this.setState({
			modal_state: old_modal_state
		})

	}

	// Method that changes the dropdown values the new alert's details
	setNewAlertDropdownValue(eventKey, event){
		
		var modal_state = this.state.modal_state

		eventKey = JSON.parse("[" + eventKey + "]")
		switch (eventKey[0]){
			case 0:
				modal_state.new_alert.score_id = eventKey[1]
				break
			case 1:
				modal_state.new_alert.sector_id = eventKey[1]
				break
			case 2:
				modal_state.new_alert.operation_id = eventKey[1]
				break
			default:
				break
		}
		this.setState({modal_state: modal_state})

	}

	// Method that clears the new alert's details
	clearNewAlertDetailsFromModal(){

		var new_state = this.state

		new_state.modal_state.new_alert = Object.assign({}, this.default_state.modal_state.new_alert)
		this.setState(new_state)

	}

	// Method that adds the alert
	addNewAlert(){

		var new_state = this.state
		var new_object = Object.assign({}, new_state.modal_state.new_alert)
		var alert_data = this.state.modal_state.new_alert

		// Check if all alert details are completed
		if (alert_data.score_id === -1 || alert_data.sector_id === -1 || alert_data.operation_id === -1 || alert_data.value === "" || alert_data.valid_value !== VERIFIED_STATE.LEGAL){
			this.launchToastNotification(all_routes_config.toasts.titles.alert, route_config.toasts.bodies.invalid_alert)
			return
		}

		// Create alert
		if (APIWorkerInstance.createAlert(alert_data.score_id, alert_data.sector_id, alert_data.operation_id, alert_data.value)){
			new_state.user_data.existent_alerts.push(new_object)
			this.setState(new_state, () => {
				this.toggleModalVariant()
				this.clearNewAlertDetailsFromModal()
				this.launchToastNotification(all_routes_config.toasts.titles.notification, route_config.toasts.bodies.added_alert)
			})
		}

	}

	// Method that renders the component
	render(){

		const {viewport, modal_state, data, calculator_state} = this.state
		const {history, location} = this.props
		var table_data = []

		// Check if redirect
		if (this.state.redirect.needed){
			history.push(location.pathname)
			return (
				<Redirect to={
					{
						pathname: this.state.redirect.link,
						state: {}
					}
				}/>
			)
		}

		// Translate data in the table format
		data.forEach(element => {
			table_data.push([element.name, element.average_price_per_room, element.average_price_per_square_meter, element.average_air_quality, element.score])
		})

		// Generate markers for map
		var markers = route_config.map.pinned_locations.map((element, index) => {
			return (
				<Marker 
					latitude={element.latitude} longitude={element.longitude} 
					offsetLeft={-20} offsetTop={-10}
				>
					<FaCity 
						className="marker" 
						onMouseEnter={() => this.setHighlightedLine(index)} 
						onMouseLeave={() => this.clearHighlightedLine()}
					/>
				</Marker>
			)
		})

		// Generate modal's elements
		var score_options = route_config.modals.both.scores.map((element, key) => {
			return (
				<Dropdown.Item eventKey={[0, key]}>{element}</Dropdown.Item>
			)
		})
		var sector_options = route_config.map.pinned_locations.map((element, key) => {
			return (
				<Dropdown.Item eventKey={[1, key]}>{element.name}</Dropdown.Item>
			)
		})
		var operation_options = route_config.modals.both.operations.map((element, key) => {
			return (
				<Dropdown.Item eventKey={[2, key]}>{element}</Dropdown.Item>
			)
		})
		var existent_alerts = this.state.user_data.existent_alerts.map((element, key) => {
	
			var score = route_config.modals.both.scores[element.score_id]
			var sector = route_config.map.pinned_locations[element.sector_id].name
			var operation = route_config.modals.both.operations[element.operation_id]

			return (
				<ListGroup.Item>
					{route_config.modals.both.labels.value} <b>{score}</b> {route_config.modals.both.labels.for}  <b>{sector}</b> {route_config.modals.both.labels.is} <b>{operation}</b> {route_config.modals.both.labels.compared_value} <b>{element.value}</b>{route_config.modals.both.labels.end} 
					<FaTrashAlt key={key} onClick={this.removeExistentAlert.bind(this, key)}/>
				</ListGroup.Item>
			)

		})

		// Get selected options for dropdowns
		var score_class, sector_class, operation_class
		var selected_score, selected_sector, selected_operation
		if (modal_state.new_alert.score_id !== -1){							
			selected_score = route_config.modals.both.scores[modal_state.new_alert.score_id]
			score_class = "LargeDropdown choosed"
		}
		else{
			selected_score = ""
			score_class = "LargeDropdown"
		}
		if (modal_state.new_alert.sector_id !== -1){
			selected_sector = route_config.map.pinned_locations[modal_state.new_alert.sector_id].name
			sector_class = "LargeDropdown choosed"
		}
		else{
			selected_sector = ""
			sector_class = "LargeDropdown"
		}
		if (modal_state.new_alert.operation_id !== -1){
			selected_operation = route_config.modals.both.operations[modal_state.new_alert.operation_id]
			operation_class = "LargeDropdown choosed"
		}
		else{
			selected_operation = ""
			operation_class = "LargeDropdown"
		}
		
		// Return
		return (

			<div id="DashboardRoute">

				<MediaQuery minWidth={1000}>

					{/* Modal for working with alerts */}
					<Modal 
						id="AlertsModal" 
						show={modal_state.opened}
						size="lg" centered
						onHide={this.setModalOpening.bind(this, false)}
					>

						{/* Modal header */}
						<Modal.Header closeButton>
							<Modal.Title>
								{
									(this.state.modal_state.variant === MODAL_VARIANTS.LIST) ? (
										route_config.modals.list.title
									) :
									(
										route_config.modals.add.title
									)
								}
							</Modal.Title>
						</Modal.Header>

						{/* Modal body */}
						<Modal.Body>
							<Container>
								{
									(this.state.modal_state.variant === MODAL_VARIANTS.LIST) ? (
											<ListGroup>
												{existent_alerts}
											</ListGroup>
									) :
									(
										<Row>
											<InputGroup className="mb-3">
												<InputGroup.Prepend className="InputPrepend">
													<InputGroup.Text id="basic-addon1">{route_config.modals.both.labels.value}</InputGroup.Text>
												</InputGroup.Prepend>
												<Dropdown 
													className={score_class} 
													drop="right" 
													onSelect={(eventKey, event) => {this.setNewAlertDropdownValue(eventKey, event)}}
												>
													<Dropdown.Toggle variant="success" id="dropdown-basic">
														{selected_score}
														<FaChevronRight/>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														{score_options}
													</Dropdown.Menu>
												</Dropdown>
											</InputGroup>
											<InputGroup className="mb-3">
												<InputGroup.Prepend className="InputPrepend">
													<InputGroup.Text id="basic-addon1">{route_config.modals.both.labels.for}</InputGroup.Text>
												</InputGroup.Prepend>
												<Dropdown 
													className={sector_class}
													drop="right"
													onSelect={(eventKey, event) => {this.setNewAlertDropdownValue(eventKey, event)}}
												>
													<Dropdown.Toggle variant="success" id="dropdown-basic">
														{selected_sector}
														<FaChevronRight/>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														{sector_options}
													</Dropdown.Menu>
												</Dropdown>
											</InputGroup>
											<InputGroup className="mb-3">
												<InputGroup.Prepend className="InputPrepend">
													<InputGroup.Text id="basic-addon1">{route_config.modals.both.labels.is}</InputGroup.Text>
												</InputGroup.Prepend>
												<Dropdown 
													className={operation_class}
													drop="right" 
													onSelect={(eventKey, event) => {this.setNewAlertDropdownValue(eventKey, event)}}
												>
													<Dropdown.Toggle variant="success" id="dropdown-basic">
														{selected_operation}
														<FaChevronRight/>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														{operation_options}
													</Dropdown.Menu>
												</Dropdown>
											</InputGroup>
											<InputGroup className="mb-3">
												<InputGroup.Prepend className="InputPrepend">
													<InputGroup.Text id="basic-addon1">{route_config.modals.both.labels.compared_value}</InputGroup.Text>
												</InputGroup.Prepend>
												<VerifiedInputControl 
													verifiedType={VERIFIED_TYPE.NUMBERS}
													name="value" 
													value={modal_state.new_alert.value} 
													placeholder="" 
													onChange={this.setNewAlertValue.bind(this)}
												/>
											</InputGroup>
										</Row>
									)
								}
							</Container>
						</Modal.Body>

						{/* Modal footer */}
						<Modal.Footer>
							<Button onClick={this.setModalOpening.bind(this, false)}>
								{route_config.modals.both.buttons.close}
							</Button>
							<Button onClick={this.toggleModalVariant.bind(this)}>
								{
									(this.state.modal_state.variant === MODAL_VARIANTS.LIST) ? (
										route_config.modals.add.buttons.add
									) :
									(
										route_config.modals.list.buttons.list
									)
								}
							</Button>
							{
								(this.state.modal_state.variant === MODAL_VARIANTS.ADD) ? (
									<Button className="add" onClick={this.addNewAlert.bind(this)}>
										{route_config.modals.add.buttons.add_now}
									</Button>
								) :
								(
									""
								)
							}
						</Modal.Footer>

					</Modal>

					{/* Menu */}
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
									<Nav.Link onClick={this.moveToBirdview.bind(this)}>
										<FaMap/>
										{route_config.menu.items.bird_view}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link onClick={this.moveToCalculator.bind(this)}>
										<FaCalculator/>
										{route_config.menu.items.calculator}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link onClick={this.setModalOpening.bind(this, true)}>
										<FaBell/>
										{route_config.menu.items.alerts}
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link onClick={this.logout.bind(this)}>
										<FiLogOut/>
										{route_config.menu.items.logout}
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Container>
					</Navbar>

					{/* Map */}
					<div id="MapContainer">
						<ReactMapGL
							{...viewport}
							mapboxApiAccessToken={all_routes_config.secrets.mapbox_token}
							width="100%" height="100%" className="map"
							onViewportChange={this.changeMapViewport}
							mapStyle="mapbox://styles/iosifache/ck8dao8c20voi1io4kjur93v6"
						>
							{markers}
						</ReactMapGL>
					</div>

					{

						(this.state.current_view === VIEW_VARIANTS.BIRDVIEW) ? (

								<div id="TableContainer">

									<Alert variant="dark">
										<Alert.Heading>
											{route_config.table.details.title}
										</Alert.Heading>
										<p>
											{route_config.table.details.description}
										</p>
										<hr/>
										<p>
											<b>{route_config.calculator.details.note_prefix}</b>: {route_config.table.details.note}
										</p>
									</Alert>

									<SortableTable 
										columnNames={route_config.table.column_names} 
										data={table_data} 
										highlightedLinesIndexes={this.state.highlighted_lines}
									/>

								</div>
							
						) : (

							<div id="PriceCalculator">

								<Alert variant="dark">
										<Alert.Heading>
											{route_config.calculator.details.title}
										</Alert.Heading>
										<p>
											{route_config.calculator.details.description}
										</p>
										<hr/>
										<p>
											<b>{route_config.calculator.details.note_prefix}</b>: {route_config.calculator.details.note}
										</p>
									</Alert>

								{/* Input fields */}
								<VerifiedInputControl 
									type="text" verifiedType={VERIFIED_TYPE.ALPHAS}
									name="sector_id" 
									value={calculator_state.sector_id.value} 
									placeholder={route_config.calculator.inputs.labels.choosed_sector}
									onChange={this.setNewCalculatorValue.bind(this)}
									disabled
								/>
								<VerifiedInputControl 
									type="text" verifiedType={VERIFIED_TYPE.NUMBERS}
									name="number_of_rooms" 
									value={calculator_state.number_of_rooms.value} 
									placeholder={route_config.calculator.inputs.labels.number_of_rooms}
									onChange={this.setNewCalculatorValue.bind(this)}
								/>
								<VerifiedInputControl 
									type="text" verifiedType={VERIFIED_TYPE.NUMBERS}
									name="number_of_square_meters" 
									value={calculator_state.number_of_square_meters.value} 
									placeholder={route_config.calculator.inputs.labels.number_of_square_meters}
									onChange={this.setNewCalculatorValue.bind(this)}
								/>

								{/* Price Computation Button */}
								<Button onClick={this.computeApartmentPrice.bind(this)}>
									{route_config.calculator.buttons.compute}
								</Button>

							</div>

						)
					}

					{/* Toast notification */}
					<ToastNotification 
						title={this.state.toast.title} 
						body={this.state.toast.body}
						delay={all_routes_config.toasts.duration}
						refreshToken={this.state.toast.refresh_token}
						fixed={FIXED_POSITION.BOTTOM_RIGHT}
					/>

				</MediaQuery>

				<MediaQuery maxWidth={999}>
					<Error type={ERROR_TYPES.RESOLUTION_NOT_ALLOWED}/>
				</MediaQuery>

			</div>
		
		)

	}

}

// Export
export default withRouter(Dashboard)