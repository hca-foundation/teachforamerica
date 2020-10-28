import React, { Component } from 'react'
import {
  Button,
  Form,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Contact from './Contact'

class Update extends Component {
  constructor(props) {
    super(props)

    this.addContact = this.addContact.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.removeContact = this.removeContact.bind(this)
    this.updateContact = this.updateContact.bind(this)

    this.state = {
      contacts: [this.props.contact],
      confirming: false,
      submitting: false,
      confirmCancel: false
    }
  }

  addContact() {
    const { contacts } = this.state

    contacts.push({
      householdId: contacts[0].householdId,
      firstName: '',
      lastName: '',
      relationship: '',
      phoneNumbers: [''],
      emails: ['']
    })

    this.setState({ contacts })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ confirming: true })
  }

  handleConfirm(event) {
    event.preventDefault()
    this.setState({ submitting: true }, () => {
      const promises = [this.props.editContact(this.state.contacts[0])]

      for (let index = 1; index < this.state.contacts.length; index++) {
        promises.push(this.props.addContact(this.state.contacts[index]))
      }

      Promise.all(promises).then(res => {
        this.props.onUpdate()
      })
    })
  }

  handleCancel(event) {
    event.preventDefault()
    this.setState({ confirming: false })
  }

  removeContact(index) {
    let { contacts } = this.state
    contacts.splice(index, 1)
    this.setState({ contacts })
  }

  updateContact(index, key, value) {
    const { contacts } = this.state
    contacts[index][key] = value
    this.setState({ contacts })
  }

  render() {
    return (
      <Card className="updateContainer">
        <Modal isOpen={this.state.confirming}>
          <ModalHeader toggle={this.toggle}>Is this correct?</ModalHeader>
          <ModalBody>
            {this.state.contacts.map((contact, index) => (
              <div className="update-contact" key={index}>
                <p>{`${contact.firstName} ${contact.lastName}`}</p>
                <p>{contact.relationship}</p>
                <p>{contact.phoneNumbers[0]}</p>
                <p>{contact.emails[0]}</p>
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              disabled={this.state.submitting}
              onClick={event => this.handleConfirm(event)}
            >
              Yes, this is correct
            </Button>
            <Button color="primary" onClick={event => this.handleCancel(event)}>
              No, let me change it
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.confirmCancel}>
          <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
          <ModalBody>Are you sure you want to cancel?</ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={event => this.props.onEndSession()}
            >
              Yes, cancel
            </Button>
            <Button
              color="primary"
              onClick={() => this.setState({ confirmCancel: false })}
            >
              No, let me continue
            </Button>
          </ModalFooter>
        </Modal>

        <CardBody>
          <Form className="update" onSubmit={event => this.handleSubmit(event)}>
            <div className="update-header">
              <h1>Update Info</h1>
              <p className="update-header-time">
                Time Remaining: {this.formatTime(this.props.timeRemaining)}
              </p>
            </div>
            {this.renderContacts()}
            <div className="update-addContactButton">
              <Button color="primary" onClick={event => this.addContact(event)}>
                Add Contact
              </Button>
            </div>
            <hr />
            <Button color="primary">Submit</Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              color="secondary"
              onClick={() => this.setState({ confirmCancel: true })}
            >
              Cancel
            </Button>
          </Form>
        </CardBody>
      </Card>
    )
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds

    return `${minutes}:${seconds}`
  }

  renderContacts() {
    return (
      <div>
        {this.state.contacts.map((contact, index) => (
          <div key={index}>
            <Contact
              contact={contact}
              contactIndex={index}
              updateContact={this.updateContact}
              removeContact={this.removeContact}
            />
            <br />
          </div>
        ))}
      </div>
    )
  }
}

export default Update
