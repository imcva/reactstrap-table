import React from 'react'

import ColumnItem from './ColumnItem'
import { ColumnInstance } from 'react-table'

interface ColumnListProps {
  columns: Array<ColumnInstance>
}

/**
 * List group of all columns.
 * 
 * @private
 * 
 * @param props 
 */
const ColumnList: React.FC<ColumnListProps> = (props) => {
  const { columns } = props
  return (
    <ul className='list-group'>
      {columns.map((column, index) => (
        <ColumnItem
          key={index}
          column={column}
        />
      ))}
    </ul>
  )
}

export default ColumnList