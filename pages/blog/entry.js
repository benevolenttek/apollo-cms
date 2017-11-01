import App from '../../components/App'
import Header from '../../components/Header'
import Post from '../../components/Post'
import withData from '../../lib/withData'

import {Col, Row, Jumbotron} from 'react-bootstrap'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />

    <section className={'body-default-width'}>
      <Post id={props.url.query.id} />
    </section>
  </App>
))
