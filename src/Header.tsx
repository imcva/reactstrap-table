import React from 'react'
import { HeaderGroup, ColumnInstance } from 'react-table'
import useTableContext from './useTableContext'

interface TrProps {
  headerGroup: HeaderGroup
}

interface ThProps {
  column: ColumnInstance
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
      {props.headerGroup.headers.map((column, index) => ( 
        <Th column={column} key={index} />
      ))}
    </tr>
  )
}

const Header: React.FC = (props) => {
  const { headerGroups } = useTableContext()

  return (
    <thead data-testid={'table-thead'}>
      {headerGroups.map((headerGroup, index) => (
        <Tr headerGroup={headerGroup} key={index} />
      ))}
    </thead>
  )
}

export default Header
