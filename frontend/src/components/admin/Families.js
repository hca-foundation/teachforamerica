import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Container,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'

import ContactList from './common/ContactList'
import StudentList from './common/StudentList'
import ItemList from './common/ItemList'
import AddContactForm from './common/AddContactForm'
import AddStudentForm from './common/AddStudentForm'
import Loading from '../common/Loading'

class Families extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      households: [],
      allStudents: [],
      allClassrooms: [],
      allContacts: [],
      selectedFamily: null,
      selectedFamilyStudents: [],
      selectedFamilyContacts: [],
      showStudentForm: false,
      studentToEdit: null,
      chosenStudent: null,
      showContactForm: false,
      contactToEdit: null,
      showAddFamily: false,
      showFamilyEdit: false,
      addingFamily: false,
      deleting: false,
      deleteFunction: null,
      confirmDelete: false,
      itemToDelete: null,
      deleteId: null,
      itemListKey: 0
    }

    this.handleStudentEdit = this.handleStudentEdit.bind(this)
    this.handleStudentDelete = this.handleStudentDelete.bind(this)
    this.openStudentAdd = this.openStudentAdd.bind(this)
    this.addNewStudent = this.addNewStudent.bind(this)
    this.editExistingStudent = this.editExistingStudent.bind(this)

    this.handleContactEdit = this.handleContactEdit.bind(this)
    this.handleContactDelete = this.handleContactDelete.bind(this)
    this.openContactAdd = this.openContactAdd.bind(this)
    this.addNewContact = this.addNewContact.bind(this)
    this.editExistingContact = this.editExistingContact.bind(this)

    this.handleFamilySelection = this.handleFamilySelection.bind(this)

    this.showAddFamily = this.showAddFamily.bind(this)
    this.addFamily = this.addFamily.bind(this)
    this.handleFamilyEdit = this.handleFamilyEdit.bind(this)
    this.handleFamilyDelete = this.handleFamilyDelete.bind(this)
    this.editExistingFamily = this.editExistingFamily.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.handleCancelDelete = this.handleCancelDelete.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.setLogoBarTitle('Families')

    this.props.net.getAllHouseholds().then(households => {
      this.props.net.getAllContacts().then(contacts => {
        this.props.net.getAllStudents().then(students => {
          this.props.net.getAllClassrooms().then(classrooms => {
            this.setState({
              households: households || [],
              allContacts: contacts || [],
              allStudents: students || [],
              allClassrooms: classrooms || [],
              loading: false
            })
          })
        })
      })
    })
  }

  // Add/Edit Students

  openStudentAdd(studentToEdit) {
    const currentState = this.state.showStudentForm
    this.setState({ showStudentForm: !currentState, studentToEdit })
  }

  addNewStudent(student) {
    const studentWithHouseholdId = Object.assign(student, {
      householdId: this.state.selectedFamily.id
    })

    this.props.net.createStudent(studentWithHouseholdId).then(res => {
      const newSelectedFamilyStudents = this.state.selectedFamilyStudents
      newSelectedFamilyStudents.push(res)

      const newAllStudents = this.state.allStudents
      newAllStudents.push(res)

      this.setState({
        showStudentForm: false,
        selectedFamilyStudents: newSelectedFamilyStudents,
        allStudents: newAllStudents
      })
    })
  }

  handleStudentEdit(studentToEdit) {
    this.setState({
      showStudentForm: !this.state.showStudentForm,
      studentToEdit
    })
  }

  editExistingStudent(student) {
    this.props.net.editStudent(student).then(() => {
      const newSelectedFamilyStudents = this.state.selectedFamilyStudents.map(
        s => {
          return s.id === student.id ? student : s
        }
      )

      this.setState({
        showStudentForm: false,
        selectedFamilyStudents: newSelectedFamilyStudents
      })
    })
  }

  handleStudentDelete(studentToDelete) {
    this.setState({ deletingStudent: true })

    return this.props.net.deleteStudent(studentToDelete).then(() => {
      this.setState({
        showStudentForm: false,
        selectedFamilyStudents: this.state.selectedFamilyStudents.filter(
          contact => contact.id !== studentToDelete.id
        ),
        allStudents: this.state.allStudents.filter(
          contact => contact.id !== studentToDelete.id
        ),
        deletingStudent: false
      })
    })
  }

  // Add/Edit Contacts

  openContactAdd(contactToEdit) {
    const currentState = this.state.showContactForm
    this.setState({ showContactForm: !currentState, contactToEdit })
  }

  addNewContact(contact, familyId) {
    const contactWithHouseholdId = Object.assign(contact, {
      householdId: familyId || this.state.selectedFamily.id
    })

    return this.props.net.postContact(contactWithHouseholdId).then(res => {
      const newSelectedFamilyContacts = this.state.selectedFamilyContacts
      newSelectedFamilyContacts.push(res)

      const newAllContacts = this.state.allContacts
      newAllContacts.push(res)

      this.setState({
        showContactForm: false,
        selectedFamilyContacts: newSelectedFamilyContacts,
        allContacts: newAllContacts
      })

      return res
    })
  }

  handleContactEdit(contactToEdit) {
    this.setState({
      showContactForm: !this.state.showContactForm,
      contactToEdit
    })
  }

  editExistingContact(contact) {
    this.props.net
      .editContact(contact)
      .then(() => {
        if (contact.id === this.state.selectedFamily.primaryContactId) {
          return this.props.net.getAllHouseholds()
        }
      })
      .then(households => {
        const newHouseholds = households || this.state.households

        const newSelectedFamilyContacts = this.state.selectedFamilyContacts.map(
          c => {
            return c.id === contact.id ? contact : c
          }
        )

        this.setState({
          households: newHouseholds,
          showContactForm: false,
          selectedFamilyContacts: newSelectedFamilyContacts
        })
      })
  }

  handleContactDelete(contactToDelete) {
    this.setState({ deletingContact: true })

    return this.props.net.deleteContact(contactToDelete).then(() => {
      this.setState({
        showForm: false,
        selectedFamilyContacts: this.state.selectedFamilyContacts.filter(
          contact => contact.id !== contactToDelete.id
        ),
        allContacts: this.state.allContacts.filter(
          contact => contact.id !== contactToDelete.id
        ),
        deletingContact: false
      })
    })
  }

  // Select Family

  handleFamilySelection(household) {
    const selectedFamilyContacts = this.state.allContacts.filter(contact => {
      return contact.householdId === household.id
    })

    const selectedFamilyStudents = this.state.allStudents.filter(student => {
      return student.householdId === household.id
    })

    this.setState({
      selectedFamilyContacts,
      selectedFamilyStudents,
      selectedFamily: household
    })
  }

  // Add Family

  showAddFamily() {
    this.setState({ showAddFamily: !this.state.showAddFamily })
  }

  addFamily(e, contact) {
    e.preventDefault()

    this.setState({
      addingFamily: true,
      selectedFamily: null
    })

    const family = {
      notes: contact.notes,
      pin: contact.pin
    }
    let newFamily
    let households

    // First, create a family without a primary contact
    return this.props.net
      .createFamily(family)
      .then(nf => {
        newFamily = nf

        // Then, create a new contact with the newly-created householdId
        return this.addNewContact(contact, newFamily.id)
      })
      .then(newContact => {
        const newContactId = newContact.id
        const familyWithPrimaryContact = Object.assign(newFamily, {
          primaryContactId: newContactId
        })

        // Then, add the new contact's id to the family as primaryContactId
        return this.props.net.editFamily(familyWithPrimaryContact)
      })
      .then(() => {
        // Then, refresh local state
        return this.props.net.getAllHouseholds()
      })
      .then(h => {
        households = h

        return this.props.net.getAllContacts()
      })
      .then(contacts => {
        this.setState(
          {
            households,
            allContacts: contacts,
            loading: false,
            showAddFamily: false,
            addingFamily: false
          },
          () => {
            this.resetSearch()
            this.handleFamilySelection(newFamily)
          }
        )
      })
  }

  handleFamilyEdit() {
    this.setState({ showFamilyEdit: !this.state.showFamilyEdit })
  }

  editExistingFamily(e) {
    e.preventDefault()
    this.setState({ showFamilyEdit: !this.state.showFamilyEdit })
    const family = this.state.selectedFamily

    this.props.net.editFamily(family).then(() => {
      // Refresh local state
      this.props.net.getAllHouseholds().then(households => {
        delete family.pin

        this.setState(
          {
            households: households,
            loading: false
          },
          () => {
            this.resetSearch()
          }
        )
      })
    })
  }

  handleFamilyDelete() {
    let households
    let contacts

    return this.props.net
      .deleteFamily(this.state.selectedFamily)
      .then(() => {
        return this.props.net.getAllHouseholds()
      })
      .then(h => {
        households = h

        return this.props.net.getAllContacts()
      })
      .then(c => {
        contacts = c

        return this.props.net.getAllStudents()
      })
      .then(students => {
        this.setState(
          {
            households,
            allContacts: contacts,
            allStudents: students,
            loading: false,
            selectedFamily: null,
            selectedFamilyContacts: [],
            selectedFamilyStudents: []
          },
          () => {
            this.resetSearch()
          }
        )
      })
  }

  handleConfirmDelete() {
    this.setState({ deleting: true })

    if (this.state.deleteFunction) {
      this.state.deleteFunction(this.state.deleteId).then(() => {
        this.setState({
          deleting: false,
          confirmDelete: false,
          deleteFunction: null,
          itemToDelete: null,
          deleteId: null
        })
      })
    }
  }

  handleCancelDelete() {
    this.setState({
      confirmDelete: false,
      deleteFunction: null,
      itemToDelete: null,
      deleteId: null
    })
  }

  resetSearch() {
    this.setState({
      itemListKey: this.state.itemListKey + 1
    })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    const householdsWithDisplayName = this.state.households.map(household => {
      const primaryContact = household.PrimaryContact
      const displayName = primaryContact
        ? `${primaryContact.firstName} ${primaryContact.lastName}'${
            primaryContact.lastName
              .charAt(primaryContact.lastName.length - 1)
              .toLowerCase() === 's'
              ? ''
              : 's'
          } Family`
        : 'No Primary Contact'

      if (
        this.state.selectedFamily &&
        household.id === this.state.selectedFamily.id
      ) {
        Object.assign(this.state.selectedFamily, {
          displayName
        })
      }

      return Object.assign(household, {
        displayName
      })
    })

    return (
      <Container className="appContainer">
        <Modal isOpen={this.state.confirmDelete}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this {this.state.itemToDelete}?
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              disabled={this.state.deleting}
              onClick={event => this.handleConfirmDelete(event)}
            >
              Yes, delete this
            </Button>
            <Button
              color="secondary"
              onClick={event => this.handleCancelDelete(event)}
            >
              No, keep it
            </Button>
          </ModalFooter>
        </Modal>
        <Row className="rowPaddingTop">
          <Col xs="4">
            <div>
              {householdsWithDisplayName.length > 0 ? (
                <ItemList
                  key={this.state.itemListKey}
                  items={householdsWithDisplayName}
                  handleItemSelection={this.handleFamilySelection}
                />
              ) : null}
            </div>
            <div>
              <AddFamily
                onShowAddFamily={this.showAddFamily}
                showAddFamily={this.state.showAddFamily}
                onAddFamily={this.addFamily}
                addNewContact={this.addNewContact}
                addingFamily={this.state.addingFamily}
              />
            </div>
          </Col>
          <Col xs="8">
            {this.state.selectedFamily ? (
              <div className="contactListWrapper">
                <h2 className="contactListWrapper-heading">
                  {this.state.selectedFamily.displayName}
                </h2>
                <Link
                  className="btn btn-secondary"
                  to={{
                    pathname: '/admin/message',
                    search: `?group=households&id=${
                      this.state.selectedFamily.id
                    }&display-name=${this.state.selectedFamily.displayName}`
                  }}
                >
                  Create Message
                </Link>
                <Button
                  color="primary"
                  className="u-margin-left-20"
                  onClick={this.handleFamilyEdit}
                >
                  Edit Family
                </Button>
                <Button
                  color="primary"
                  className="u-margin-left-20"
                  onClick={() => {
                    this.setState({
                      confirmDelete: true,
                      deleteFunction: this.handleFamilyDelete,
                      itemToDelete: 'family'
                    })
                  }}
                >
                  Delete Family
                </Button>
                {this.state.showFamilyEdit && (
                  <div>
                    <Form
                      className="contactList-form"
                      onSubmit={this.editExistingFamily}
                    >
                      <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input
                          id="notes"
                          name="notes"
                          value={this.state.selectedFamily.notes}
                          onChange={e => {
                            const notes = e.target.value

                            this.setState({
                              selectedFamily: Object.assign(
                                this.state.selectedFamily,
                                { notes }
                              )
                            })
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="pin">Pin</Label>
                        <InputMask
                          id="pin"
                          className="form-control"
                          name="pin"
                          type="password"
                          maxLength="4"
                          onChange={e => {
                            const pin = e.target.value

                            this.setState({
                              selectedFamily: Object.assign(
                                this.state.selectedFamily,
                                { pin }
                              )
                            })
                          }}
                          mask="9999"
                          maskChar=""
                          pattern="[0-9][0-9][0-9][0-9]"
                        />
                      </FormGroup>
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                      <div
                        className="addFamilyForm-cancel"
                        onClick={this.handleFamilyEdit}
                      >
                        Cancel
                      </div>
                    </Form>
                  </div>
                )}
                <div className="families-detail-notes">
                  <h4 className="families-detail-notes-text">Notes</h4>
                  <p className="families-detail-notes-text">
                    {this.state.selectedFamily.notes}
                  </p>
                </div>
                <div className="families-detail-students">
                  <h4 className="contactListWrapper-subHeading">Students</h4>
                  {this.state.showStudentForm && (
                    <AddStudentForm
                      allClassrooms={this.state.allClassrooms}
                      addNewStudent={this.addNewStudent}
                      editExistingStudent={this.editExistingStudent}
                      openStudentAdd={this.openStudentAdd}
                      studentToEdit={this.state.studentToEdit}
                    />
                  )}
                  {!this.state.showStudentForm && (
                    <div>
                      <StudentList
                        allClassrooms={this.state.allClassrooms}
                        studentList={this.state.selectedFamilyStudents}
                        deletingStudent={this.state.deletingStudent}
                        handleEdit={this.handleStudentEdit}
                        handleDelete={deleteId => {
                          this.setState({
                            confirmDelete: true,
                            deleteFunction: this.handleStudentDelete,
                            itemToDelete: 'student',
                            deleteId
                          })
                        }}
                      />
                      <Button
                        color="primary"
                        className="contactList-addContact"
                        onClick={() => this.openStudentAdd()}
                      >
                        Add Student
                      </Button>
                    </div>
                  )}
                </div>
                <div className="familes-detail-contacts">
                  <h4 className="contactListWrapper-subHeading">Contacts</h4>
                  {this.state.showContactForm && (
                    <AddContactForm
                      addNewContact={this.addNewContact}
                      editExistingContact={this.editExistingContact}
                      openContactAdd={this.openContactAdd}
                      contactToEdit={this.state.contactToEdit}
                    />
                  )}
                  {!this.state.showContactForm && (
                    <div>
                      <ContactList
                        contactList={this.state.selectedFamilyContacts}
                        primaryContactId={
                          this.state.selectedFamily.primaryContactId
                        }
                        deletingContact={this.state.deletingContact}
                        handleEdit={this.handleContactEdit}
                        handleDelete={deleteId => {
                          this.setState({
                            confirmDelete: true,
                            deleteFunction: this.handleContactDelete,
                            itemToDelete: 'contact',
                            deleteId
                          })
                        }}
                      />
                      <Button
                        color="primary"
                        className="contactList-addContact"
                        onClick={() => this.openContactAdd()}
                      >
                        Add Contact
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>Please select a family...</div>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

class AddFamily extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      relationship: '',
      phoneNumbers: [''],
      emails: [''],
      notes: '',
      pin: ''
    }
  }

  render() {
    return (
      <div>
        {this.props.showAddFamily && (
          <Form
            className="contactList-form"
            onSubmit={e => {
              this.props.onAddFamily(e, this.state).then(() => {
                this.setState({
                  firstName: '',
                  lastName: '',
                  relationship: '',
                  phoneNumbers: [''],
                  emails: ['']
                })
              })
            }}
          >
            <FormGroup>
              <Label for="firstName">Primary Contact First Name:</Label>
              <Input
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                required="required"
                onChange={event =>
                  this.setState({ firstName: event.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Primary Contact Last Name:</Label>
              <Input
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                required="required"
                onChange={event =>
                  this.setState({ lastName: event.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="relationship">Primary Contact Relationship:</Label>
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
              <Label for="phone">Primary Contact Phone:</Label>
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
              <Label for="email">Primary Contact Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={this.state.emails && this.state.emails[0]}
                onChange={event =>
                  this.setState({ emails: [event.target.value] })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="notes">Family Notes:</Label>
              <Input
                id="notes"
                name="notes"
                value={this.state.notes}
                onChange={event => this.setState({ notes: event.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="pin">Family Pin:</Label>
              <InputMask
                id="pin"
                className="form-control"
                name="pin"
                value={this.state.pin}
                type="password"
                maxLength="4"
                required="required"
                onChange={event => this.setState({ pin: event.target.value })}
                mask="9999"
                maskChar=""
                pattern="[0-9][0-9][0-9][0-9]"
              />
            </FormGroup>
            <Button disabled={this.props.addingFamily} color="primary">
              {this.props.addingFamily ? 'Creating...' : 'Create'}
            </Button>
            <div
              className="addFamilyForm-cancel"
              onClick={this.props.onShowAddFamily}
            >
              Cancel
            </div>
          </Form>
        )}
        {!this.props.showAddFamily && (
          <Button onClick={this.props.onShowAddFamily}>Add Family</Button>
        )}
      </div>
    )
  }
}

Families.propTypes = {
  net: PropTypes.object,
  setLogoBarTitle: PropTypes.func
}

AddFamily.propTypes = {
  onShowAddFamily: PropTypes.func,
  showAddFamily: PropTypes.bool,
  onAddFamily: PropTypes.func,
  addNewContact: PropTypes.func,
  addingFamily: PropTypes.bool
}

export default Families
