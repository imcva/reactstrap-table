import React from 'react'
import { Input, InputProps } from 'reactstrap';
import { FilterType, useAsyncDebounce } from 'react-table'

import useTableContext from './useTableContext'

interface GlobalSearchProps extends Omit<InputProps, 'value' | 'placeholder'> {
  /** Staring value to search with */
  value?: string
  /** Change the placeholder with a static string or include the record count */
  placeholder?: string | ((count: number) => string)
}

/**
 * An input element that leverages react-table's `useGlobalFilter` plugin. Be
 * sure to include the `useGlobalfiler` plugin when setting up the table.
 *
 * @see [useGlobalFilter Docs](https://github.com/tannerlinsley/react-table/blob/master/docs/api/useGlobalFilter.md)
 * @example [GlobalSearchExample](../storybook/index.html?path=/story/reactstrap-table--global-search-example)
 */
const GlobalSearch: React.FC<GlobalSearchProps> = (props) => {
  const { state, setGlobalFilter, preGlobalFilteredRows } = useTableContext();
  const count = preGlobalFilteredRows.length;

  React.useEffect(() => {
    setGlobalFilter(props.value)
  }, [props.value, setGlobalFilter])

  const placeholder = typeof props.placeholder === 'function'
    ? props.placeholder(count)
    : props.placeholder

  const setGlobalFilterDebounced = useAsyncDebounce(setGlobalFilter, 30)

  return (
    <Input
      {...props}
      value={state.globalFilter || ""}
      data-testid='global-search'
      onChange={e => {
        setGlobalFilterDebounced(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={placeholder || `${count} records...`}
    />
  );
}


/**
 * Filter method that leverages a search key on each column if the accessor
 * doesn't return an object. This can be set as the `globalFilter` method on the
 * table options.
 * 
 * @see [useGlobalFilter Docs](https://github.com/tannerlinsley/react-table/blob/master/docs/api/useGlobalFilter.md)
 * @example [GlobalSearchExample](../storybook/index.html?path=/story/reactstrap-table--global-search-example)
 *  
 * @param rows 
 * @param columnNames 
 * @param filterValue 
 */
const globalSearchFilter: FilterType<{}> = (rows, columnNames, filterValue) => {
  return rows.filter(row => {
    const values = row.cells.map(cell => {
      const value = cell.value;
      if (typeof value !== "string") {
        const search = cell.column.search;
        if (typeof search === "function") {
          const result = search(cell.row.original);
          return typeof result === "string" ? result : null;
        }
        return String(value);
      }
      return value;
    })
    return values.find((value, index) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(filterValue.toLowerCase())
      }
      return false
    });
  });
}

export default GlobalSearch;
export { globalSearchFilter }