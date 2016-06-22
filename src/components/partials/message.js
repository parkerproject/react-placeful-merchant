import React from 'react'
import { Link } from 'react-router'

const Message = (props) => {
  if (!props.data) {
    return (<div>
              loading...
            </div>)
  }

  const messages = props.data[0].messages.map((message, key) => {
    let subjectClass = message.read ? 'font-weight-normal' : 'font-weight-bold'
    return (
    <tr key={key}>
      <td>
        <div>
          <input type='checkbox' className='checkbox' />
        </div>
      </td>
      <td className='mailbox-subject'>
        <Link to={`/message/${message.message_id}`} className={subjectClass}>
        {message.subject}
        </Link>
      </td>
      <td className='mailbox-date'>
        5 mins ago
      </td>
    </tr>
    )
  })
  return (
  <table className='table table-hover table-striped'>
    <tbody>
      {messages}
    </tbody>
  </table>
  )
}

export default Message
