import React, { useState, useEffect } from "react";
import ReactDataGrid from "react-data-grid";
import "./Grid.css";

const PAGE_SIZE = 5;

const columns = [
  { key: "id", name: "ID" },
  { key: "name", name: "Name" },
  { key: "email", name: "Email" },
  { key: "age", name: "Age" },
];

const data = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", age: 30 },
  { id: 2, name: "Jane Doe", email: "jane.doe@example.com", age: 25 },
  { id: 3, name: "Bob Smith", email: "bob.smith@example.com", age: 40 },
  { id: 4, name: "Alice Johnson", email: "alice.johnson@example.com", age: 35 },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", age: 45 },
  { id: 6, name: "David Jones", email: "david.jones@example.com", age: 50 },
  { id: 7, name: "Ella Davis", email: "ella.davis@example.com", age: 28 },
  { id: 8, name: "Franklin Lee", email: "franklin.lee@example.com", age: 32 },
  { id: 9, name: "Grace Miller", email: "grace.miller@example.com", age: 42 },
  { id: 10, name: "Henry Brown", email: "henry.brown@example.com", age: 55 },
];

const PagingGrid = () => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const pageRows = data.slice(startIndex, endIndex);
    setRows(pageRows);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <ReactDataGrid columns={columns} rows={rows} />
      <div>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={page === Math.ceil(data.length / PAGE_SIZE)}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PagingGrid