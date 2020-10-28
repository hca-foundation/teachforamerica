import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container } from 'reactstrap'
import ItemList from './common/ItemList'
import Loading from '../common/Loading'

class Sites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sites: [],
      selectedSite: {},
      loading: true
    }

    this.handleSiteSelection = this.handleSiteSelection.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.setLogoBarTitle('Locations')

    this.props.getAllLocations().then(res => {
      this.setState({ sites: res || [], loading: false })
    })
  }

  handleSiteSelection(site) {
    // const selectedSite = this.state.sites.filter(siteP => {
    //   return siteP.id === site.id
    // })[0];

    this.setState({ selectedSite: site })
    // this.setState({ selectedSite })
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
              <SiteList
                sites={this.state.sites}
                handleSiteSelection={this.handleSiteSelection}
              />
            </div>
          </Col>
          <Col xs="8">
            <SiteDetail selectedSite={this.state.selectedSite} />
          </Col>
        </Row>
      </Container>
    )
  }
}

function SiteList(props) {
  const householdsWithDisplayName = props.sites.map(site => {
    const displayName = site.name
    return Object.assign(site, {
      displayName
    })
  })

  if (householdsWithDisplayName.length > 0) {
    return (
      <ItemList
        items={householdsWithDisplayName}
        handleItemSelection={props.handleSiteSelection}
      />
    )
  } else {
    return null
  }
}

function SiteDetail(props) {
  if (props.selectedSite.id !== undefined) {
    return (
      <div className="contactListWrapper">
        <h2 className="houseHoldDetail-heading">{props.selectedSite.name}</h2>
        <Link
          className="btn btn-secondary"
          to={{
            pathname: '/admin/message',
            search: `?group=locations&id=${
              props.selectedSite.id
            }&display-name=${props.selectedSite.name}`
          }}
        >
          Create Message
        </Link>
      </div>
    )
  } else {
    return <div>Please select a location...</div>
  }
}

export default Sites
