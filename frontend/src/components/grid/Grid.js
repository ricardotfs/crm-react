import React, { useState, useEffect } from 'react';
//css
import '../../../node_modules/ag-grid-community/styles/ag-grid.css';
import '../../../node_modules/ag-grid-community/styles/ag-theme-alpine.css';
//componentes
import { AgGridReact } from 'ag-grid-react';
//hooks
import {useSelector,useDispatch} from 'react-redux'
//slice
import { gridData } from '../../slice/gridSlices';

const Grid = () => {
  
  const dispatch = useDispatch()
  const [gridApi, setGridApi] = useState()
  const {rows,totalCount,loading} = useSelector((state) => state.grid)
  
  const getDynamicColumns = (obj) => {
    return Object.keys(obj).map(key => ({ field: key }))
  }
  
  const defColumnDefs = {
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1
  };
  const onGridReady = (params) => {
    setGridApi(params)
    params.api.setColumnDefs(getDynamicColumns(rows[0]))
  }

  const [currentPageSize,setCurrentPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSizes] = useState([5,10,15,50]);

  const loadData = () => {

    console.log(currentPageSize);
    const filter = {idTipoCadastro:6,page:currentPage,sizePage: currentPageSize};
    dispatch(gridData(filter));

  };

  useEffect(() => {
    loadData();
  },[currentPageSize,currentPage]);

if(loading){
  return <p>Carregando.....</p>  
}

  return (
     <div className="grid">
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          rowData={rows}
          defaultColDef={defColumnDefs}
          paginationPageSize={pageSizes}
          pagination={true}
          totalCount={totalCount}
          onGridReady={onGridReady} />
      </div>
    </div>
  );
};

export default Grid;