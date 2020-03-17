import React from 'react';
import { Table } from '../src';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap';
import { useSortBy } from 'react-table';

export default {
  title: 'reactstrap-table',
  component: Table,
}

export const TableSortBy = () => {
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
          <Table options={{columns, data}} plugins={[useSortBy]} />
        </Col>
      </Row>
    </Container>
  )
}

TableSortBy.story = {
  name: 'useSortBy',
};