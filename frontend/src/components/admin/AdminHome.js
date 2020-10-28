import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

class AdminHome extends Component {
  componentDidMount() {
    this.props.setLogoBarTitle('Home')
  }

  render() {
    return (
      <Container className="adminHome">
        <h3 className="adminHome-message">Select group to message</h3>
        <Row>
          <Col sm={{ size: 6 }}>
            <Link
              className="adminHome-button"
              to={{
                pathname: '/admin/message',
                search: '?group=all&display-name=All',
                state: { group: 'all' }
              }}
            >
              All
            </Link>
          </Col>
          <Col sm={{ size: 6 }}>
            <Link className="adminHome-button" to="/admin/sites">
              Locations
            </Link>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 6 }}>
            <Link className="adminHome-button" to="/admin/classrooms">
              Classrooms
            </Link>
          </Col>
          <Col sm={{ size: 6 }}>
            <Link className="adminHome-button" to="/admin/families">
              Families
            </Link>
          </Col>
        </Row>
        <Row>
          {this.props.super && (
            <Col sm={{ size: 6 }}>
              <Link
                className="adminHome-button adminHome-button--green"
                to="/admin/admin-mgmt"
              >
                Admin Management
              </Link>
            </Col>
          )}
          <Col sm={{ size: this.props.super ? 6 : 12 }}>
            <div
              className="adminHome-button adminHome-button--green adminHome-logout"
              onClick={this.props.logout}
            >
              Logout
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AdminHome
