import React from 'react'

export default function ContactList(props) {
  return props.contactList.map(contact => {
    return (
      <div key={contact.id} className="contactList-holder">
        <div className="contactList-textWrapper">
          <div className="contactList-text">
            <span className="contactList-text-label">Name: </span>
            <span className="contactList-text-value">{`${contact.firstName} ${
              contact.lastName
            }${
              props.primaryContactId === contact.id ? ' (Primary)' : ''
            }`}</span>
          </div>
          <div className="contactList-text">
            <span className="contactList-text-label">Relationship: </span>
            <span className="contactList-text-value">
              {contact.relationship}
            </span>
          </div>
          <div className="contactList-text">
            <span className="contactList-text-label">Phone number: </span>
            <span className="contactList-text-value">
              {contact.phoneNumbers.join(', ')}
            </span>
          </div>
          <div className="contactList-text">
            <span className="contactList-text-label">Email: </span>
            <span className="contactList-text-value">
              {contact.emails.join(', ')}
            </span>
          </div>
        </div>
        <div className="contactList-controls">
          <div
            className="contactList-controls-edit"
            onClick={() => props.handleEdit(contact)}
          >
            Edit
          </div>
          {props.primaryContactId !== contact.id && (
            <div
              className="contactList-controls-delete"
              onClick={() => props.handleDelete(contact)}
            >
              Delete
            </div>
          )}
        </div>
      </div>
    )
  })
}
