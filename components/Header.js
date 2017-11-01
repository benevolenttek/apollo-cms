import Link from 'next/link'

export default ({pathname}) => (
  <div>
    <header>

      {/* Don't use React-Bootstrap Nav because you can't use Link and prefetch with it */}
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link prefetch href='/'>
              <a className="navbar-brand">Apollo CMS</a>
            </Link>
          </div>

          <ul className="nav navbar-nav">
            <li className={pathname === '/about' ? 'active' : ''}>
              <Link prefetch href='/about'>
                <a>About</a>
              </Link>
            </li>
            <li className={pathname === '/blog' ? 'active' : ''}>
              <Link prefetch href='/blog'>
                <a>Blog</a>
              </Link>
            </li>
            <li className={pathname === '/admin' ? 'active' : ''}>
              <Link prefetch href='/admin'>
                <a>Dashboard</a>
              </Link>
            </li>
            <li className={pathname === '/admin/entries' ? 'active' : ''}>
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
        </div>
      </nav>
    </header>

  </div>
)
