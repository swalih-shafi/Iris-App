import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/Dataset.css";
import "../styles/history.css";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useTable, useSortBy } from "react-table";
import { jwtDecode } from "jwt-decode";

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [stats, setStats] = useState({ total: 0, lastTime: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const username = jwtDecode(token).username;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const reversed = [...data].reverse();
        const formatted = reversed.map((entry, index) => ({
          ...entry,
          serial: data.length - index,
          prediction: `Iris ${entry.prediction
            .charAt(0)
            .toUpperCase()}${entry.prediction.slice(1)}`,
          timestamp: new Date(entry.timestamp).toLocaleDateString("en-GB", {
            timeZone: "Asia/Dubai",
          }),
        }));
        setHistoryData(formatted);

        if (data.length) {
          const lastTimestamp = data[data.length - 1].timestamp;
          const localTime = new Date(lastTimestamp).toLocaleString("en-GB", {
            timeZone: "Asia/Dubai",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          const localDate = new Date(lastTimestamp).toLocaleDateString(
            "en-GB",
            {
              timeZone: "Asia/Dubai",
            }
          );

          setStats({
            total: data.length,
            lastTime: `${localDate}`,
          });
        }
      });
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "S.No", accessor: "serial" },
      { Header: "Sepal Length", accessor: "input.sepal_length" },
      { Header: "Sepal Width", accessor: "input.sepal_width" },
      { Header: "Petal Length", accessor: "input.petal_length" },
      { Header: "Petal Width", accessor: "input.petal_width" },
      { Header: "Prediction", accessor: "prediction" },
      { Header: "Date", accessor: "timestamp" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: historyData }, useSortBy);

  return (
    <>
      <Header />
      <div className="dataset-container">
        <h2>User Prediction History</h2>

        <div className="history-controls">
          <div className="history-data">
            <strong>Total Requests:</strong> {stats.total} <br />{" "}
          </div>
          <div className="history-data">
            <strong>Last Prediction:</strong> {stats.lastTime || "N/A"}
          </div>
        </div>

        <div className="table-wrapper">
          {historyData.length === 0 ? (
            <div className="empty-history">
              <p>
                You haven’t made any predictions yet. Once you try out the
                model, your results will appear here.
                <br />
                <a href="/predict" className="predict-link">
                  Click here to identify an iris species
                </a>{" "}
                🌸
              </p>
            </div>
          ) : (
            <table {...getTableProps()} className="iris-table">
              <thead>
                {headerGroups.map((group) => (
                  <tr {...group.getHeaderGroupProps()}>
                    {group.headers.map((col) => (
                      <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                        {col.render("Header")}
                        <span className="sort-icon">
                          {col.isSorted ? (
                            col.isSortedDesc ? (
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
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default History;
