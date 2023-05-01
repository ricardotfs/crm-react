
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid';
import {Grid,Table,TableHeaderRow,PagingPanel} from '@devexpress/dx-react-grid-material-ui';

//import { Loading } from '../../../theme-sources/material-ui/components/loading';

//hooks
import {useSelector,useDispatch} from 'react-redux'

//slice
import { gridData } from '../../slice/gridSlices';

export default () => {
  
  const dispatch = useDispatch()

  const {columns,rows,totalCount,loading} = useSelector((state) => state.grid)
  const [currentPageSize,setCurrentPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSizes] = useState([5, 10, 15, 50]);

  const loadData = () => {

    
    const filter = {idTipoCadastro:6,page:currentPage,sizePage: currentPageSize};


    dispatch(gridData(filter));

  };

  useEffect(() => {
    loadData();
  },[dispatch,currentPageSize,currentPage]);

if(loading){
  return <p>Carregando.....</p>  
}

  return (
    <Paper style={{ position: 'relative' }}>
      <Grid rows={rows} columns={columns}>
        <PagingState
          currentPage={currentPage} onCurrentPageChange={setCurrentPage} defaultPageSize={5} />
        <CustomPaging totalCount={totalCount} />
        <Table />
        <TableHeaderRow />
        <PagingPanel pageSizes={pageSizes} onPageSizeChange={setCurrentPageSize} />
      </Grid>
      {/* {loading && <Loading />} */}
    </Paper>
  );
};

