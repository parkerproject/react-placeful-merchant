import React from 'react'

const TableFilter = (props) => {
  return (
  <div className='row'>
    <div className='col-sm-6'>
      <div id='example1_filter' className='dataTables_filter'>
        <label>
          Search:
          <input
            type='search'
            className='form-control input-sm'
            placeholder=''
            aria-controls='example1' />
        </label>
      </div>
    </div>
  </div>
  )
}

export default TableFilter
