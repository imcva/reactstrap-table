import React from 'react'
import {render} from '@testing-library/react'

import { Table } from '../src'

test('Table Has Rendered', () => {
  const columns = [
    { Header: 'First Name', accessor: 'firstname'},
    { Header: 'Last Name', accessor: 'lastname'}
  ]

  const data = [
    { firstname: 'John', lastname: 'Doe' },
    { firstname: 'Jane', lastname: 'Smith'}
  ]

  const { queryByTestId } = render(<Table columns={columns} data={data} />)
  expect(queryByTestId('table')).toBeTruthy()
});