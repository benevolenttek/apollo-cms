import App from '../../components/App'
import Header from '../../components/Header'
import Submit from '../../components/Submit'
import PostList from '../../components/PostList'
import withData from '../../lib/withData'
import checkLoggedIn from '../../lib/checkLoggedIn'
import redirectAnonymous from '../../lib/redirectAnonymous'

import {Grid, Col, Row} from 'react-bootstrap'

class Page extends React.Component {

  static async getInitialProps(context, apolloClient) {
    const {loggedInUser} = await checkLoggedIn(context, apolloClient)
    // redirectAnonymous(context, loggedInUser)
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
                <PostList/>

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

export default withData(Page)
