import React from 'react'
import { Button } from 'reactstrap'

// @ts-ignore
import 'regenerator-runtime/runtime'
// @ts-ignore
import { render, fireEvent, waitFor, getByTestId, getAllByTestId } from '@testing-library/react'

import { Table, TableContext, ColumnControl } from '../src';
import { useColumnOrder } from 'react-table'

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

test('Reset Column Visiblity Without initialState', async () => {
  const Component = () => {
    return (
      <TableContext options={{ columns, data }}>
        <ColumnControl open={true} toggle={() => null} />
        <Table />
      </TableContext>
    )
  }

  const { getAllByTestId, getByTestId } = render(<Component />)
  const visiblityControls = getAllByTestId('column-visibility-icon-visible')
  fireEvent.click(visiblityControls[0])
  await waitFor(() => {
    const visiblityControlsHidden = getAllByTestId('column-visibility-icon-hidden')
    expect(visiblityControlsHidden.length).toBe(1)
  })
  fireEvent.click(getByTestId('reset-columns'))
  await waitFor(() => {
    const visiblityControls = getAllByTestId('column-visibility-icon-visible')
    expect(visiblityControls.length).toBe(2)
    const ths = getAllByTestId('table-thead-tr-th')
    const tds = getAllByTestId('table-tbody-tr-td')
    expect(ths.length).toBe(2)
    expect(tds.length).toBe(4)
  })
});

test('Reset Column Visiblity with initialState', async () => {
  const Component = () => {
    return (
      <TableContext options={{ columns, data, initialState: { hiddenColumns: ['firstname'] }}}>
        <ColumnControl open={true} toggle={() => null} />
        <Table />
      </TableContext>
    )
  }

  const { getAllByTestId, getByTestId } = render(<Component />)
  const visiblityControls = getAllByTestId('column-visibility-icon-hidden')
  fireEvent.click(visiblityControls[0])
  await waitFor(() => {
    const visiblityControlsHidden = getAllByTestId('column-visibility-icon-visible')
    expect(visiblityControlsHidden.length).toBe(2)
  })
  fireEvent.click(getByTestId('reset-columns'))
  await waitFor(() => {
    const visiblityControls = getAllByTestId('column-visibility-icon-visible')
    const visiblityControlsHidden = getAllByTestId('column-visibility-icon-hidden')
    expect(visiblityControls.length).toBe(1)
    expect(visiblityControlsHidden.length).toBe(1)
    const ths = getAllByTestId('table-thead-tr-th')
    const tds = getAllByTestId('table-tbody-tr-td')
    expect(ths.length).toBe(1)
    expect(tds.length).toBe(2)
  })
});

test('Dragging column control item changes its order', async () => {
  const Component = () => {
    return (
      <TableContext options={{ columns, data }} plugins={[useColumnOrder]}>
        <ColumnControl open={true} toggle={() => null} />
        <Table />
      </TableContext>
    )
  }

  const { getAllByTestId } = render(<Component />)

  // Verify starting order
  const controlItems = getAllByTestId('column-control-item')
  expect(controlItems[0].textContent).toBe('First Name')
  expect(controlItems[1].textContent).toBe('Last Name')

  // Drag first name
  const firstNameControl = controlItems[0]
  fireEvent.keyDown(firstNameControl, { keyCode: 32 });
  fireEvent.keyDown(firstNameControl, { keyCode: 40 });
  fireEvent.keyDown(firstNameControl, { keyCode: 32 });

  await waitFor(() => {
    // Verify order after sort
    const controlItems = getAllByTestId('column-control-item')
    expect(controlItems[0].textContent).toBe('Last Name')
    expect(controlItems[1].textContent).toBe('First Name')
  })
});

test('Rearrange column list will reorder table columns', async () => {
  const Component = () => {
    return (
      <TableContext options={{ columns, data }} plugins={[useColumnOrder]}>
        <ColumnControl open={true} toggle={() => null} />
        <Table />
      </TableContext>
    )
  }

  const { getAllByTestId } = render(<Component />)

  // Verify starting order
  const ths = getAllByTestId('table-thead-tr-th')
  expect(ths[0].textContent).toBe('First Name')
  expect(ths[1].textContent).toBe('Last Name')

  // Drag first name
  const firstNameControl = getAllByTestId('column-control-item')[0]
  fireEvent.keyDown(firstNameControl, { keyCode: 32 });
  fireEvent.keyDown(firstNameControl, { keyCode: 40 });
  fireEvent.keyDown(firstNameControl, { keyCode: 32 });

  await waitFor(() => {
    // Verify order after sort
    const ths_post_drag = getAllByTestId('table-thead-tr-th')
    expect(ths_post_drag[0].textContent).toBe('Last Name')
    expect(ths_post_drag[1].textContent).toBe('First Name')
  })
});

test('Reset after rearrange columns without initialState', async () => {
  const Component = () => {
    return (
      <TableContext options={{ columns, data }} plugins={[useColumnOrder]}>
        <ColumnControl open={true} toggle={() => null} />
        <Table />
      </TableContext>
    )
  }

  const { getAllByTestId, getByTestId } = render(<Component />)

  // Drag first name
  const firstNameControl = getAllByTestId('column-control-item')[0]
  fireEvent.keyDown(firstNameControl, { keyCode: 32 });
  fireEvent.keyDown(firstNameControl, { keyCode: 40 });
  fireEvent.keyDown(firstNameControl, { keyCode: 32 });
  
  // Reset Columns
  fireEvent.click(getByTestId('reset-columns'))

  await waitFor(() => {
    // Verify order after sort
    const ths_post_reset = getAllByTestId('table-thead-tr-th')
    expect(ths_post_reset[0].textContent).toBe('First Name')
    expect(ths_post_reset[1].textContent).toBe('Last Name')
  })
});

test('Reset after rearrange columns with initialState', async () => {
  const Component = () => {
    return (
      <TableContext options={{ columns, data, initialState: { columnOrder: ['lastname', 'firstname']}}} plugins={[useColumnOrder]}>
        <ColumnControl open={true} toggle={() => null} />
        <Table />
      </TableContext>
    )
  }

  const { getAllByTestId, getByTestId } = render(<Component />)

  // Drag first name
  const lastNameControl = getAllByTestId('column-control-item')[0]
  fireEvent.keyDown(lastNameControl, { keyCode: 32 });
  fireEvent.keyDown(lastNameControl, { keyCode: 40 });
  fireEvent.keyDown(lastNameControl, { keyCode: 32 });
  
  // Reset Columns
  fireEvent.click(getByTestId('reset-columns'))

  await waitFor(() => {
    // Verify order after sort
    const ths_post_reset = getAllByTestId('table-thead-tr-th')
    expect(ths_post_reset[0].textContent).toBe('Last Name')
    expect(ths_post_reset[1].textContent).toBe('First Name')
  })
});