import React, { Component } from 'react'
import { ListGroup, ListGroupItem, FormGroup } from 'reactstrap'

class ItemList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredItems: props.items,
      handleItemSelection: props.handleItemSelection
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(e) {
    this.setState({
      filteredItems: this.props.items
        .filter(function(item) {
          return item.displayName !== undefined && item.displayName !== null
        })
        .filter(function(item) {
          return item.displayName
            .toUpperCase()
            .includes(e.target.value.toUpperCase())
        })
    })
  }

  render() {
    return (
      <div className="householdsListHolder">
        <FormGroup>
          <input
            className="form-control"
            onChange={this.handleSearchChange}
            placeholder="Search"
          />
          <ListGroup className="itemList">
            {this.state.filteredItems.map(item => (
              <ListGroupItem
                key={item.id}
                onClick={() => {
                  return this.state.handleItemSelection(item)
                }}
              >
                {item.displayName}
              </ListGroupItem>
            ))}
          </ListGroup>
        </FormGroup>
      </div>
    )
  }
}

export default ItemList
