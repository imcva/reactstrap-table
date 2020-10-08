import React, { useEffect } from 'react'
import { useTable, TableInstance, TableOptions, PluginHook } from 'react-table'

interface TableProps<D extends object = any> {
  options: TableOptions<D>,
  plugins?: PluginHook<D>[],
  storageKey?: string,
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

  const options = React.useMemo(() => {
    const opts = {
      ...props.options
    }
    if(props.storageKey) {
      const cacheString = localStorage.getItem(props.storageKey)
      const cache = cacheString ? JSON.parse(cacheString) : undefined
      opts.initialState = cache || props.options.initialState
    }
    return opts
  }, [props.storageKey, props.options])

  const state = useTable(
    options,
    ...plugins
  )

  useEffect(() => {
    if (props.storageKey) {
      localStorage.setItem(props.storageKey, JSON.stringify(state.state))
    }
  }, [props.storageKey, state.state])

  return (
    <Context.Provider value={{ ...state, originalOptions: props.options }}>
      {props.children}
    </Context.Provider>
  )
}

export default TableContext
export { Context, TableState, TableProps }