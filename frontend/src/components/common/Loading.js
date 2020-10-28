import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Loading'
    }
  }
  componentDidMount() {
    const stopper = this.state.text + '...'
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: 'Loading' }))
        : this.setState(prevState => ({ text: prevState.text + '.' }))
    }, 300)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval)
  }
  render() {
    return (
      <Container className={this.props.loadingTextClass || 'loadingText'}>
        <Row className="rowPaddingTop">
          <Col xs="12" className="text-center">
            {this.state.text}
          </Col>
        </Row>
      </Container>
    )
  }
}
