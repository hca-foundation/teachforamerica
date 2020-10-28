import React, { Component } from 'react'
import { Container } from 'reactstrap'
import KioskLogin from './KioskLogin'
import Update from './Update'
import Thanks from './Thanks'

const LOGIN = 'login'
const UPDATE = 'update'
const THANKS = 'thanks'
const SESSION_MAX_LENGTH = 15 * 60000 // 15 minutes

class Kiosk extends Component {
  constructor() {
    super()

    this.state = {
      contact: {},
      currentStep: LOGIN,
      updateTimeRemaining: null
    }

    this.onLogin = this.onLogin.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onEndSession = this.onEndSession.bind(this)
  }

  componentWillUnmount() {
    if (this.updateTimeRemainingInterval) {
      clearInterval(this.updateTimeRemainingInterval)
    }
  }

  startSession() {
    if (this.updateTimeRemainingInterval) {
      clearInterval(this.updateTimeRemainingInterval)
    }

    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout)
    }

    this.updateTimeRemainingInterval = setInterval(() => {
      let updateTimeRemaining = this.state.updateTimeRemaining - 1

      if (updateTimeRemaining < 0) updateTimeRemaining = 0

      this.setState({ updateTimeRemaining })
    }, 1000)

    this.sessionTimeout = setTimeout(() => {
      clearInterval(this.updateTimeRemainingInterval)
      // Destroy session data
      this.setState({ currentStep: LOGIN, household: {}, contact: null })
    }, SESSION_MAX_LENGTH)
  }

  onLogin(contact) {
    this.setState(
      {
        currentStep: UPDATE,
        contact,
        updateTimeRemaining: SESSION_MAX_LENGTH / 1000
      },
      () => {
        this.startSession()
      }
    )
  }

  onUpdate() {
    this.setState({ currentStep: THANKS })
  }

  onEndSession() {
    this.setState({ currentStep: LOGIN })
  }

  currentStep() {
    const step = this.state.currentStep
    if (step === LOGIN) {
      return (
        <KioskLogin
          authenticate={this.props.net.authenticateContact}
          onLogin={this.onLogin}
          userWasLoggedOut={this.state.contact === null}
        />
      )
    } else if (step === UPDATE) {
      return (
        <Update
          addContact={this.props.net.postContact}
          editContact={this.props.net.editContact}
          onUpdate={this.onUpdate}
          onEndSession={this.onEndSession}
          updated={this.updated}
          contact={this.state.contact}
          timeRemaining={this.state.updateTimeRemaining}
        />
      )
    } else if (step === THANKS) {
      return <Thanks onEndSession={this.onEndSession} />
    }
  }

  render() {
    return (
      <div className="kiosk">
        <Container className="kioskContainer">{this.currentStep()}</Container>
      </div>
    )
  }
}

export default Kiosk
