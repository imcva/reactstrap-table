import React from 'react';
import { Table, TableContext, useTableContext } from '../src';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap';

export default {
  title: 'reactstrap-table',
  component: Table
}

const DisplayColumnJson = () => {
  const { columns } = useTableContext()
  return (
    <Row>
      <Col className='bg-light col-11 mx-auto'>
        <pre>
          {JSON.stringify(columns, null, 2)}
        </pre>
      </Col>
    </Row>
  )
}

export const WithContext = () => {
  const columns = [
    { Header: 'First Name', accessor: 'firstname'},
    { Header: 'Last Name', accessor: 'lastname'}
  ]

  const data = [
    { firstname: 'John', lastname: 'Doe' },
    { firstname: 'Jane', lastname: 'Smith'}
  ]

  return (
    <Container fluid>
      <Row>
        <Col>
          <TableContext options={{ columns, data }}>
            <Table />
            <DisplayColumnJson />
          </TableContext>
        </Col>
      </Row>
    </Container>
  )
}

WithContext.story = {
  name: 'Table Context',
};