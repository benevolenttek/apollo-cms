import App from '../../components/App'
import Header from '../../components/Header'

export default (props) => (
  <App>
    <Header pathname={props.url.pathname}/>

    <section className={"body-default-width"}>
      <h1>Admin Dashboard</h1>
      <p>
        coming soon.
      </p>
    </section>
  </App>
)
