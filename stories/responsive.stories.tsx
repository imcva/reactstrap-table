import React from 'react';
import { Table } from '../src';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap';

export default {
  title: 'reactstrap-table',
  component: Table,
}

export const ResponsiveVertical = () => {
  const columns = [
    { Header: 'First Name', accessor: 'firstname'},
    { Header: 'Last Name', accessor: 'lastname'}
  ]

  const data = [
    {firstname:"Olga",lastname:"Gerasch"},
    {firstname:"Mateo",lastname:"Ferrettino"},
    {firstname:"Darrin",lastname:"Giacomoni"},
    {firstname:"Julie",lastname:"Scoggan"},
    {firstname:"Anson",lastname:"Hancox"},
    {firstname:"Gusella",lastname:"Cicculini"},
    {firstname:"Cary",lastname:"Lendon"},
    {firstname:"Bobine",lastname:"Hunnaball"},
    {firstname:"Joanie",lastname:"Barthram"},
    {firstname:"Gigi",lastname:"Derricoat"},
    {firstname:"Renaud",lastname:"Prendeguest"},
    {firstname:"Dyna",lastname:"Casper"},
    {firstname:"Travers",lastname:"Boribal"},
    {firstname:"Bert",lastname:"Giorgi"},
    {firstname:"Nyssa",lastname:"Hancke"},
    {firstname:"Eddy",lastname:"Camies"},
    {firstname:"Beau",lastname:"Lapthorne"},
    {firstname:"Cindelyn",lastname:"Highwood"},
    {firstname:"Vasilis",lastname:"Plumstead"},
    {firstname:"Garrick",lastname:"Clemo"},
    {firstname:"Evvie",lastname:"Devil"},
    {firstname:"Mariska",lastname:"Dumbelton"},
    {firstname:"Reid",lastname:"Serfati"},
    {firstname:"Othello",lastname:"Chuney"},
    {firstname:"Wes",lastname:"Lefort"},
    {firstname:"Kaylee",lastname:"Roddan"},
    {firstname:"Virge",lastname:"Yatman"},
    {firstname:"Kathye",lastname:"Karel"},
    {firstname:"Kamilah",lastname:"Krugmann"},
    {firstname:"Glad",lastname:"McNutt"},
    {firstname:"Hermina",lastname:"Wyett"},
    {firstname:"Pepillo",lastname:"Morton"},
    {firstname:"Clemmy",lastname:"Hoyer"},
    {firstname:"Osborne",lastname:"Swiggs"},
    {firstname:"Lenka",lastname:"Leap"},
    {firstname:"Suzann",lastname:"Ganders"},
    {firstname:"Ingra",lastname:"Jiggen"},
    {firstname:"Alvin",lastname:"Downe"},
    {firstname:"Filippa",lastname:"Benedicto"},
    {firstname:"Bennie",lastname:"Aizikowitz"},
    {firstname:"Morry",lastname:"Riste"},
    {firstname:"Ginnie",lastname:"Starr"},
    {firstname:"Gannon",lastname:"Whawell"},
    {firstname:"Kermit",lastname:"Spafford"},
    {firstname:"Colline",lastname:"Leipoldt"},
    {firstname:"Aubrey",lastname:"Raspin"},
    {firstname:"Yard",lastname:"Curness"},
    {firstname:"Rafaelita",lastname:"Crumpton"},
    {firstname:"Ettore",lastname:"Chishull"},
    {firstname:"Lena",lastname:"Palay"}
  ]

  return (
    <Container fluid>
      <Row>
        <Col>
          <Table stickyHeader responsive responsiveHeight='250px' options={{columns, data}} />
        </Col>
      </Row>
    </Container>
  )
}

ResponsiveVertical.story = {
  name: 'Responsive - Vertical',
};

export const ResponsiveHorizontal = () => {
  const columns = [
    { Header: 'First Name', accessor: 'firstname'},
    { Header: 'Last Name', accessor: 'lastname'},
    { Header: 'Gender', accessor: 'gender'},
    { Header: 'Age', accessor: 'age'},
    { Header: 'E-Mail', accessor: 'email'},
    { Header: 'Phone', accessor: 'phone'},
    { Header: 'Address', accessor: 'address'},
    { Header: 'City', accessor: 'city'},
    { Header: 'State', accessor: 'state'},
    { Header: 'Zipcode', accessor: 'zipcode'}
  ]

  const data = [
    {firstname:"Collie",lastname:"Heavyside",email:"cheavyside0@cbsnews.com",gender:"Female",address:"3 Elgar Pass",city:"Fayetteville",state:"North Carolina",zipcode:"28305"},
    {firstname:"Prinz",lastname:"Hards",email:"phards1@quantcast.com",gender:"Male",address:"62 Laurel Hill",city:"Portland",state:"Oregon",zipcode:"97206"},
    {firstname:"Puff",lastname:"Cucinotta",email:"pcucinotta2@xinhuanet.com",gender:"Male",address:"80921 Scott Court",city:"Pasadena",state:"California",zipcode:"91117"},
    {firstname:"Collete",lastname:"Guyet",email:"cguyet3@github.io",gender:"Female",address:"11 Sloan Court",city:"Kent",state:"Washington",zipcode:"98042"},
    {firstname:"Marsha",lastname:"Loudon",email:"mloudon4@multiply.com",gender:"Female",address:"1061 Mosinee Junction",city:"Houston",state:"Texas",zipcode:"77035"}
  ]

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <Table responsive options={{columns, data}} />
        </Col>
      </Row>
    </Container>
  )
}

ResponsiveHorizontal.story = {
  name: 'Responsive - Horizontal',
};