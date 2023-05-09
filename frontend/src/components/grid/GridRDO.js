import React, { useState, useEffect } from 'react';
import '../../../node_modules/@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

//hooks
import './GridRDO.css'
import {useSelector,useDispatch} from 'react-redux'
//slice
import { gridData } from '../../slice/gridSlices';

import {
  PagingState,
  SortingState,
  CustomPaging,
  FilteringState
} from '@devexpress/dx-react-grid';

import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';



// import { Loading } from '../../../theme-sources/bootstrap4/components/loading';
// import { CurrencyTypeProvider } from '../../../theme-sources/bootstrap4/components/currency-type-provider';

const GridRDO = () => {
  
  const dispatch = useDispatch()
  const {rows:rowData,totalCount:totalCountBase,loading:loadingBase} = useSelector((state) => state.grid)
  
  const [columns] = useState([
    { name: 'Id', title: 'Id #' },
    { name: 'Nome', title: 'Nome' }
  ]);

  const [rows, setRows] = useState([]);

  const [currencyColumns] = useState(['SaleAmount']);
  const [tableColumnExtensions] = useState([
    { columnName: 'Id', align: 'right' },
    { columnName: 'Nome', align: 'right' },
  ]);
  const [sorting, setSorting] = useState([{ columnName: 'StoreCity', direction: 'asc' }]);
  const [filter, setFilter] = useState([{ columnName: 'StoreCity', direction: 'asc' }]);

  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();

  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCountBase / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);

    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };

  const loadData = () => {
    console.log(sorting);
    const filter = {idTipoCadastro:6,page:currentPage,sizePage: pageSize};
    dispatch(gridData(filter));

  };

  useEffect(() =>{
    loadData();
  }, [currentPage,pageSize,sorting]);

if(loadingBase){
  return <p>Carregando.....</p>  
}

  return (
   
      <div className="card" style={{ position: 'relative' }}>
      <Grid rows={rowData} columns={columns}>
        {/* <CurrencyTypeProvider for={currencyColumns} /> */}
        <FilteringState filters={filter} onFiltersChange={setFilter} />
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <PagingState currentPage={currentPage} onCurrentPageChange={setCurrentPage} pageSize={pageSize} onPageSizeChange={changePageSize} />
        <CustomPaging totalCount={totalCountBase} />
        <Table columnExtensions={tableColumnExtensions}/>
        <TableHeaderRow showSortingControls />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
      {/* {loading && <Loading />} */}
    </div>

  );
};

export default GridRDO;