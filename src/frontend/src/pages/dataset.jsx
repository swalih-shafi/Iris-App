import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Papa from "papaparse";
import "../styles/Dataset.css";
import { useTable, useSortBy } from "react-table";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import FilterModal from "../components/FilterModal"; // assuming this path

function Dataset() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speciesFilter, setSpeciesFilter] = useState([
    "Iris Setosa",
    "Iris Versicolor",
    "Iris Virginica",
  ]);

  useEffect(() => {
    fetch("/iris2.csv")
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true });
        const rows = parsed.data
          .filter((row) => Object.values(row).some((val) => val))
          .map((row) => ({
            ...row,
            Species: row.Species?.toLowerCase().includes("setosa")
              ? "Iris Setosa"
              : row.Species?.toLowerCase().includes("versicolor")
              ? "Iris Versicolor"
              : row.Species?.toLowerCase().includes("virginica")
              ? "Iris Virginica"
              : row.Species,
          }));

        const cols = Object.keys(rows[0]).map((key) => ({
          Header: key,
          accessor: key,
        }));
        setData(rows);
        setFilteredData(rows);
        setColumns(cols);
      });
  }, []);

  const applyFilter = (selectedSpecies) => {
    setSpeciesFilter(selectedSpecies);
    const filtered = data.filter((row) =>
      selectedSpecies.includes(row["Species"])
    );
    setFilteredData(filtered);
  };

  const downloadCSV = (rows) => {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "iris_dataset.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = (rows) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "iris_dataset.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tableInstance = useTable({ columns, data: filteredData }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <Header />
      <div className="dataset-container">
        <h2>Iris Dataset</h2>
        <div className="dataset-controls">
          <button onClick={() => setIsModalOpen(true)}>Filter Dataset</button>
          <div className="download-buttons">
            <button onClick={() => downloadCSV(filteredData)}>
              Download CSV
            </button>
            <button onClick={() => downloadJSON(filteredData)}>
              Download JSON
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table {...getTableProps()} className="iris-table">
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, j) => (
                    <th
                      key={j}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="sortable-header"
                    >
                      {column.render("Header")}
                      <span className="sort-icon">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <AiOutlineArrowDown />
                          ) : (
                            <AiOutlineArrowUp />
                          )
                        ) : (
                          <span className="invisible-placeholder"></span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, j) => (
                      <td key={j} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <FilterModal
          selectedSpecies={speciesFilter}
          onClose={() => setIsModalOpen(false)}
          onApply={applyFilter}
        />
      )}
    </>
  );
}

export default Dataset;
