import React from 'react'
// @ts-ignore
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Table, TableContext } from '../src';
import { useSortBy } from 'react-table';

test('Table Header has rendered with proper columns', async () => {
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
      <TableContext options={{ columns, data }} plugins={[useSortBy]}>
        <Table />
      </TableContext>
    )
  }

  const { getAllByTestId } = render(<Component />)
  const sortControls = getAllByTestId('sort-control')
  expect(sortControls.length).toBe(columns.length)
  fireEvent.click(sortControls[0])
  await waitFor(() => {
    const firstTrTd = getAllByTestId('table-tbody-tr')[0].children[0]
    expect(firstTrTd.textContent).toBe('Jane')
  })
});