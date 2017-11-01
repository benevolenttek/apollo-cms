import App from '../../components/App'
import Header from '../../components/Header'
import Submit from '../../components/Submit'
import PostList from '../../components/PostList'
import withData from '../../lib/withData'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />

    <section className={'body-default-width'}>
      <h1>Posts</h1>
      <PostList />

      <div style={{maxWidth:'400px'}}>
        <Submit />
      </div>
    </section>
  </App>
))
