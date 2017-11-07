import React from 'react'
import withData from '../../../lib/withData'
import App from '../../../components/App'
import Header from '../../../components/Header'
import PostTable from '../../../components/PostTable'
import Submit from '../../../components/Submit'
import checkLoggedIn from '../../../lib/checkLoggedIn'
import {Router} from '../../../routes'

import {Grid, Col, Row} from 'react-bootstrap'

class Index extends React.Component {

  static async getInitialProps(context, apolloClient) {
    const {loggedInUser} = await checkLoggedIn(context, apolloClient)
    if (!loggedInUser.user) { Router.pushRoute('/login') }
    return {loggedInUser}
  }

  render() {
    return (
      <App>
        <Header pathname={this.props.url.pathname} loggedInUser={this.props.loggedInUser}/>

        <section>
          <Grid>
            <Row>
              <Col xs={12}>

                <h1>Posts</h1>
                <PostTable/>

                <div style={{maxWidth: '400px'}}>
                  <Submit/>
                </div>

              </Col>
            </Row>
          </Grid>
        </section>
      </App>
    )
  }
}

export default withData(Index)
