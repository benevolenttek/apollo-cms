[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/zeit/next.js/tree/master/examples/with-apollo-and-redux)

# Basic Blog Demo with NextJS, Redux and Apollo

## About

A basic blog web application to demonstrate Nextjs, Redux, and Apollo

## TODOs

Implement browser history with redux

Implement content structure

Implement Apollo Subscription for post titles

Implement roles
* https://www.howtographql.com/graphcool/3-authentication-and-permissions/

Implement SEO Header
* See nextjs header example

Resolve Link issue: https://github.com/fridays/next-routes/issues/115

Implement Facebook Auth
* https://www.graph.cool/docs/tutorials/auth/authentication-with-facebook-for-react-and-apollo-yi9jeuwohl

Install Bootstrap 3 and form handling
* https://github.com/zeit/next.js/tree/master/examples/form-handler

Investigate Redux features

Investigate redux alternatives:
* https://github.com/zeit/next.js/tree/master/examples/with-refnux
* https://github.com/zeit/next.js/tree/master/examples/with-freactal

Investigate search
* Custom vs. [algolia](https://github.com/zeit/next.js/tree/master/examples/with-algolia-react-instantsearch)

Investigate APM
* https://github.com/zeit/next.js/tree/master/examples/with-amp

Try SSR-Caching Again
* 

Investigate linting



## Dependencies

This demo relies on [graph.cool](https://www.graph.cool) for its GraphQL backend. I have set a graphcool server as a default for testing.

You may manage Graphcool from the CLI. You may run it locally and/or deploy migrations from the `graphcool` directory.

Initializing a new graphcool
```bash
graphcool init
```

Updating and deploying schema
```bash
vim types.graphql
graphcool deploy
```

Adding authentication (see [tutorial](https://www.graph.cool/docs/tutorials/auth/authentication-with-email-and-password-for-react-and-apollo-cu3jah9ech#setting-up-your-graphql-server))
```bash
graphcool add-template graphcool/templates/auth/email-password
```

## Credits

This demo combines and extends on several examples:
* https://github.com/zeit/next.js/tree/master/examples/with-apollo-and-redux
* https://github.com/zeit/next.js/tree/master/examples/with-loading
* https://github.com/zeit/next.js/tree/master/examples/with-next-routes
* https://github.com/zeit/next.js/tree/master/examples/with-apollo-auth
* https://github.com/zeit/next.js/tree/master/examples/form-handler

## Past Experiments

1. Compared to Relay example, this is 3x simpler AND performant.
2. Tried [ssr-caching](https://github.com/zeit/next.js/tree/master/examples/ssr-caching), and it seemed unreliable. Ex. going to /blog served homepage.

## How to use

Download the example [or clone the repo](https://github.com/zeit/next.js):

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/master | tar -xz --strip=2 next.js-master/examples/with-apollo-and-redux
cd with-apollo-and-redux
```

Install it and run:

```bash
npm install
npm run dev
```

Run development server
```bash
npm run dev
```

Run production server
```bash
npm run build
npm start
```

Push db changes from server/types.graphql
```bash
cd server; graphcool deploy
```

Run db locally
```bash
cd server; grapchcool local up
```


Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download)):

```bash
now
```


## Cordova

Get started by following these guides: 
* https://cordova.apache.org/docs/en/latest/guide/cli/index.html
* https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html



## The idea behind the example
By default, Apollo Client creates its own internal Redux store to manage queries and their results. If you are already using Redux for the rest of your app, [you can have the client integrate with your existing store instead](http://dev.apollodata.com/react/redux.html), which is what this example does. This example is identical to the [`with-apollo`](https://github.com/zeit/next.js/tree/master/examples/with-apollo) with the exception of this Redux store integration. 

Note that you can acesss the redux store like you normally would using `react-redux`'s `connect` as per [here](http://dev.apollodata.com/react/redux.html#using-connect). Here's a quick example:

```js
const mapStateToProps = state => ({
  location: state.form.location,
});

export default withData(connect(mapStateToProps, null)(Index));
```

`connect` must go inside `withData` otherwise `connect` will not be able to find the store. 

