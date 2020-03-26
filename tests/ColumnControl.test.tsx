import React from 'react'
import { Button } from 'reactstrap'

// @ts-ignore
import 'regenerator-runtime/runtime'

// @ts-ignore
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Table, TableContext, ColumnControl } from '../src';

const columns = [
  { Header: 'First Name', accessor: 'firstname' },
  { Header: 'Last Name', accessor: 'lastname' }
]

const data = [
  { firstname: 'John', lastname: 'Doe' },
  { firstname: 'Jane', lastname: 'Smith' }
]

test('Modal open and toggle props', async () => {
  const Component = () => {
    const [ open, setOpen ] = React.useState(false)
    return (
      <TableContext options={{ columns, data }}>
        <Button data-testid='open-controls' onClick={() => setOpen(true)}>
          Open
        </Button>
        <ColumnControl open={open} toggle={() => setOpen(o => !o)} />
        <Table />
      </TableContext>
    )
  }

  const { getByTestId, queryByTestId, getByLabelText } = render(<Component />)
  let modal = queryByTestId('column-control')

  // Default closed
  expect(modal).not.toBeInTheDocument()

  // Open Dialog
  fireEvent.click(getByTestId('open-controls'))
  modal = queryByTestId('column-control')
  expect(modal).toBeVisible()

  // Close Dialog
  const close = getByLabelText('Close') 
  fireEvent.click(close)
  await waitFor(() => {
    modal = queryByTestId('column-control')
    expect(modal).not.toBeInTheDocument()
  })
});

test('Visiblity Toggle', async () => {
  const Component = () => {
    return (
      <TableContext options={{ columns, data }}>
        <ColumnControl open={true} toggle={() => null} />
        <Table />
      </TableContext>
    )
  }

  const { getAllByTestId } = render(<Component />)
  const visiblityControls= getAllByTestId('column-visibility-icon-visible')
  expect(visiblityControls.length).toBe(2)
  fireEvent.click(visiblityControls[0])
  await waitFor(() => {
    const visiblityControlsHidden = getAllByTestId('column-visibility-icon-hidden')
    expect(visiblityControlsHidden.length).toBe(1)
    const ths = getAllByTestId('table-thead-tr-th')
    const tds = getAllByTestId('table-tbody-tr-td')
    expect(ths.length).toBe(1)
    expect(tds.length).toBe(2)
  })
});