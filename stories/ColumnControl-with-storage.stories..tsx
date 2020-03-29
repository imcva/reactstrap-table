import React from 'react';
import { Table, TableContext, ColumnControl, useTableContext } from '../src';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'reactstrap';
import { useColumnOrder } from 'react-table';

export default {
  title: 'reactstrap-table',
  component: Table
}

const State = () => {
  const table = useTableContext()
  return (
    <pre>
      {JSON.stringify(table.state, null, 2)}
    </pre>
  )
}

export const ColumnControlStorageExample = () => {
  const [ open, setOpen ] = React.useState(false)
  const columns = React.useMemo(() => [
    { Header: 'First Name', accessor: 'firstname'},
    { Header: 'Last Name', accessor: 'lastname'}
  ], [])

  const data = React.useMemo(() => [
    { firstname: 'John', lastname: 'Doe' },
    { firstname: 'Jane', lastname: 'Smith'}
  ], [])

  return (
    <Container fluid>
      <Row>
        <Col>
          <TableContext options={{ columns, data }} storageKey='my-table' plugins={[useColumnOrder]}>
            <Button onClick={() => setOpen(s => !s)}>Open Settings</Button>
            <ColumnControl open={open} toggle={() => setOpen(o => !o)}/>
            <Table />
            <State />
          </TableContext>
        </Col>
      </Row>
    </Container>
  )
}

ColumnControlStorageExample.story = {
  name: 'Column Control with Storage',
};