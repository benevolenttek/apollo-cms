import React from 'react'


import App from '../components/App'
import Header from '../components/Header'
import withData from '../lib/withData'
import checkLoggedIn from '../lib/checkLoggedIn'
import {Router} from '../routes'

import {Grid, Col, Row, Jumbotron} from 'react-bootstrap'


class Index extends React.Component {

  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)
    // if (!loggedInUser.user) { Router.pushRoute('/login') }
    return {loggedInUser}
  }

  render() {
    return (
      <App>
        <Header pathname={this.props.url.pathname} loggedInUser={this.props.loggedInUser} />
        <br/>

        <Grid>
          <Row style={{marginTop: '10px'}}>
            <Col lg={8} lgOffset={2}>
              <Jumbotron style={{borderRadius: '15px', textAlign: 'center'}}>
                <h1>Welcome to Apollo CMS</h1>
                <br/>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>

      </App>
    )
  }
}

export default withData(Index);
