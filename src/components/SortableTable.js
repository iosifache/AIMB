// Import libraries
import React from "react"
import PropTypes from "prop-types"

// Import components
import {Table} from "react-bootstrap"
import {FaSort, FaSortUp, FaSortDown} from "react-icons/fa"

// Import stylesheets
import "../style/Baseline.css"
import "../style/SortableTable.css"

// Define component
class SortableTable extends React.Component{

    // Default state
    default_state = {
        column_names: null,
        data: null,
        last_column_index: -1,
        direction: 1
    }
    state = this.default_state

    // Constructor
    constructor(){

        super()
        this.sortByColumn = this.sortByColumn.bind(this)

    }

    // Function that handles the click of a sort button
    sortByColumn(column_index){
    
        var new_data = this.props.data
        var direction = (this.state.last_column_index !== column_index) ? 1 : -(this.state.direction)
    
        new_data.sort((a, b) => (direction) * (b[column_index] - a[column_index]))
        this.setState({
            data: new_data,
            last_column_index: column_index,
            direction: direction
        })

    }

    render(){

        // Generate table head
		var table_head = this.props.columnNames.map((element, index) => {
			return (
				<th>
                    {element.name}
                    {
                        (element.sortable) ? (
                            (this.state.last_column_index === index) ? (
                                (this.state.direction === 1) ? (
                                    <FaSortDown onClick={this.sortByColumn.bind(this, index)}/>
                                ) : (
                                    <FaSortUp onClick={this.sortByColumn.bind(this, index)}/>
                                )
                            ) : (
                                <FaSort onClick={this.sortByColumn.bind(this, index)}/>
                            )
                            
                        ) : (
                            ""
                        )
                    }
                </th>
			)
        })

        // Generate table body
        var table_body = this.props.data.map(element => {
            return (
                <tr>
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
                <thead>
                    <tr>
                        {table_head}
                    </tr>
                </thead>
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
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired
}

// Export component
export default SortableTable