import React from "react";
import {render} from "react-dom";
import {routes} from "./routes";
import {Router, browserHistory} from "react-router";
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {notify} from "react-notify-toast";
import "./styles/base.css";
import rootReducer from "./reducers";
import DevTools from "./devtools";
import updateStorage from "./middleware";


import {ApolloClient} from 'apollo-client';
//import {HttpLink} from 'apollo-link-http';
import { createHttpLink } from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';


require.ensure(["./sw-registration"], (require) => {
  require("./sw-registration")(notify);
}, "sw-registration");

const enhancer = compose(
  // Add middlewares you want to use in development:
  // applyMiddleware(d1, d2, d3),
  applyMiddleware(updateStorage),
  DevTools.instrument()
);

window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const store = createStore(rootReducer, initialState, enhancer);

  const client = new ApolloClient({
    link: new createHttpLink({uri: 'https://api.graph.cool/simple/v1/cj9g48vlm79hy0120m4tvigm9'}),
    cache: new InMemoryCache()
  });

  render(
      <ApolloProvider client={client} store={store}>
        <div>
          <Router history={browserHistory}>{routes}</Router>
          <DevTools/>
          <h1>Hello, world.</h1>
        </div>
      </ApolloProvider>,
    document.querySelector(".js-content")
  );
};
