import React from 'react'

const Tablehead = () => {
  const headerArr = ['Ticket', 'Promo', 'Start date', 'End date', 'URL', null].map((item, k) => {
    return (
    <th
      className='sorting_asc'
      tabIndex='0'
      aria-controls='example1'
      rowSpan='1'
      colSpan='1'
      aria-sort='ascending'
      aria-label='Rendering engine: activate to sort column descending'
      key={k}>
      {item}
    </th>
    )
  })
  return (
  <thead>
    <tr role='row'>
      {headerArr}
    </tr>
  </thead>
  )
}

export default Tablehead
