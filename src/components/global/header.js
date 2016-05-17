import React from 'react'

const Header = () => {
  return (
  <header className='main-header'>
    <a href='' className='logo'><span className='logo-mini'><b>A</b>LT</span> <span className='logo-lg'>Placeful</span></a>
    <nav className='navbar navbar-static-top' role='navigation'>
      <a
        href='#'
        className='sidebar-toggle'
        data-toggle='offcanvas'
        role='button'><span className='sr-only'>Toggle navigation</span> <span className='icon-bar'></span> <span className='icon-bar'></span> <span className='icon-bar'></span></a>
      <a href='/logout' className='logout'>Logout</a>
    </nav>
  </header>
  )
}

export default Header
