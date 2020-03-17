import React from 'react'
import { Table as StrapTable } from 'reactstrap'
import Header from './Header'
import Body from './Body'
import useTableContext from './useTableContext'
import TableContext, { Context, TableProps } from './TableContext'

type OptionalTableProps = Partial<TableProps>

interface BaseTableProps {
  "data-testid"?: string
}

/**
 * Base Table component with no context injection.
 *  
 * @private
 */
const BaseTable: React.FC<BaseTableProps> = (props) => {
  const { getTableProps } = useTableContext() 

  return (
    <StrapTable data-testid={ props['data-testid'] || 'table' } {...getTableProps()}>
      <Header />
      <Body />
    </StrapTable>
  )
}

/**
 * Standard Table component joining [reactstrap](https://github.com/reactstrap/reactstrap)
 * and [react-table](https://github.com/tannerlinsley/react-table).
 * 
 * @see [[TableContext]] for exending the table to add on other features.
 * 
 * @example [Basic Example](../storybook/index.html?path=/story/reactstrap-table--basic)
 */
const Table: React.FC<OptionalTableProps> = (props) => { 
  const tableState = React.useContext(Context)

  if (tableState === null && (!props.options)) {
    throw new Error('If Table is not wrapped in a TableContext you must pass options props.')
  }

  if (tableState === null && props.options) {
    return (
      <TableContext options={props.options} plugins={props.plugins}>
        <BaseTable />  
      </TableContext>
    )
  } else if (tableState !== null ) {
    return <BaseTable />
  }
  return null
 }

export default Table
export { TableProps }
