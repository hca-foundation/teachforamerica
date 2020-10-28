import React, { Component } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Form,
  Input,
  FormGroup,
  Label,
  Button
} from 'reactstrap'

class AddStudentForm extends Component {
  constructor(props) {
    super(props)

    this.state = props.studentToEdit || {
      firstName: '',
      lastName: '',
      classId: null,
      submittingStudent: false,
      dropdownOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.onChooseClassroom = this.onChooseClassroom.bind(this)
    this.getChosenClassroomName = this.getChosenClassroomName.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ submittingStudent: true })
    this.props.studentToEdit
      ? this.props.editExistingStudent(this.state)
      : this.props.addNewStudent(this.state)
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  onChooseClassroom(classId) {
    this.setState({ classId })
  }

  getChosenClassroomName() {
    let chosenClassroom

    for (let classroom of this.props.allClassrooms) {
      if (classroom.id === this.state.classId) {
        chosenClassroom = classroom
        break
      }
    }

    return chosenClassroom ? `Classroom ${chosenClassroom.name}` : 'Select One'
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
          <Label for="classRoom">Classroom:</Label>
          <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={() => this.toggleDropdown()}
          >
            <DropdownToggle caret>
              {this.getChosenClassroomName()}
            </DropdownToggle>
            <DropdownMenu>
              {this.props.allClassrooms.map(classroom => {
                return (
                  <DropdownItem
                    key={classroom.id}
                    className="addFamilyForm-dropdown-item"
                    onClick={() => this.onChooseClassroom(classroom.id)}
                  >
                    {classroom.name}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <Button
          color="primary"
          className="contactList-submit"
          disabled={this.state.submittingStudent}
        >
          {this.state.submittingStudent ? 'Submitting...' : 'Submit'}
        </Button>
        <div
          className="addFamilyForm-cancel"
          onClick={this.props.openStudentAdd}
        >
          Cancel
        </div>
      </Form>
    )
  }
}

export default AddStudentForm
