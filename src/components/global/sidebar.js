import React from 'react'
import { Link } from 'react-router'

const Sidebar = (props) => {
  if (!props.merchant) {
    return (
    <div>
      loading...
    </div>
    )
  }
  let messageCount = 0
  const messages = props.merchant[0].messages.map((message, key) => {
    if (!message.read) {
      messageCount++
    }
    return messageCount
  })
  let active = messageCount > 0 ? 'active' : ''
  return (
  <div>
    <div className='mobile-menu-left-overlay'></div>
    <nav className='side-menu'>
      <ul className='side-menu-list'>
        <li className='green'>
          <Link to='/promo/new'>
          <i className='fa fa-edit'></i> <span className='lbl'>Create a new promotion</span>
          </Link>
        </li>
        <li className='magenta'>
          <Link to='/promotions'>
          <i className='fa fa-table'></i> <span className='lbl'>Promotions</span>
          </Link>
        </li>
        <li className='purple'>
          <Link to='/inbox'>
          <span><i className={`font-icon font-icon-comments ${active}`}></i> <span className='lbl'>Messages</span></span>
          </Link>
        </li>
        <li className='pink-red'>
          <Link to='/analytics'>
          <i className='font-icon font-icon-zigzag'></i>
          <span className='lbl'>Analytics</span>
          </Link>
        </li>
        <li className='brown'>
          <Link to='/quick_promo'>
          <i className='fa fa-edit'></i> <span className='lbl'>Last minute promo</span>
          </Link>
        </li>
        <li>
          <Link to='/followers/promote'>
          <i className='fa fa-users'></i> <span className='lbl'>Promote to followers</span>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default Sidebar
