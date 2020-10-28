import React, { Component } from 'react'
import { Form, Input, FormGroup, Label, Button } from 'reactstrap'
import InputMask from 'react-input-mask'

class AddContactForm extends Component {
  constructor(props) {
    super(props)

    this.state = props.contactToEdit || {
      firstName: '',
      lastName: '',
      relationship: '',
      phoneNumbers: [''],
      emails: [''],
      submittingContact: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ submittingContact: true })
    this.props.contactToEdit
      ? this.props.editExistingContact(this.state)
      : this.props.addNewContact(this.state)
  }

  render() {
    return (
      <Form className="contactList-form" onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name:</Label>
          <Input
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            required="required"
            onChange={event => this.setState({ firstName: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name:</Label>
          <Input
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            required="required"
            onChange={event => this.setState({ lastName: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="relationship">Relationship:</Label>
          <Input
            id="relationship"
            name="relationship"
            value={this.state.relationship}
            required="required"
            onChange={event =>
              this.setState({ relationship: event.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone:</Label>
          <InputMask
            id="phone"
            name="phone"
            type="text"
            className="form-control"
            value={this.state.phoneNumbers && this.state.phoneNumbers[0]}
            required="required"
            onChange={event => {
              const phoneNumber = event.target.value
                .replace('+1', '')
                .replace('-', '')
                .replace('(', '')
                .replace(')', '')
                .replace(/\s/g, '')

              this.setState({ phoneNumbers: [phoneNumber] })
            }}
            mask="\+1\ (999)\ 999-9999"
            maskChar=""
            pattern="\+1 \([0-9][0-9][0-9]\) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={this.state.emails && this.state.emails[0]}
            onChange={event => this.setState({ emails: [event.target.value] })}
          />
        </FormGroup>
        <Button
          color="primary"
          className="contactList-submit"
          disabled={this.state.submittingContact}
        >
          {this.state.submittingContact ? 'Submitting...' : 'Submit'}
        </Button>
        <div
          className="addFamilyForm-cancel"
          onClick={this.props.openContactAdd}
        >
          Cancel
        </div>
      </Form>
    )
  }
}

export default AddContactForm
