import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import Header from '../components/Header'
import checkLoggedIn from '../lib/checkLoggedIn'
import {Router} from '../routes'

import {Grid, Col, Row} from 'react-bootstrap'

class About extends React.Component {

  static async getInitialProps(context, apolloClient) {
    const {loggedInUser} = await checkLoggedIn(context, apolloClient)
    // if (!loggedInUser.user) { Router.pushRoute('/login') }
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
                <article>
                  <h1>The Idea Behind This Example</h1>
                  <p>
                    <a href='http://dev.apollodata.com'>Apollo</a> is a GraphQL client that allows you to easily query the exact data you need from a GraphQL server. In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.
                  </p>
                  <p>
                    In this simple example, we integrate Apollo seamlessly with <a href='https://github.com/zeit/next.js'>Next</a> by wrapping our pages inside a <a href='https://facebook.github.io/react/docs/higher-order-components.html'>higher-order component (HOC)</a>. Using the HOC pattern we're able to pass down a central store of query result data created by Apollo into our React component hierarchy defined inside each page of our Next application.
                  </p>
                  <p>
                    On initial page load, while on the server and inside getInitialProps, we invoke the Apollo method, <a href='http://dev.apollodata.com/react/server-side-rendering.html#getDataFromTree'>getDataFromTree</a>. This method returns a promise; at the point in which the promise resolves, our Apollo Client store is completely initialized.
                  </p>
                  <p>
                    This example relies on <a href='http://graph.cool'>graph.cool</a> for its GraphQL backend.
                  </p>

                </article>
              </Col>
            </Row>
          </Grid>
        </section>
      </App>
    )
  }
}

export default withData(About)
