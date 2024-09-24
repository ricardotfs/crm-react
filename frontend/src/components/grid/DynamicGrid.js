import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DynamicGrid.css';
import { useSelector, useDispatch } from 'react-redux'
//slice
import { gridData } from '../../slice/gridSlices';

const DynamicGrid = () => {

    const { rows , totalCount:total,loading, columns } = useSelector((state) => state.grid)
    const navigete = useNavigate();
    const dispatch = useDispatch();

    const [cols, setCols] = useState([]);
    const [totalCount, setTotalCount] = useState(total);
    const [filteredData, setFilteredData] = useState([]);

    const [filterText, setFilterText] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 2;

    useEffect(() =>{
        setCols(columns);
        setTotalCount(total);
        setFilteredData(rows);
      },[rows])

    useEffect(() =>{
        const json = { idTipoCadastro: 6, page: currentPage, sizePage: 2, sorting: '', filter: '' };
        dispatch(gridData(json));
      },[]);

      useEffect(() =>{
        const json = { idTipoCadastro: 6, page: (currentPage > 0 ? (currentPage -1) : currentPage), sizePage:2 , sorting: '', filter: '' };
        dispatch(gridData(json));
      },[currentPage]);

    useEffect(() => {
        setFilteredData(
            filteredData.filter(item =>
                cols.some(col =>
                    item[col].toString().toLowerCase().includes(filterText.toLowerCase())
                )
            )
        );
    }, [filterText]);

    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(row => row !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onDetails = (item) =>{

        return navigete(`/ticket/${item.Id}`)
    }
    const totalPages = Math.ceil(totalCount / rowsPerPage);
    const displayedData = filteredData;

    return (
        <div className="grid-container">
            <input
                type="text"
                placeholder="Filter..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="filter-input"
            />
            <div className='scroll'>
            <table className="dynamic-grid">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {cols.map((col, idx) => (
                            <th key={idx}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item, idx) => (
                        <tr key={idx}>
                            <td>
                                <input className='action-crm'
                                    type="checkbox"
                                    checked={selectedRows.includes(item.Id)}
                                    onChange={() => handleSelectRow(item.Id)}
                                    />
                            </td>
                            <td>
                                <button onClick={() => onDetails(item)} className="details-button">
                                    Details
                                </button>
                            </td>
                            {cols.map((col, idx) => (
                                <td key={idx}>{item[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        className={`page-button ${page === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DynamicGrid;