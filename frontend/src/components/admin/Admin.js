import React, { Component } from 'react'
import { Route, Redirect, Link } from 'react-router-dom'
import AdminHome from './AdminHome'
import Families from './Families'
import Classrooms from './Classrooms'
import Sites from './Sites'
import Message from './Message'
import AdminMgmt from './AdminMgmt'
import logo from '../../assets/logo.png'

const LogoBar = props => (
  <div className="logobar">
    <h1 className="logobar-title">{props.logoBarTitle}</h1>
    <div className="logo">
      <Link to="/admin/home" title="Go to McNeilly Admin Home">
        <img
          src={logo}
          width="85px"
          height="70px"
          className="pull-right"
          alt="The McNeilly Center for Children"
        />
      </Link>
    </div>
  </div>
)

function Footer({ show }) {
  if (show) {
    return (
      <div className="footer">
        <Link className="footer-text" to={{ pathname: '/admin/home' }}>
          Return to Home
        </Link>
      </div>
    )
  } else {
    return null
  }
}

class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logoBarTitle: 'Title'
    }

    this.setLogoBarTitle = this.setLogoBarTitle.bind(this)
  }

  setLogoBarTitle(logoBarTitle) {
    this.setState({ logoBarTitle })
  }

  render() {
    return (
      <div className="adminContainer">
        <LogoBar logoBarTitle={this.state.logoBarTitle} />

        <Route
          exact
          path="/admin"
          render={() => <Redirect to="/admin/home" />}
        />
        <Route
          exact
          path="/admin/home"
          render={() => {
            return (
              <AdminHome
                logout={this.props.logout}
                setLogoBarTitle={this.setLogoBarTitle}
                super={this.props.super}
              />
            )
          }}
        />
        <Route
          path="/admin/classrooms"
          render={() => {
            return (
              <Classrooms
                getAllClassrooms={this.props.net.getAllClassrooms}
                getAllLocations={this.props.net.getAllLocations}
                setLogoBarTitle={this.setLogoBarTitle}
              />
            )
          }}
        />
        <Route
          path="/admin/families"
          render={() => {
            return (
              <Families
                net={this.props.net}
                setLogoBarTitle={this.setLogoBarTitle}
              />
            )
          }}
        />
        <Route
          path="/admin/message"
          render={({ location }) => {
            return (
              <Message
                location={location}
                sendMessage={this.props.net.sendMessage}
                setLogoBarTitle={this.setLogoBarTitle}
              />
            )
          }}
        />
        <Route
          path="/admin/sites"
          render={() => {
            return (
              <Sites
                getAllLocations={this.props.net.getAllLocations}
                setLogoBarTitle={this.setLogoBarTitle}
              />
            )
          }}
        />
        <Route
          path="/admin/admin-mgmt"
          render={() => {
            return (
              <AdminMgmt
                setLogoBarTitle={this.setLogoBarTitle}
                net={this.props.net}
                adminId={this.props.adminId}
                super={this.props.super}
                logout={this.props.logout}
              />
            )
          }}
        />
        <Footer show={window.location.pathname !== '/admin/home'} />
      </div>
    )
  }
}

export default Admin
