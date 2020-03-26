import React from 'react';
import { Table, TableContext, ColumnControl, useTableContext } from '../src';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'reactstrap';

export default {
  title: 'reactstrap-table',
  component: Table
}

const State = () => {
  const { state } = useTableContext()
  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  )
}

export const ColumnControlExample = () => {
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
          <TableContext options={{ columns, data }}>
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

ColumnControlExample.story = {
  name: 'Column Control',
};