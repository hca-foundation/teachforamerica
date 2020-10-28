import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Loading from '../common/Loading'

class TimeoutModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showing: true
    }

    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    // automatically hide the modal after six seconds
    this.interval = setTimeout(() => this.toggle(), 6000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  toggle() {
    this.setState(prevState => ({
      showing: !prevState.showing
    }))
    clearInterval(this.interval)
  }

  render() {
    return (
      <Modal
        isOpen={this.state.showing}
        toggle={this.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Timed Out</ModalHeader>
        <ModalBody>For your security, your session has ended.</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default class KioskLogin extends Component {
  state = {
    firstName: '',
    lastName: '',
    pin: '',
    authenticationSucceeded: false,
    failedAttempts: 0,
    loading: false
  }

  handleLogin = event => {
    event.preventDefault()

    this.setState({ loading: true })
    this.props
      .authenticate({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        pin: this.state.pin
      })
      .then(result => {
        const success =
          result &&
          !result.error &&
          result.firstName.toLowerCase() === this.state.firstName.toLowerCase()
        this.setState({
          authenticationSucceeded: success,
          loading: false
        })

        if (success) {
          this.props.onLogin(result)
        } else {
          this.setState(prevState => ({
            failedAttempts: prevState.failedAttempts + 1
          }))
        }
      })
  }

  render() {
    return (
      <Form onSubmit={this.handleLogin} className="login">
        {this.props.userWasLoggedOut && <TimeoutModal />}
        <h1 className="u-margin-bottom-2rem">Login</h1>
        {this.state.failedAttempts > 0 && (
          <Alert color="danger">
            <strong>x</strong> Login failed, please try again
          </Alert>
        )}
        <FormGroup>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            required="required"
            value={this.state.firstName}
            autoComplete="new-password"
            onChange={event => this.setState({ firstName: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            required="required"
            value={this.state.lastName}
            autoComplete="new-password"
            onChange={event => this.setState({ lastName: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="pin"
            id="pin"
            placeholder="PIN"
            required="required"
            value={this.state.pin}
            autoComplete="new-password"
            onChange={event => this.setState({ pin: event.target.value })}
            pattern="[0-9]*"
            size="4"
            maxLength="4"
            minLength="4"
          />
        </FormGroup>
        <Button disabled={this.state.loading}>Login</Button>
        {this.state.loading && <Loading />}
      </Form>
    )
  }
}
