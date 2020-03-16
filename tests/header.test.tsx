import React from 'react'
import { render } from '@testing-library/react'

import Header from '../src/Header'
import { TableContext } from '../src'

test('Table Header has rendered with proper columns', () => {
  const columns = [
    { Header: 'First Name', accessor: 'firstname'},
    { Header: 'Last Name', accessor: 'lastname'}
  ]

  const data = [
    { firstname: 'John', lastname: 'Doe' },
    { firstname: 'Jane', lastname: 'Smith'}
  ]

  const Component = () => {
    return (
      <TableContext columns={columns} data={data}>
        <table>
          <Header />
        </table>
      </TableContext>
    )
  }

  const { getByTestId, getAllByTestId } = render(<Component />)
  const thead = getByTestId('table-thead')
  const trs = getAllByTestId('table-thead-tr')
  const ths = getAllByTestId('table-thead-tr-th')
  expect(thead).toBeTruthy()
  expect(trs.length).toBe(1)
  expect(ths.length).toBe(2)
  expect(ths[0].textContent).toBe('First Name')
  expect(ths[1].textContent).toBe('Last Name')
});