[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/zeit/next.js/tree/master/examples/with-apollo-and-redux)

# Basic Blog Demo with NextJS, Redux and Apollo

This branch is with ElectrodeJS as the framework instead of NextJS.


## About

A basic blog web application to demonstrate Nextjs, Redux, and Apollo

## TODOs

Investigate whether apollo is worthwhile
* Think about subscriptions and socket.io

Implement Auth
* https://www.howtographql.com/graphcool/3-authentication-and-permissions/

Compare to NextJS

Implement Subscription for post titles

Implement content structure



Implement SEO Header

Implement Facebook Auth
* https://www.graph.cool/docs/tutorials/auth/authentication-with-facebook-for-react-and-apollo-yi9jeuwohl

Investigate search
* Example [algolia](https://github.com/zeit/next.js/tree/master/examples/with-algolia-react-instantsearch)

Investigate APM
* Example https://github.com/zeit/next.js/tree/master/examples/with-amp

Investigate linting

## Electrode Vs. NextJS

* More polished and consistent syntax. Doesn't mix and max functional vs. OOP.
* Native features
* Closer to normal React and easier to learn
* Uses React Router - more features, easier to learn

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
* Coming soon

## Past Experiments

1. Compared to Relay example, this is 3x simpler AND performant.

## How to use

Install it and run:

```bash
npm install
clap dev
```

Run development server
```bash
clap dev
```

Run production server
```bash
clap server-prod
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
