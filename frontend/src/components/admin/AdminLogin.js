import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap'
import logo from '../../assets/logo.png'
import Loading from '../common/Loading'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    failedAttempts: 0,
    loading: false
  }

  handleLogin = event => {
    event.preventDefault()
    this.setState({ loading: true })
    this.props.onLogin(this.state.username, this.state.password).catch(() => {
      this.setState({
        loading: false,
        failedAttempts: this.state.failedAttempts + 1
      })
    })
  }

  render() {
    return (
      <div className="AdminLogin">
        <div className="AdminLogin-logo">
          <img
            src={logo}
            height="700px"
            width="662px"
            alt="The McNeilly Center for Children"
          />
        </div>

        <div className="AdminLogin-form">
          <Form onSubmit={this.handleLogin} className="login">
            <h1 className="u-margin-bottom-2rem">
              {window.location.pathname.includes('kiosk')
                ? 'Kiosk Admin Login'
                : 'Administrator Portal'}
            </h1>
            {this.state.failedAttempts > 0 && (
              <Alert color="danger">
                <strong>x</strong> Login failed, please try again
              </Alert>
            )}
            <FormGroup>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required="required"
                value={this.state.username}
                autoComplete="new-password"
                onChange={event => {
                  return this.setState({ username: event.target.value })
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required="required"
                value={this.state.password}
                autoComplete="new-password"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </FormGroup>
            <Button disabled={this.state.loading}>Login</Button>
            {this.state.loading && <Loading />}
          </Form>
        </div>
      </div>
    )
  }
}
