import React from 'react'
import { useTable, Column } from 'react-table'
import { Table as StrapTable } from 'reactstrap'
import Header from './Header'
import Body from './Body'

interface TableProps {
  columns: Array<Column>
  data: Array<object>
  "data-testid"?: string
}

/**
 * 
 * @example [Basic Example](../storybook/index.html??path=/story/welcome--basic)
 */
const Table: React.FC<TableProps> = (props) => {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns: props.columns,
    data: props.data
  })

  return (
    <StrapTable data-testid={ props['data-testid'] || 'table' } {...getTableProps()}>
      <Header headerGroups={headerGroups} />
      <Body prepareRow={prepareRow} rows={rows} tableBodyProps={getTableBodyProps()} />
    </StrapTable>
  )
}

export default Table
export { TableProps }
