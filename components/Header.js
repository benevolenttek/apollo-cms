import React from 'react'
import cookie from 'cookie'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

import redirect from '../lib/redirect'

import Link from 'next/link'

class Header extends React.Component {

  signout = (e) => {
    e.preventDefault()
    console.log("Signing Out...")
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    // this.props.client.resetStore().then(() => {
    // Redirect to a more useful page when signed out
    redirect({}, '/')
    // })
  }

  renderLogin = () => {
    return (
      <li className={this.props.pathname === '/login' ? 'active' : ''}>
        <Link prefetch href='/login'>
          <a>Login</a>
        </Link>
      </li>
    )
  }

  renderHello = () => {
    return (
      <li>
        <a href="#">Hello {this.props.loggedInUser.user.name}!</a>
      </li>
    )
  }

  renderLogout = () => {
    return (
      <li>
        <a href="#" onClick={this.signout}>Sign out</a>
      </li>
    )
  }

  render() {
    return (
      <div>
        <header>

          {/* Don't use React-Bootstrap Nav because it throws js error when using Link */}
          <Navbar inverse collapseOnSelect style={{marginBottom:"0px"}}>
            <Navbar.Header>
              <Link prefetch href='/'>
                <a className="navbar-brand">Apollo CMS</a>
              </Link>

              <Navbar.Toggle/>

            </Navbar.Header>


            <Navbar.Collapse>
              <ul className="nav navbar-nav">
                <li className={this.props.pathname === '/about' ? 'active' : ''}>
                  <Link prefetch href='/about'>
                    <a>About</a>
                  </Link>
                </li>
                <li className={this.props.pathname === '/blog' ? 'active' : ''}>
                  <Link prefetch href='/blog'>
                    <a>Blog</a>
                  </Link>
                </li>
                <li className={this.props.pathname === '/admin' ? 'active' : ''}>
                  <Link prefetch href='/admin'>
                    <a>Dashboard</a>
                  </Link>
                </li>
                <li className={this.props.pathname === '/admin/entries' ? 'active' : ''}>
                  <Link prefetch href='/admin/entries'>
                    <a>Content</a>
                  </Link>
                </li>

                {/* Example of dropdown
                  <li className="dropdown"><a id="basic-nav-dropdown" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false" href="#">Dropdown <span className="caret"></span></a>
                    <ul role="menu" className="dropdown-menu" aria-labelledby="basic-nav-dropdown">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                    </ul>
                  </li>
                  */}
              </ul>

              <ul className="nav navbar-nav navbar-right">
                  {!this.props.loggedInUser.user && this.renderLogin()}
                  {this.props.loggedInUser.user && this.renderHello()}
                  {this.props.loggedInUser.user && this.renderLogout()}
              </ul>
            </Navbar.Collapse>
          </Navbar>

        </header>

      </div>
    )
  }
}

export default Header;
