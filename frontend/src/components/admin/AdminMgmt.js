import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Form,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Loading from '../common/Loading'
import PropTypes from 'prop-types'

class AdminMgmt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      admins: null,
      selectedAdmin: null,
      loading: true,
      submitting: false
    }

    this.handleAdminSelection = this.handleAdminSelection.bind(this)
    this.handleNewAdmin = this.handleNewAdmin.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.handleCancelDelete = this.handleCancelDelete.bind(this)
  }

  componentDidMount() {
    this.props.net.getAllAdmins().then(res => {
      this.setState({ admins: res || [], loading: false })
    })

    this.props.setLogoBarTitle('Admin Management')
  }

  handleAdminSelection(selectedAdmin) {
    this.setState({ selectedAdmin })
  }

  handleNewAdmin() {
    this.setState({
      selectedAdmin: {
        username: '',
        password: ''
      }
    })
  }

  handleEdit(e) {
    e.preventDefault()
    const adminToSave = this.state.selectedAdmin
    this.setState({ submitting: true })

    // If admin has an id, edit it, otherwise create a new admin
    if (adminToSave.id) {
      if (!adminToSave.password) {
        delete adminToSave.password
      }

      this.props.net.editAdmin(adminToSave).then(() => {
        if (adminToSave.id === this.props.adminId) {
          this.props.logout()
        } else {
          this.props.net.getAllAdmins().then(res => {
            if (res && res.error) {
              return this.props.logout()
            }

            this.setState({ admins: res || [], submitting: false })
          })
        }
      })
    } else {
      this.props.net.createAdmin(adminToSave).then(savedAdmin => {
        this.props.net.getAllAdmins().then(res => {
          if (res && res.error) {
            return this.props.logout()
          }

          this.setState({
            admins: res || [],
            selectedAdmin: savedAdmin,
            submitting: false
          })
        })
      })
    }
  }

  handleConfirmDelete() {
    const adminToDelete = this.state.selectedAdmin
    this.setState({ deleting: true })

    this.props.net.deleteAdmin(adminToDelete).then(() => {
      if (adminToDelete.id === this.props.adminId) {
        return this.props.logout()
      }

      this.props.net.getAllAdmins().then(res => {
        if (res && res.error) {
          return this.props.logout()
        }

        this.setState({
          deleting: false,
          confirmDelete: false,
          selectedAdmin: null,
          admins: res || [],
          loading: false
        })
      })
    })
  }

  handleCancelDelete() {
    this.setState({
      confirmDelete: false
    })
  }

  render() {
    if (this.state.loading === true) {
      return <Loading />
    }

    if (!this.props.super) {
      return <Redirect to="/admin/home" />
    }

    return (
      <Container className="appContainer">
        <Modal isOpen={this.state.confirmDelete}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this admin?</ModalBody>
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
            <div className="householdsListHolder">
              <FormGroup>
                <ListGroup className="itemList" style={{ marginTop: 0 }}>
                  {this.state.admins.map(admin => (
                    <ListGroupItem
                      key={admin.id}
                      onClick={() => {
                        return this.handleAdminSelection(admin)
                      }}
                    >
                      {admin.username}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </FormGroup>
            </div>
            <Button onClick={this.handleNewAdmin}>Add Admin</Button>
          </Col>
          <Col xs="8">
            {this.state.selectedAdmin ? (
              <div className="contactListWrapper">
                <h2 className="contactListWrapper-heading">
                  {this.state.selectedAdmin.username
                    ? this.state.selectedAdmin.username
                    : 'New Admin'}
                </h2>
                <div className="contactList-textWrapper">
                  <Form className="contactList-form" onSubmit={this.handleEdit}>
                    <FormGroup>
                      <Label for="username">Username:</Label>
                      <Input
                        id="username"
                        name="username"
                        required="required"
                        value={this.state.selectedAdmin.username}
                        onChange={e => {
                          const username = e.target.value

                          this.setState({
                            selectedAdmin: Object.assign(
                              this.state.selectedAdmin,
                              { username }
                            )
                          })
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password:</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required={this.state.selectedAdmin.id ? '' : 'required'}
                        onChange={e => {
                          const password = e.target.value

                          this.setState({
                            selectedAdmin: Object.assign(
                              this.state.selectedAdmin,
                              { password }
                            )
                          })
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="super"
                        name="super"
                        type="checkbox"
                        checked={this.state.selectedAdmin.super}
                        style={{ marginLeft: 0, position: 'relative' }}
                        onChange={e => {
                          this.setState({
                            selectedAdmin: Object.assign(
                              this.state.selectedAdmin,
                              { super: e.target.checked }
                            )
                          })
                        }}
                      />
                      &nbsp;
                      <Label for="super">Is this user a super-admin?</Label>
                    </FormGroup>
                    <Button
                      type="submit"
                      color="primary"
                      disabled={this.state.submitting}
                    >
                      {this.state.submitting ? 'Submitting...' : 'Submit'}
                    </Button>
                    {this.state.selectedAdmin.id && (
                      <Button
                        color="secondary"
                        className="u-margin-left-20"
                        onClick={() => {
                          this.setState({
                            confirmDelete: true
                          })
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </Form>
                </div>
              </div>
            ) : (
              <div>Please select an admin...</div>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

AdminMgmt.propTypes = {
  net: PropTypes.object,
  setLogoBarTitle: PropTypes.func
}

export default AdminMgmt
