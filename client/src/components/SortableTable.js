// Import libraries
import React from "react"
import PropTypes from "prop-types"

// Import components
import {Table} from "react-bootstrap"
import {FaBars, FaChevronDown, FaChevronUp} from "react-icons/fa"

// Import stylesheets
import "../style/Baseline.css"
import "../style/SortableTable.css"

// Define used enumerations
const SORT_DIRECTIONS = {
    NEUTRAL: 0,
    UP: 1,
    DOWN: 2,
}

// Define component
class SortableTable extends React.Component{

    // Default state
    default_state = {
        data: null,
        last_sort: {
            column_index: -1,
            direction: SORT_DIRECTIONS.NEUTRAL,
            indices: []
        }
    }
    state = JSON.parse(JSON.stringify(this.default_state))

    // Method that copies the data from props to state
    componentWillMount(){

        if (this.props.data !== this.state.data)
            this.setState({
                data: this.props.data,
                last_sort: {
                    indices: Array.from(Array(this.props.data.length).keys())
                }
            })

    }

    // Method to gets to the next sort direction
    getNextSortDirection(direction){

        switch (direction){
            case SORT_DIRECTIONS.NEUTRAL:
                return SORT_DIRECTIONS.UP
            case SORT_DIRECTIONS.UP:
                return SORT_DIRECTIONS.DOWN
            case SORT_DIRECTIONS.DOWN:
                return SORT_DIRECTIONS.NEUTRAL
            default:
                break
        }
        
    }

    // Method that handles the click of a sort button
    sortRowsBySpecificColumn(column_index){

        var direction = this.state.last_sort.direction
        var sorted_data, indexed_sorted_data, indices, sign

        // Get direction
        if (this.state.last_sort.column_index !== column_index)
            direction = SORT_DIRECTIONS.UP
        else
            direction = this.getNextSortDirection(direction)

        // Decide if a sort is needed
        if (direction !== SORT_DIRECTIONS.NEUTRAL){

            sorted_data = this.state.data.splice()

            // Get the sign used in the sort
            sign = (direction === SORT_DIRECTIONS.UP) ? 1 : -1

            // Create an indexed copy that will be sorted, based on values
            indexed_sorted_data = this.props.data.map(function(value, index){
                return {
                    index: index, 
                    value: value
                }
            })
            indexed_sorted_data.sort((a, b) => (sign) * (b.value[column_index] - a.value[column_index]))

            // Get indexes
            indices = indexed_sorted_data.map(function(element){
                return element.index
            })
            sorted_data = indexed_sorted_data.map(function(element){
                return element.value
            })

        }
        else{

            // Reinitialize original datas
            sorted_data = this.props.data
            indices = Array.from(Array(sorted_data.length).keys())

        }

        // Set the new state
        this.setState({
            data: sorted_data,
            last_sort: {
                column_index: column_index,
                direction: direction,
                indices: indices
            }
        })

    }

    // Method that renders the component
    render(){

        var highlighted_lines = this.props.highlightedLinesIndexes

        // Generate table head
		var table_head = this.props.columnNames.map((element, index) => {

            var element_button

            // Get button that will be showed for each column
            if (element.sortable)
                if (this.state.last_sort.column_index === index)
                    if (this.state.last_sort.direction === SORT_DIRECTIONS.UP)
                        element_button = <FaChevronDown className="SortDown" onClick={this.sortRowsBySpecificColumn.bind(this, index)}/>
                    else if (this.state.last_sort.direction === SORT_DIRECTIONS.DOWN)
                        element_button = <FaChevronUp className="SortUp" onClick={this.sortRowsBySpecificColumn.bind(this, index)}/>
                    else
                        element_button = <FaBars className="SortNeutral" onClick={this.sortRowsBySpecificColumn.bind(this, index)}/>
                else
                    element_button = <FaBars className="SortNeutral" onClick={this.sortRowsBySpecificColumn.bind(this, index)}/>

			return (
				<th>
                    {element.name}
                    {element_button}
                </th>
            )

        })

        // Generate table body
        var table_body = this.state.data.map((element, index) => {

            var translated_highlighted_lines = []
            var stripped_class

            // Decide if the line is stripped
            highlighted_lines.forEach(element => {
                translated_highlighted_lines.push(this.state.last_sort.indices.indexOf(element))
            })
            stripped_class= (highlighted_lines.length !== 0) ? ((translated_highlighted_lines.includes(index)) ? "stripped" : "not-stripped" ) : ""

            return (
                <tr className={stripped_class}>
                    {
                        element.map(cell => {
                            return (
                                <td>{cell}</td>
                            )
                        })
                    }
                </tr>
            )

        })

        // Return
        return (

            <Table className="SortableTable">

                {/* Table head */}
                <thead>
                    <tr>
                        {table_head}
                    </tr>
                </thead>

                {/* Table body */}
                <tbody>
                    {table_body}
                </tbody>
    
            </Table>

        )

    }

}

// Set up the required and default props
SortableTable.propTypes = {
    columnNames: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.arrayOf(PropTypes.string),
        sortable: PropTypes.bool
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
    highlightedLinesIndexes: PropTypes.arrayOf(PropTypes.number)
}
SortableTable.defaultProps = {
    highlightedLinesIndexes: []
}

// Export component
export default SortableTable