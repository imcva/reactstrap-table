import React from 'react'
import { HeaderGroup, ColumnInstance } from 'react-table'

interface HeaderProps {
  /** Header Group used to create the header TRs */
  headerGroups: Array<HeaderGroup>
}

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

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <thead data-testid={props['data-testid'] || 'table-thead'}>
      {props.headerGroups.map((headerGroup, index) => (
        <Tr headerGroup={headerGroup} key={index} />
      ))}
    </thead>
  )
}

export default Header
