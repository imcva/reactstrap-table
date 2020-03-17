import React from 'react';
import { Table } from '../src';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap';

export default {
  title: 'reactstrap-table',
  component: Table,
}

export const Basic = () => {
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
          <Table options={{columns, data}} />
        </Col>
      </Row>
    </Container>
  )
}

Basic.story = {
  name: 'Basic',
};