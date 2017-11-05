import React from "react";
import {render} from "react-dom";
import {routes} from "./routes";
import {Router, browserHistory} from "react-router";
// import {createStore, compose, applyMiddleware} from "redux";
// import {Provider} from "react-redux";
import {notify} from "react-notify-toast";
import "./styles/base.css";
import rootReducer from "./reducers";
import DevTools from "./devtools";
import updateStorage from "./middleware";
import withData from "./withData";

require.ensure(["./sw-registration"], (require) => {
  require("./sw-registration")(notify);
}, "sw-registration");

// window.webappStart = () => {
//   const initialState = window.__PRELOADED_STATE__;
//   const store = createStore(rootReducer, initialState, enhancer);
//   render(
//     <ApolloProvider client={client} store={store}>
//       <div>
//         <Router history={browserHistory}>{routes}</Router>
//         <DevTools/>
//       </div>
//     </ApolloProvider>,
//     document.querySelector(".js-content")
//   );
// };

class AppWrapper extends React.Component {
  render() {
    return (
      <withData>
        <div>
          <Router history={browserHistory}>{routes}</Router>
          <DevTools/>
        </div>
      </withData>,
        document.querySelector(".js-content")
    )
  }
};

window.webappStart = AppWrapper;
