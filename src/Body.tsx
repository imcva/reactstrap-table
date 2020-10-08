import React from 'react'
import { Row, Cell } from 'react-table'
import useTableContext from './useTableContext'

interface TrProps {
  row: Row
}

interface TdProps {
  cell: Cell
}

const Td: React.FC<TdProps> = (props) => {
  return (
    <td className={props.cell.column.className} data-testid={props['data-testid'] || 'table-tbody-tr-td'} {...props.cell.getCellProps()}>
      {props.cell.render('Cell')}
    </td>
  )
}

const Tr: React.FC<TrProps> = (props) => {
  return (
    <tr className='h-100' data-testid={props['data-testid'] || 'table-tbody-tr'} {...props.row.getRowProps()}>
      {props.row.cells.map((cell, index) => ( 
        <Td cell={cell} key={index} />
      ))}
    </tr>
  )
}

const Body: React.FC = () => {
  const { getTableBodyProps, rows, prepareRow } = useTableContext()

  return (
    <tbody data-testid='table-tbody' {...getTableBodyProps()}>
      {rows.map((row, index) => {
        prepareRow(row)
        return (
          <Tr row={row} key={index} />
        )
      })}
    </tbody>
  )
}

export default Body
