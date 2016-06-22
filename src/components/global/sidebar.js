import React from 'react'
import { Link } from 'react-router'

const Sidebar = (props) => {
  return (
  <aside className='main-sidebar'>
    <section className='sidebar'>
      <div className='user-panel'>
        <div className='pull-left'>
          <p>
            Demo
          </p>
          <i className='fa fa-circle text-success'></i> Online
        </div>
      </div>
      <ul className='sidebar-menu'>
        <li>
          <Link to='/promo/new'>
          <i className='fa fa-edit'></i> <span>Create a new promotion</span>
          </Link>
        </li>
        <li>
          <Link to='/promotions'>
          <i className='fa fa-table'></i> <span>Promotions</span>
          <small className='label pull-right bg-red'>{props.length}</small>
          </Link>
        </li>
        <li>
          <Link to='/inbox'>
          <i className='fa fa-envelope'></i> <span>Messages</span>
          <small className='label pull-right bg-red'>12</small>
          </Link>
        </li>
        <li>
          <Link to='/analytics'>
          <i className='fa fa-line-chart'></i> <span>Analytics</span>
          </Link>
        </li>
        <li>
          <Link to='/quick_promo'>
          <i className='fa fa-edit'></i> <span>Last minute promo</span>
          </Link>
        </li>
        <li>
          <Link to='/create_ad'>
          <i className='fa fa-users'></i> <span>Promote to followers</span>
          </Link>
        </li>
        <li>
          <Link to='/profile'>
          <i className='fa fa-user'></i> <span>Profile</span>
          </Link>
        </li>
      </ul>
    </section>
  </aside>
  )
}

export default Sidebar
