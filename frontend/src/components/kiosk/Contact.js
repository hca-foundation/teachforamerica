import React, { Component } from 'react'
import { Button, Input } from 'reactstrap'
import InputMask from 'react-input-mask'

class Contact extends Component {
  render() {
    const { emails, phoneNumbers } = this.props.contact
    const { contactIndex } = this.props

    return (
      <div className="contact">
        {this.renderHeading()}

        <div className="contact-info">
          <div className="contact-newContact-field">
            <InputMask
              name="phone"
              type="text"
              className="form-control"
              value={phoneNumbers[0]}
              required="required"
              onChange={event => {
                const phoneNumber = event.target.value
                  .replace('+1', '')
                  .replace('-', '')
                  .replace('(', '')
                  .replace(')', '')
                  .replace(/\s/g, '')

                this.props.updateContact(contactIndex, 'phoneNumbers', [
                  phoneNumber
                ])
              }}
              placeholder="Phone Number"
              mask="\+1\ (999)\ 999-9999"
              maskChar=""
              pattern="\+1 \([0-9][0-9][0-9]\) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]"
            />
            <Button
              className="contact-newContact-cancelButton"
              onClick={event => {
                event.preventDefault()
                this.props.updateContact(contactIndex, 'phoneNumbers', [''])
              }}
            >
              X
            </Button>
          </div>
        </div>

        <div className="contact-info">
          <div className="contact-newContact-field">
            <Input
              type="email"
              name="email"
              value={emails[0]}
              onChange={event =>
                this.props.updateContact(contactIndex, 'emails', [
                  event.target.value
                ])
              }
              placeholder="Email"
            />
            <Button
              className="contact-newContact-cancelButton"
              onClick={event => {
                event.preventDefault()
                this.props.updateContact(contactIndex, 'emails', [''])
              }}
            >
              X
            </Button>
          </div>
        </div>
      </div>
    )
  }

  renderHeading() {
    const { firstName, lastName, relationship } = this.props.contact
    const { contactIndex } = this.props

    if (contactIndex === 0) {
      return (
        <h4 className="contact-label">
          {`${firstName} ${lastName}`} - {relationship}
        </h4>
      )
    } else {
      return (
        <div className="contact-newContact">
          <div className="contact-newContact-header">
            <h4>
              {`${firstName} ${lastName}`}
              {!firstName && !lastName && 'New Contact'}
            </h4>

            <Button onClick={() => this.props.removeContact(contactIndex)}>
              Remove
            </Button>
          </div>

          <div className="contact-newContact-field">
            <Input
              type="text"
              name="firstName"
              value={firstName}
              required="required"
              onChange={event =>
                this.props.updateContact(
                  contactIndex,
                  'firstName',
                  event.target.value
                )
              }
              placeholder="First Name"
            />
            <Button
              className="contact-newContact-cancelButton"
              onClick={event => {
                event.preventDefault()
                this.props.updateContact(contactIndex, 'firstName', '')
              }}
            >
              X
            </Button>
          </div>

          <div className="contact-newContact-field">
            <Input
              type="text"
              name="lastName"
              value={lastName}
              required="required"
              onChange={event =>
                this.props.updateContact(
                  contactIndex,
                  'lastName',
                  event.target.value
                )
              }
              placeholder="Last Name"
            />
            <Button
              className="contact-newContact-cancelButton"
              onClick={event => {
                event.preventDefault()
                this.props.updateContact(contactIndex, 'lastName', '')
              }}
            >
              X
            </Button>
          </div>

          <div className="contact-newContact-field">
            <Input
              type="text"
              name="relationship"
              value={relationship}
              required="required"
              onChange={event =>
                this.props.updateContact(
                  contactIndex,
                  'relationship',
                  event.target.value
                )
              }
              placeholder="Relationship"
            />
            <Button
              className="contact-newContact-cancelButton"
              onClick={event => {
                event.preventDefault()
                this.props.updateContact(contactIndex, 'relationship', '')
              }}
            >
              X
            </Button>
          </div>
        </div>
      )
    }
  }
}

export default Contact
