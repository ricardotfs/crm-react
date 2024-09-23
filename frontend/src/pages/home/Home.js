import React, { useState, useEffect }  from 'react'
import './Home.css'
//import GridRDO from '../../components/grid/GridRDO'
import DynamicGrid from '../../components/grid/DynamicGrid';
import { useSelector, useDispatch } from 'react-redux'
//slice
import { gridData } from '../../slice/gridSlices';

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { rows , totalCount, loading, columns } = useSelector((state) => state.grid)

  const updatePage = (newPage) =>{
      setPage(newPage) ;
  }  

  useEffect(() =>{
    const json = { idTipoCadastro: 6, page: page, sizePage: 2, sorting: '', filter: '' };
    dispatch(gridData(json));
  },[])
  
  useEffect(() =>{
    const json = { idTipoCadastro: 6, page: (page > 0 ? (page -1) : page), sizePage:2 , sorting: '', filter: '' };
    dispatch(gridData(json));
  },[page])

  return (
    <div id='home'>
        <h1>Home</h1>
        <DynamicGrid data={rows} columns={columns} totalCount={totalCount} updatePage={updatePage}/>
    </div>
  )
}

export default Home

