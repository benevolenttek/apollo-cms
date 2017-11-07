import App from '../../components/App'
import Header from '../../components/Header'
import Post from '../../components/Post'
import withData from '../../lib/withData'
import checkLoggedIn from '../../lib/checkLoggedIn'
// import {Router} from '../routes'

import {Grid, Col, Row} from 'react-bootstrap'

class Page extends React.Component {

  static async getInitialProps(context, apolloClient) {
    const {loggedInUser} = await checkLoggedIn(context, apolloClient)
    // if (!loggedInUser.user) { Router.pushRoute('/login') }
    return {loggedInUser}
  }

  render() {
    return (
      <App>
        <Header pathname={this.props.url.pathname} loggedInUser={this.props.loggedInUser} />

        <section>
          <Grid>
            <Row>
              <Col xs={12}>
                <Post id={this.props.url.query.id}/>
              </Col>
            </Row>
          </Grid>
        </section>
      </App>
    )
  }
}

export default withData(Page)
