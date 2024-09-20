import React, { useState, useEffect }  from 'react'
import './Home.css'
//import GridRDO from '../../components/grid/GridRDO'
import DynamicGrid from '../../components/grid/DynamicGrid';
import { useSelector, useDispatch } from 'react-redux'
//slice
import { gridData } from '../../slice/gridSlices';

const Home = () => {
  const dispatch = useDispatch();
  
  const { rows , totalCount, loading, columns } = useSelector((state) => state.grid)

  useEffect(() =>{
    const json = { idTipoCadastro: 6, page: 0, sizePage: 10, sorting: '', filter: '' };
    dispatch(gridData(json));
  },[])

  return (
    <div id='home'>
        <h1>Home</h1>
        <DynamicGrid data={rows} columns={columns} />
    </div>
  )
}

export default Home

