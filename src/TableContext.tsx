import React from 'react'
import { useTable, TableInstance, TableOptions, PluginHook } from 'react-table'

interface TableProps {
  options: TableOptions<{}>,
  plugins?: PluginHook<{}>[]
  "data-testid"?: string
}

type TableState = TableInstance

const Context = React.createContext<TableState | null>(null)

/**
 * Context wrapper around the [[Table]] component. See [[useTableContext]] to
 * access the table state from within TableContext.
 *
 * @example [Table Context Example](../storybook/index.html?path=/story/reactstrap-table--with-context)
 */
const TableContext: React.FC<TableProps> = (props) => {
  const plugins = props.plugins || []

  const state = useTable(
    props.options,
    ...plugins
  )

  return (
    <Context.Provider value={{ ...state }}>
      {props.children}
    </Context.Provider>
  )
}

export default TableContext
export { Context, TableState, TableProps }