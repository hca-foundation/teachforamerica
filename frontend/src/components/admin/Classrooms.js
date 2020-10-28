import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container } from 'reactstrap'
import ItemList from './common/ItemList'
import Loading from '../common/Loading'

class Classrooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classRooms: [],
      selectedClassroom: {},
      selectedClassroomLocation: [],
      locations: [],
      loading: true
    }

    this.handleClassroomSelection = this.handleClassroomSelection.bind(this)
  }

  componentDidMount() {
    this.props.getAllClassrooms().then(res => {
      this.setState({ classRooms: res || [], loading: false })
    })
    this.props.getAllLocations().then(res => {
      this.setState({ locations: res || [], loading: false })
    })

    this.props.setLogoBarTitle('Classrooms')
  }

  handleClassroomSelection(classRoom) {
    const selectedClassroom = this.state.classRooms.filter(classRoomP => {
      return classRoomP.id === classRoom.id
    })[0]

    const selectedClassroomLocation = this.state.locations.filter(locationP => {
      return locationP.id === selectedClassroom.locationId
    })[0]

    this.setState({ selectedClassroomLocation, selectedClassroom })
  }

  render() {
    if (this.state.loading === true) {
      return <Loading />
    }
    return (
      <Container className="appContainer">
        <Row className="rowPaddingTop">
          <Col xs="4">
            <div>
              <ClassRoomList
                classRooms={this.state.classRooms}
                handleClassroomSelection={this.handleClassroomSelection}
              />
            </div>
          </Col>
          <Col xs="8">
            <ClassroomDetail
              selectedClassroom={this.state.selectedClassroom}
              selectedClassroomLocation={this.state.selectedClassroomLocation}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

function ClassRoomList(props) {
  const classRoomsFormatted = props.classRooms.map(classRoom => {
    const displayName = 'Classroom ' + classRoom.name
    return Object.assign(classRoom, {
      displayName
    })
  })

  if (classRoomsFormatted.length > 0) {
    return (
      <ItemList
        items={classRoomsFormatted}
        handleItemSelection={props.handleClassroomSelection}
      />
    )
  } else {
    return null
  }
}

function ClassroomDetail(props) {
  const displayName = `Classroom ${props.selectedClassroom.name}`

  if (
    props.selectedClassroom.id !== undefined &&
    props.selectedClassroomLocation.id !== undefined
  ) {
    return (
      <div className="contactListWrapper">
        <h2 className="contactListWrapper-heading">{displayName}</h2>
        <Link
          className="btn btn-secondary"
          to={{
            pathname: '/admin/message',
            search: `?group=classrooms&id=${
              props.selectedClassroom.id
            }&display-name=${displayName}`
          }}
        >
          Create Message
        </Link>
        <h4 className="contactListWrapper-subHeading">Location</h4>
        <div className="classroomDetail-locationInfo">
          <p>{props.selectedClassroomLocation.name}</p>
        </div>
      </div>
    )
  } else {
    return <div>Please select a classroom...</div>
  }
}

export default Classrooms
