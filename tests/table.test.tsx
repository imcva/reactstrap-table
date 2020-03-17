import React from 'react'
import {render} from '@testing-library/react'

import { Table, TableContext, useTableContext } from '../src'

const columns = [
  { Header: 'First Name', accessor: 'firstname' },
  { Header: 'Last Name', accessor: 'lastname' }
]

const data = [
  { firstname: 'John', lastname: 'Doe' },
  { firstname: 'Jane', lastname: 'Smith' }
]

let original = {
  error: console.error,
  warn: console.warn
}

const silenceConsole = () => {
  Object.keys(original).forEach(key => {
    console[key] = (msg: string) => null
  })
}

const resetConsole = () => {
  Object.keys(original).forEach(key => {
    console[key] = original[key]
  })
}

afterEach(() => {
  resetConsole()
})

test('Table without Context', () => {
  const { queryByTestId } = render(<Table options={{ columns, data }} />)
  expect(queryByTestId('table')).toBeInTheDocument()
});

test('Table without Context or Table props', () => {
  silenceConsole() //Suppress console messages

  // Throw error because of missing props and no context
  expect(() => render(<Table />)).toThrowError()
});

test('Table With Context', () => {
  const Component = () => {
    return (
      <TableContext options={{ columns, data }}>
        <Table />
      </TableContext>
    ) 
  }

  const { queryByTestId } = render(<Component />)
  expect(queryByTestId('table')).toBeInTheDocument()
});

test('Use context without provider should throw', () => {
  silenceConsole() //Suppress warning from console.error

  const InnerComponent = () => {
    const { columns } = useTableContext()
    return (
      <pre>
        {JSON.stringify(columns)}
      </pre>
    )
  }

  const Component = () => {
    return (
      <>
        <Table options={{ columns, data }} />
        <InnerComponent />
      </>
    ) 
  }

  expect(() => render(<Component />)).toThrow()
});