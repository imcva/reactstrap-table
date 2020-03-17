import React from 'react'
import { render } from '@testing-library/react'

import Body from '../src/Body'
import { TableContext } from '../src';

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
      <TableContext options={{ columns, data }}>
        <table>
          <Body />
        </table>
      </TableContext>
    )
  }

  const { getByTestId, getAllByTestId } = render(<Component />)
  const tbody = getByTestId('table-tbody')
  const trs = getAllByTestId('table-tbody-tr')
  const ths = getAllByTestId('table-tbody-tr-td')
  expect(tbody).toBeTruthy()
  expect(trs.length).toBe(2)
  expect(ths.length).toBe(4)
  expect(ths[0].textContent).toBe('John')
  expect(ths[1].textContent).toBe('Doe')
  expect(ths[2].textContent).toBe('Jane')
  expect(ths[3].textContent).toBe('Smith')
});