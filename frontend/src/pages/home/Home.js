import React from 'react'
import './Home.css'
//import GridRDO from '../../components/grid/GridRDO'
import DynamicGrid from '../../components/grid/DynamicGrid';

const Home = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 28, department: 'Engineering', street:'Street D' },
    { id: 2, name: 'Jane Smith', age: 34, department: 'Marketing' , street:'Street D' },
    { id: 3, name: 'Sam Green', age: 40, department: 'HR' , street:'Street D' },
    { id: 4, name: 'Emma White', age: 22, department: 'Sales' , street:'Street D' },
    { id: 5, name: 'Bob Black', age: 30, department: 'Finance' , street:'Street D' },
    { id: 6, name: 'Anna Brown', age: 35, department: 'Engineering' , street:'Street D' },
    { id: 7, name: 'Tom Gray', age: 32, department: 'Marketing', street:'Street D'  }
];
const columns = ['name', 'age', 'department','street'];

  return (
    <div id='home'>
        <h1>Home</h1>
        <DynamicGrid data={data} columns={columns} />
    </div>
  )
}

export default Home

