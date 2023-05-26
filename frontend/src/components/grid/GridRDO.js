import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FilteringState,
  EditingState,
} from '@devexpress/dx-react-grid';

import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap4';

// import { Loading } from '../../../theme-sources/bootstrap4/components/loading';
// import { CurrencyTypeProvider } from '../../../theme-sources/bootstrap4/components/currency-type-provider';

const GridRDO = () => {
  
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const {rows:rowData,totalCount:totalCountBase,loading:loadingBase} = useSelector((state) => state.grid)
  
  const [columns,setColumns] = useState([]);
  const [tableColumnExtensions] = useState();
  const [sorting, setSorting] = useState([{ columnName: 'Token', direction: 'asc' }]);
  const [filters, setFilters] = useState([]);

  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);

  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCountBase / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);

    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };

  const loadData = () => {

    let filter = filters.reduce((acc, { columnName, value }) => {
      acc.push(`and temp.${columnName} like '%${encodeURIComponent(value)}%'`);
      return acc;
    }, []).join(' ');
    
    if (filter.length > 1) {
      filter = `${filter}`;
    }
   
    const json = {idTipoCadastro:6,page:currentPage,sizePage: pageSize,sorting:sorting,filter:filter};
    dispatch(gridData(json));

  };

  useEffect(() =>{
    loadData();

    setTimeout(() =>{
      if(rowData.length > 0){
        setColumns(getDynamicColumns(rowData[0]))
      }
    },300)
      
  }, [currentPage,pageSize,sorting]);

  setTimeout(() => {
    if(rowData !== undefined && rowData.length > 0){
      setColumns(getDynamicColumns(rowData[0]))
    }
  }, 500);

  const getDynamicColumns = (obj) => {
    
    return Object.keys(obj).map(key =>  ( key === "Token" 
    ? { name: key , title: key,getCellValue: row => <a href={`/details/${row.Token}`}>{row.Token}</a> }
    :{ name: key , title: key }))
  }

  
if(loadingBase){
  return <p>Carregando.....</p>  
}

const handleSearchGrid = () =>{
  loadData();
  setFilters([]);
}
const commitChanges = () => {
  return navigete(`/login`);
};
  return (
   
    <div id='grid'>

      <div className='row'>
        <div className='col-md-2'>
          <button className='btn btn-primary' onClick={handleSearchGrid}>Atualizar</button>
        </div>
      </div>
      
      <div className="card" style={{ position: 'relative' }}>
          <Grid rows={rowData} columns={columns}>
            <FilteringState  onFiltersChange={setFilters} />   
            <EditingState
            onEditingRowIdsChange={commitChanges}/>
            <SortingState sorting={sorting} onSortingChange={setSorting} />
            <PagingState currentPage={currentPage} onCurrentPageChange={setCurrentPage} pageSize={pageSize} onPageSizeChange={changePageSize} />
            <CustomPaging totalCount={totalCountBase} />
            <Table columnExtensions={tableColumnExtensions} >
            </Table>
            <TableHeaderRow showSortingControls />
            <TableFilterRow  />
            <PagingPanel pageSizes={pageSizes} />
          </Grid>
          {/* {loading && <Loading />} */}
      </div>
    </div>

  );
};

export default GridRDO;