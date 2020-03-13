import React from 'react'
import { Row, Cell, TableBodyProps } from 'react-table'

interface BodyProps {
  /** Header Group used to create the header TRs */
  rows: Array<Row>
  tableBodyProps: TableBodyProps
  prepareRow: (row: Row) => void;
}

interface TrProps {
  row: Row
}

interface TdProps {
  cell: Cell
}

const Td: React.FC<TdProps> = (props) => {
  return (
    <td data-testid={props['data-testid'] || 'table-tbody-tr-td'} {...props.cell.getCellProps()}>
      {props.cell.render('Cell')}
    </td>
  )
}

const Tr: React.FC<TrProps> = (props) => {
  return (
    <tr data-testid={props['data-testid'] || 'table-tbody-tr'} {...props.row.getRowProps()}>
      {props.row.cells.map((cell, index) => ( 
        <Td cell={cell} key={index} />
      ))}
    </tr>
  )
}

const Body: React.FC<BodyProps> = (props) => {
  return (
    <tbody data-testid={props['data-testid'] || 'table-tbody'} {...props.tableBodyProps}>
      {props.rows.map((row, index) => {
        props.prepareRow(row)
        return (
          <Tr row={row} key={index} />
        )
      })}
    </tbody>
  )
}

export default Body
