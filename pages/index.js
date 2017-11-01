import App from '../components/App'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList from '../components/PostList'

import {Col, Row, Jumbotron} from 'react-bootstrap'
import withData from '../lib/withData'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />

    <Row style={{marginTop: '10px'}}>
      <Col lg={8} lgOffset={2}>
        <Jumbotron style={{borderRadius: '15px', textAlign: 'center'}}>
          <h1>Welcome to Apollo CMS</h1>
          <br/>
        </Jumbotron>
      </Col>
    </Row>

    <style jsx>{`

    `}</style>

  </App>
))
