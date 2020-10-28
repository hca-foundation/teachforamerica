import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  Container
} from 'reactstrap'
import qs from 'qs'

const messageSteps = {
  BLANK: 'BLANK',
  CONFIRMATION: 'CONFIRMATION',
  CONFIRMED: 'CONFIRMED',
  SENT: 'SENT'
}

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: messageSteps.BLANK,
      message: ''
    }

    this.onMessageChange = this.messageChange.bind(this)
    this.onCancel = this.cancel.bind(this)
    this.onSubmit = this.submit.bind(this)
  }

  componentDidMount() {
    const displayName = qs.parse(this.props.location.search.substring(1))[
      'display-name'
    ]
    this.props.setLogoBarTitle(`Message: ${displayName}`)
  }

  messageChange(e) {
    this.setState({ message: e.target.value })
  }

  cancel() {
    this.setState({ message: '', step: messageSteps.BLANK })
  }

  submit(e) {
    e.preventDefault()

    if (this.state.step === messageSteps.CONFIRMATION) {
      this.setState({ step: messageSteps.CONFIRMED })

      this.props
        .sendMessage(
          Object.assign({}, qs.parse(this.props.location.search.substring(1)), {
            message: this.state.message
          })
        )
        .then(() => {
          this.setState({ step: messageSteps.SENT })
        })
    } else {
      this.setState({ step: messageSteps.CONFIRMATION })
    }
  }

  prompt() {
    switch (this.state.step) {
      case messageSteps.BLANK:
        return 'Write your message'
      case messageSteps.CONFIRMATION:
        return 'Are you sure you want to send this message?'
      case messageSteps.CONFIRMED:
        return 'Sending...'
      case messageSteps.SENT:
        return 'Your message has been sent!'
      default:
        return 'Write your message'
    }
  }

  render() {
    let sendMessage

    switch (this.state.step) {
      case messageSteps.BLANK:
        sendMessage = 'Send Message'
        break

      case messageSteps.CONFIRMATION:
        sendMessage = 'Confirm?'
        break

      case messageSteps.CONFIRMED:
        sendMessage = 'Sending...'
        break

      default:
        sendMessage = 'Error!'
    }

    return (
      <Container>
        <Row className="rowPaddingTop">
          <Col sm={{ size: 8, offset: 2 }}>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="message" className="message-prompt">
                  {this.prompt()}
                </Label>
                <Input
                  className="message-textarea"
                  type="textarea"
                  disabled={this.state.step !== messageSteps.BLANK}
                  value={this.state.message}
                  onChange={this.onMessageChange}
                  name="message"
                  id="message"
                  required
                  maxLength="149"
                />
              </FormGroup>
              {this.state.step !== messageSteps.SENT ? (
                <div className="clearfix">
                  <Button
                    type="button"
                    onClick={this.onCancel}
                    color="primary"
                    className="float-left"
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    color={
                      this.state.step === messageSteps.BLANK
                        ? 'secondary'
                        : 'primary'
                    }
                    className="float-right"
                    disabled={this.state.step === messageSteps.CONFIRMED}
                  >
                    {sendMessage}
                  </Button>
                </div>
              ) : (
                <Link className="btn btn-secondary" to="/admin">
                  Home
                </Link>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Message
