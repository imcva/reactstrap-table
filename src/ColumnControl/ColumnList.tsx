import React from 'react'

import ColumnItem from './ColumnItem'
import { ColumnInstance } from 'react-table'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'

interface ColumnListProps {
  columns: Array<ColumnInstance>
  draggable?: boolean
}

interface ListProps {
  columns: Array<ColumnInstance>
  provider?: DroppableProvided
}

/**
 * List group of all columns.
 * 
 * @private
 * 
 * @param props 
 */
const List: React.FC<ListProps> = (props) => {
  const { columns, provider } = props
  let listProps = {}
  if (provider) {
    listProps = {
      ...listProps,
      ...provider.droppableProps,
      ref: provider.innerRef
    }
  }
  return (
    <ul className='list-group' {...listProps}>
      {columns.map((column, index) => (
        <ColumnItem
          key={index}
          index={index}
          column={column}
          draggable={provider ? true : false}
        />
      ))}
      { provider ? provider.placeholder : null }
    </ul>
  )
}

/**
 * List wrapper to provide drag and drop support for column ordering
 * 
 * @private
 * 
 * @param props 
 */
const ColumnList: React.FC<ColumnListProps> = (props) => {
  const { columns } = props
  return (
    <>
      { props.draggable
        ? (
          <Droppable droppableId='table-columns'>
            {(provider) => {
              return (
                <List columns={columns} provider={provider} />
              )
            }}
          </Droppable>
        ) : (
          <List columns={columns} />
        )
      }
    </>
  )
}

export default ColumnList