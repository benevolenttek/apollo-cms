import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router'
import { connect } from "react-redux"

import Notifications from "react-notify-toast"

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <text style={{fontSize:'40px'}}>Apollo CMS</text>
          <ul style={{padding:'0px'}}>
            <Link to="/">Home</Link>
            {' '}-{' '}
            <Link to="/posts">Posts</Link>
            {' '}-{' '}
            <Link to="/todos">TODOs</Link>
          </ul>
        </nav>

        <section>
          <Notifications />
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  // count: state.count
});

export default connect(mapStateToProps)(Header);

