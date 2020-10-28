import React from 'react'

const getClassroomName = (classId, allClassrooms) => {
  let chosenClassroom

  for (let classroom of allClassrooms) {
    if (classroom.id === classId) {
      chosenClassroom = classroom
      break
    }
  }

  return chosenClassroom ? `Classroom ${chosenClassroom.name}` : 'None'
}

export default function StudentList(props) {
  return props.studentList.map(student => {
    return (
      <div key={student.id} className="contactList-holder">
        <div className="contactList-textWrapper">
          <div className="contactList-text">
            <span className="contactList-text-label">Student Name: </span>
            <span className="contactList-text-value">{`${student.firstName} ${
              student.lastName
            }`}</span>
          </div>
          <div className="contactList-text">
            <span className="contactList-text-label">Classroom: </span>
            <span className="contactList-text-value">
              {getClassroomName(student.classId, props.allClassrooms)}
            </span>
          </div>
        </div>
        <div className="contactList-controls">
          <div
            className="contactList-controls-edit"
            onClick={() => props.handleEdit(student)}
          >
            Edit
          </div>
          <div
            className="contactList-controls-delete"
            onClick={() => props.handleDelete(student)}
          >
            Delete
          </div>
        </div>
      </div>
    )
  })
}
