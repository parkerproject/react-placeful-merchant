import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
  <header className='site-header'>
    <div className='container-fluid'>
      <img src='/img/Placeful-logo-black.png' alt='' />
      <button className='hamburger hamburger--htla'>
        <span>toggle menu</span>
      </button>
      <div className='site-header-content'>
        <div className='site-header-content-in'>
          <div className='site-header-shown'>
            <div className='dropdown user-menu'>
              <button
                className='dropdown-toggle'
                id='dd-user-menu'
                type='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                <img src='/img/avatar-2-64.png' alt='' />
              </button>
              <div className='dropdown-menu dropdown-menu-right' aria-labelledby='dd-user-menu'>
                <Link className='dropdown-item' to='/profile'>
                <span className='font-icon glyphicon glyphicon-user'></span>Profile
                </Link>
                <div className='dropdown-divider'></div>
                <Link className='dropdown-item' to='/logout'>
                <span className='font-icon glyphicon glyphicon-log-out'></span>Logout
                </Link>
              </div>
            </div>
            <button type='button' className='burger-right'>
              <i className='font-icon-menu-addl'></i>
            </button>
          </div>
          <div className='mobile-menu-right-overlay'></div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header
