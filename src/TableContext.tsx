import React from 'react'
import { useTable, Column, TableInstance } from 'react-table'

interface TableProps {
  columns: Array<Column>
  data: Array<object>
  "data-testid"?: string
}

type TableState = TableInstance | null

const Context = React.createContext<TableState>(null)

/**
 * Context wrapper around the [[Table]] component. See [[useTableContext]] to
 * access the table state from within TableContext.
 *
 * @example [Table Context Example](../storybook/index.html?path=/story/reactstrap-table--with-context)
 */
const TableContext: React.FC<TableProps> = (props) => {
  const state = useTable({
    columns: props.columns,
    data: props.data
  })


  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}

export default TableContext
export { Context, TableState }