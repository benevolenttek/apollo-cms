import Head from 'next/head'

// Progress bar
import NProgress from 'nprogress'
import {Router} from '../routes'
Router.onRouteChangeStart = (url) => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


export default ({ children }) => (
  <main>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css'/>
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css' />
    </Head>

    {children}

    {/*<style jsx global>{`

    `}</style>*/}

    <script src='http://code.jquery.com/jquery-2.2.4.min.js'></script>
    <script async src='https://maxcdn.bootstrapcdn.com/bootstrap/latest/js/bootstrap.js'></script>
  </main>
)


// import Head from 'next/head'
// import { withApollo, compose } from 'react-apollo'
//
// // Progress bar
// import NProgress from 'nprogress'
// import {Router} from '../routes'
// Router.onRouteChangeStart = (url) => {
//   console.log(`Loading: ${url}`)
//   NProgress.start()
// }
// Router.onRouteChangeComplete = () => NProgress.done()
// Router.onRouteChangeError = () => NProgress.done()
//
//
// App = ({ children }) => (
//   <main>
//     <Head>
//       <link rel='stylesheet' type='text/css' href='/static/nprogress.css'/>
//       <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css' />
//     </Head>
//
//     {children}
//
//     <style jsx global>{`
//       .body-default-width {
//         max-width: 900px;
//         margin: auto;
//       }
//     `}</style>
//   </main>
// )
//
// export default compose(
//   // withData gives us server-side graphql queries before rendering
//   withData,
//   // withApollo exposes `this.props.client` used when logging out
//   withApollo
// )(Index)