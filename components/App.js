import Head from 'next/head'

// Progress bar
import NProgress from 'nprogress'
import Router from 'next/router'
Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


export default ({ children }) => (
  <main>
    <Head>
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css'/>
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css' />
    </Head>

    {children}

    <style jsx global>{`
      .body-default-width {
        max-width: 900px;
        margin: auto;
      }
    `}</style>
  </main>
)
