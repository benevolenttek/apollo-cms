import React from 'react'
import {graphql, withApollo, compose} from 'react-apollo'
import cookie from 'cookie'
import Link from 'next/link'
import {gql} from 'react-apollo'
import {Grid, Col, Row, Jumbotron} from 'react-bootstrap'
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

import App from '../components/App'
import withData from '../lib/withData'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'

function FieldGroup({id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Signin extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const {loggedInUser} = await checkLoggedIn(context, apolloClient)

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    return {loggedInUser}
  }

  render() {
    return (
      <App>
        <Grid>
          <Row style={{marginTop: '10px'}}>
            <Col lg={8} lgOffset={2}>
              <Jumbotron style={{borderRadius: '15px', padding: '20px', maxWidth: '500px', margin: '20px auto'}}>
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <br/>
                {/* this.props.signin is the mutation function provided by apollo below */}
                <form onSubmit={this.props.signin}>
                  <FormGroup controlId="formLogin">
                    <FieldGroup type="email" label="Email" placeholder="Enter email" name="email"/>
                    <FieldGroup type="password" label="Password" placeholder="Enter password" name="password"/>
                    <button>Sign in</button>
                  </FormGroup>
                </form>
                <hr/>
                New? <Link prefetch href='/register'><a>Create account</a></Link>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      </App>
    )
  }
};

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  graphql(
    // The `signinUser` mutation is provided by graph.cool by default
    gql`
        mutation Signin($email: String!, $password: String!) {
            authenticateUser(email: $email, password: $password ) {
                token
            }
        }
    `,
    {
      // Use an unambiguous name for use in the `props` section below
      name: 'signinWithEmail',
      // Apollo's way of injecting new props which are passed to the component
      props: ({
                signinWithEmail,
                // `client` is provided by the `withApollo` HOC
                ownProps: {client}
              }) => ({
        // `signin` is the name of the prop passed to the component
        signin: (event) => {
          /* global FormData */
          const data = new FormData(event.target)

          event.preventDefault()
          event.stopPropagation()

          signinWithEmail({
            variables: {
              email: data.get('email'),
              password: data.get('password')
            }
          }).then(({data: {authenticateUser: {token}}}) => {
            // Store the token in cookie
            document.cookie = cookie.serialize('token', token, {
              maxAge: 30 * 24 * 60 * 60 // 30 days
            })

            // Force a reload of all the current queries now that the user is
            // logged in
            client.resetStore().then(() => {
              // Now redirect to the homepage
              redirect({}, '/')
            })
          }).catch((error) => {
            // Something went wrong, such as incorrect password, or no network
            // available, etc.
            console.error(error)
          })
        }
      })
    }
  )
)(Signin)
