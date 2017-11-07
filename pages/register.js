import React from 'react'
import {graphql, withApollo, compose, gql} from 'react-apollo'
import cookie from 'cookie'
import {Link} from '../routes'
import {Grid, Col, Row, Jumbotron} from 'react-bootstrap'
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

import App from '../components/App'
import withData from '../lib/withData'
import {Router} from '../routes'
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

class CreateAccount extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const {loggedInUser} = await checkLoggedIn(context, apolloClient)

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      context.res.writeHead(303, { Location: '/admin' })
      context.res.end()
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
                <h1 style={{textAlign: 'center'}}>Register</h1>
                <br/>
                {/* this.props.create is the mutation function provided by apollo below */}
                <form onSubmit={this.props.create}>
                  <FormGroup controlId="formRegister">
                    <FieldGroup type="text" label="Name" placeholder="Your name" name="name"/>
                    <FieldGroup type="email" label="Email" placeholder="Enter email" name="email"/>
                    <FieldGroup type="password" label="Password" placeholder="Enter password" name="password"/>
                    <button>Create account</button>
                  </FormGroup>
                </form>
                <hr/>
                Already have an account? <Link prefetch href='/login'><a>Sign in</a></Link>
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
    // The `createUser` & `signinUser` mutations are provided by graph.cool by
    // default.
    // Multiple mutations are executed by graphql sequentially
    gql`
        mutation Create($email: String!, $password: String!, $name: String!) {
            signupUser(email: $email,password: $password,name: $name) {
                id
                token
            }
        }
    `,
    {
      // Use an unambiguous name for use in the `props` section below
      name: 'createWithEmail',
      // Apollo's way of injecting new props which are passed to the component
      props: ({
                createWithEmail,
                // `client` is provided by the `withApollo` HOC
                ownProps: {client}
              }) => ({
        // `create` is the name of the prop passed to the component
        create: (event) => {
          /* global FormData */
          const data = new FormData(event.target)

          event.preventDefault()
          event.stopPropagation()

          createWithEmail({
            variables: {
              email: data.get('email'),
              password: data.get('password'),
              name: data.get('name')
            }
          }).then(({data: {signupUser: {token}}}) => {
            // Store the token in cookie
            document.cookie = cookie.serialize('token', token, {
              maxAge: 30 * 24 * 60 * 60 // 30 days
            })

            // Force a reload of all the current queries now that the user is
            // logged in
            client.resetStore().then(() => {
              // Now redirect to the homepage
              Router.pushRoute('/admin')
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
)(CreateAccount)

