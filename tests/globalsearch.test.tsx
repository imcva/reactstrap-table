import React from 'react'

// @ts-ignore
import 'regenerator-runtime/runtime'

// @ts-ignore
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Table, TableContext, GlobalSearch, globalSearchFilter } from '../src';
import { useGlobalFilter } from 'react-table';

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
      <TableContext options={{ columns, data, globalFilter: globalSearchFilter }} plugins={[useGlobalFilter]}>
        <GlobalSearch />
        <Table />
      </TableContext>
    )
  }

  const { getByTestId, getAllByTestId } = render(<Component />)
  const search = getByTestId('global-search') as HTMLInputElement
  expect(search).toBeInTheDocument()
  expect(getAllByTestId('table-tbody-tr').length).toBe(2)
  fireEvent.change(search, { target: { value: 'John'} })
  await waitFor(() => {
    expect(search.value).toBe('John')
    expect(getAllByTestId('table-tbody-tr').length).toBe(1)
  })
});