import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class Thanks extends Component {
  componentDidMount() {
    this.timeout = setTimeout(() => this.props.onEndSession(), 6000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    return (
      <div className="thankYou">
        <h1>Thank you!</h1>
        <p>Your information was succesfully updated.</p>
        <Button onClick={() => this.props.onEndSession()}>
          You're Welcome!
        </Button>
      </div>
    )
  }
}
