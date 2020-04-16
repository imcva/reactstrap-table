import React from 'react'
import { HeaderGroup, ColumnInstance } from 'react-table'
import useTableContext from './useTableContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

interface TrProps {
  headerGroup: HeaderGroup
}

interface ThProps {
  column: ColumnInstance
}

interface SortProps {
  sorted: boolean
  desc?: boolean
}

interface HeaderProps {
  stickyHeader?: boolean
}

const Sort: React.FC<SortProps> = (props) => {
  if (props.sorted) {
    return props.desc
      ? (<FontAwesomeIcon data-testid='faSortDown' icon={faSortDown} />)
      : (<FontAwesomeIcon data-testid='faSortUp' icon={faSortUp} />)
  }
  return (<FontAwesomeIcon data-testid='faSort' icon={faSort} />)
}

/**
 * Add sort controls to the table header
 * 
 * @see [useSortBy Example](../storybook/index.html?path=/story/reactstrap-table--table-sort-by)
 *  
 * @param props
 */
const ThSort: React.FC<ThProps> = (props) => {
  return (
    <th data-testid={props['data-testid'] || 'table-thead-tr-th'} {...props.column.getHeaderProps(props.column.getSortByToggleProps())}>
      {props.column.render('Header')}
      <span data-testid='sort-control' className='pl-2'>
        <Sort sorted={props.column.isSorted} desc={props.column.isSortedDesc} />
      </span>
    </th>
  )
}

const Th: React.FC<ThProps> = (props) => {
  return (
    <th data-testid={props['data-testid'] || 'table-thead-tr-th'} {...props.column.getHeaderProps()}>
      {props.column.render('Header')}
    </th>
  )
}

const Tr: React.FC<TrProps> = (props) => {
  return (
    <tr data-testid={props['data-testid'] || 'table-thead-tr'} {...props.headerGroup.getHeaderGroupProps()}>
      {props.headerGroup.headers.map((column, index) => { 
        if (column.canSort) {
          return <ThSort column={column} key={index} />
        } else {
          return <Th column={column} key={index} />
        }
      })}
    </tr>
  )
}


const Header: React.FC<HeaderProps> = (props) => {
  const { headerGroups } = useTableContext()

  return (
    <thead className={props.stickyHeader ? 'sticky-header' : ''} data-testid={'table-thead'}>
      {headerGroups.map((headerGroup, index) => (
        <Tr headerGroup={headerGroup} key={index} />
      ))}
    </thead>
  )
}

export default Header
