import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DynamicGrid.css';

const DynamicGrid = ({ data, columns }) => {
    const navigete = useNavigate();
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        setFilteredData(
            data.filter(item =>
                columns.some(col =>
                    item[col].toString().toLowerCase().includes(filterText.toLowerCase())
                )
            )
        );
    }, [filterText, data, columns]);

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
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const displayedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
                        {columns.map((col, idx) => (
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
                                    checked={selectedRows.includes(item.id)}
                                    onChange={() => handleSelectRow(item.id)}
                                />
                            </td>
                            <td>
                                <button onClick={() => onDetails(item)} className="details-button">
                                    Details
                                </button>
                            </td>
                            {columns.map((col, idx) => (
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