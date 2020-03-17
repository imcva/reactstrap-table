import React from 'react';
import { useGlobalFilter } from 'react-table'
import { Table, TableContext, GlobalSearch, globalSearchFilter } from '../src';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap';

export default {
  title: 'reactstrap-table',
  component: Table
}

export const GlobalSearchExample = () => {
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
          <TableContext options={{ columns, data, globalFilter: globalSearchFilter }} plugins={[useGlobalFilter]}>
            <GlobalSearch className='my-3' />
            <GlobalSearch className='my-3' placeholder='Search...' />
            <GlobalSearch className='my-3' placeholder={(count) => `${count} people...`} />
            <Table />
          </TableContext>
        </Col>
      </Row>
    </Container>
  )
}

GlobalSearchExample.story = {
  name: 'GlobalSearch',
};