import 'babel-polyfill'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import wireNetwork from './net/net'
import Kiosk from './components/kiosk/Kiosk'
import Admin from './components/admin/Admin'
import AdminLogin from './components/admin/AdminLogin'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminAuthenticated: false,
      adminId: null,
      super: false
    }

    this.net = null
    this.adminLogin = this.adminLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  adminLogin(username, password) {
    this.net = wireNetwork(username, password)

    return this.net.getAdminUser(username, password).then(res => {
      const success =
        res &&
        !res.error &&
        res.username.toLowerCase() === username.toLowerCase()

      this.setState({
        adminAuthenticated: success,
        adminId: res.id,
        super: res.super
      })

      return success
    })
  }

  logout() {
    window.location = '/'
  }

  render() {
    return this.state.adminAuthenticated ? (
      <Router>
        <div className="appWrapper">
          <Switch>
            <Route
              path="/admin"
              render={() => (
                <Admin
                  net={this.net}
                  logout={this.logout}
                  adminId={this.state.adminId}
                  super={this.state.super}
                />
              )}
            />
            <Route path="/kiosk" render={() => <Kiosk net={this.net} />} />
            <Route render={() => <Redirect to="/admin" />} />
          </Switch>
        </div>
      </Router>
    ) : (
      <AdminLogin onLogin={this.adminLogin} />
    )
  }
}

export default App
