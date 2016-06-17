import React from 'react'

const Message = (props) => {
  return (
  <tr>
    <td>
      <div>
        <input type='checkbox' className='checkbox' />
      </div>
    </td>
    <td className='mailbox-subject'>
      <a href=''>AdminLTE 2.0 Issue - Trying to find a solution to this problem...</a>
    </td>
    <td className='mailbox-date'>
      5 mins ago
    </td>
  </tr>
  )
}

export default Message
