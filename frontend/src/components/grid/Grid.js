import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  PagingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';

import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';


export default () => {


  const [totalCount, setTotalCount] = useState(1000);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  const [rows, setRows] = useState([]);

  const [columns] = useState([
    { name: 'name', title: 'Name' ,idPropriedade:0,idPropriedadeGrupo:0,nomeGrupo:"",resposta: ""},
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);

  const getQueryString = () => (
    `${URL}&take=${pageSize}&skip=${pageSize * currentPage}`
  );
  const loadData = () => {
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString)
        .then(response => response.json())
        .then(({ data, totalCount: newTotalCount }) => {
          setRows(data);
          setTotalCount(newTotalCount);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };
  const a = [
    {gender: 'Female', name: 'Sandra', city: 'Las Vegas', car: 'Audi A4'},
    {gender: 'Male', name: 'Paul', city: 'Paris', car: 'Nissan Altima'},
    {gender: 'Male', name: 'Mark', city: 'Paris', car: 'Honda Accord'},
    {gender: 'Female', name: 'Sandra', city: 'Las Vegas', car: 'Audi A4'},
    {gender: 'Male', name: 'Paul', city: 'Paris', car: 'Nissan Altima'},
    {gender: 'Male', name: 'Mark', city: 'Paris', car: 'Honda Accord'}

  ];

  setRows(a);

  return (
    <Paper style={{ position: 'relative' }}>
    <Grid
      rows={rows}
      columns={columns}
    >
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
      />
      <CustomPaging
        totalCount={totalCount}
      />
      <Table />
      <TableHeaderRow />
      <PagingPanel />
    </Grid>
  
  </Paper>
  );
};
