import React, { useState, useEffect } from "react";
import axios from "axios";

const BikejourneysMayTable = () => {
  const [data, setData] = useState([]); // Data from API
  const [pageSize, setPageSize] = useState(30); // Number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pages, setPages] = useState(1); // Total number of pages
  const [sortField, setSortField] = useState(""); // Current sorting field
  const [sortDir, setSortDir] = useState("asc"); // Current sorting direction
  const [filters, setFilters] = useState({}); // Current filters

  // Fetch data from API
  const fetchData = async () => {
    let endpoint = "http://localhost:5000/api/bikejourneys/may";
    endpoint += `?limit=${pageSize}&page=${currentPage}`;
    if (sortField) {
      endpoint += `&sort=${sortField}&dir=${sortDir}`;
    }
    Object.keys(filters).forEach((param) => {
      endpoint += `&${param}=${filters[param]}`;
    });

    // Fetch data
    const { data } = await axios.get(endpoint);
    setData(data.data);
    setPages(data.pages);
  };

  // Sort the data
  const sortData = (field) => {
    // Reverse direction if already sorted
    if (field === sortField) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    }

    setSortField(field);
  };

  // Filter the data
  const filterData = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  // Paginate the data
  const paginateData = (page) => {
    setCurrentPage(page);
  };

  // Fetch data when component is mounted
  useEffect(() => {
    fetchData();
  }, [pageSize, currentPage, sortField, sortDir, filters]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData("_id")}>_id</th>
            <th onClick={() => sortData("departure")}>departure</th>
            <th onClick={() => sortData("return")}>return</th>
            <th onClick={() => sortData("departureStationId")}>
              departureStationId
            </th>
            <th onClick={() => sortData("departureStationName")}>
              departureStationName
            </th>
            <th onClick={() => sortData("returnStationId")}>returnStationId</th>
            <th onClick={() => sortData("returnStationName")}>
              returnStationName
            </th>
            <th onClick={() => sortData("distance")}>distance</th>
            <th onClick={() => sortData("duration")}>duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              <td>{row.departure}</td>
              <td>{row.return}</td>
              <td>{row.departureStationId}</td>
              <td>{row.departureStationName}</td>
              <td>{row.returnStationId}</td>
              <td>{row.returnStationName}</td>
              <td>{row.distance}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button onClick={() => paginateData(1)} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => paginateData(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage}/{pages}
        </span>
        <button
          onClick={() => paginateData(currentPage + 1)}
          disabled={currentPage === pages}
        >
          Next
        </button>
        <button
          onClick={() => paginateData(pages)}
          disabled={currentPage === pages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default BikejourneysMayTable;

//import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useTable, usePagination } from "react-table";
// import axios from "axios";

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `;

// // Use the state and functions returned from useTable to build your UI
// function Table({ columns, data }) {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page, // Instead of using 'rows', we'll use page,
//     // which has only the rows for the active page

//     // The rest of these things are super handy, too ;)
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 2 },
//     },
//     usePagination
//   );
//   // Render the UI for your table
//   return (
//     <>
//       <pre>
//         <code>
//           {JSON.stringify(
//             {
//               pageIndex,
//               pageSize,
//               pageCount,
//               canNextPage,
//               canPreviousPage,
//             },
//             null,
//             2
//           )}
//         </code>
//       </pre>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>
//                   {column.render("Header")}
//                   <span>
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? " 🔽"
//                         : " 🔼"
//                       : ""}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//           <tr></tr>
//         </tbody>
//       </table>
//       {/*
//         Pagination can be built however you'd like.
//         This is just a very basic UI implementation:
//       */}
//       <div className="pagination">
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {"<<"}
//         </button>{" "}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {"<"}
//         </button>{" "}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {">"}
//         </button>{" "}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {">>"}
//         </button>{" "}
//         <span>
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {pageCount}
//           </strong>{" "}
//         </span>
//         <span>
//           | Go to page:{" "}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               gotoPage(page);
//             }}
//             style={{ width: "100px" }}
//           />
//         </span>{" "}
//         <select
//           value={pageSize}
//           onChange={(e) => {
//             setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// }

// function ReactTable() {
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Bike journeys May 2021",
//         columns: [
//           {
//             Header: "Departure Time",
//             accessor: "departure",
//           },
//           {
//             Header: "Return Time",
//             accessor: "return",
//           },
//         ],
//       },
//       {
//         Header: "Info",
//         columns: [
//           {
//             Header: "Departure Station Id",
//             accessor: "departureStationId",
//           },
//           {
//             Header: "Departure Station",
//             accessor: "departureStationName",
//           },
//           {
//             Header: "Return Station Id",
//             accessor: "returnStationId",
//           },
//           {
//             Header: "Return Station",
//             accessor: "returnStationName",
//           },
//           {
//             Header: "Distance(km)",
//             accessor: "distance",
//           },
//           {
//             Header: "Duration(min)",
//             accessor: "duration",
//           },
//         ],
//       },
//     ],
//     []
//   );

//   const [bikeJourneysMay, setBikeJourneysMay] = useState([]);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalRows, setTotalRows] = useState(0);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(0);
//   const [limit, setLimit] = useState(30);
//   const [pageSize, setPageSize] = useState(30);
//   const [totalPages, setTotalPages] = useState(1);
//   const [count, setCount] = useState(0);

//   const [pageCount, setPageCount] = React.useState(0);

//   const fetchData = React.useCallback(async (pageSize, pageIndex) => {
//     setLoading(true);
//     const response = await axios.get(
//       `/api/bikejourneys/may?page=${pageIndex}&limit=${pageSize}&delay=1`
//     );

//     setBikeJourneysMay(response.data.data); //.map(bj => ({ ...bj, id: bj._id }))
//     setData(response.data.data);
//     setTotalPages(response.data.pages);
//     setTotalRows(response.data.totalPages);
//     setCount(response.data.count);

//     setLoading(false);
//   }, []);
//   React.useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return (
//     <Styles>
//       <Table
//         columns={columns}
//         data={bikeJourneysMay}
//         fetchData={fetchData}
//         loading={loading}
//         pageCount={pageCount}
//       />
//     </Styles>
//   );
// }

// export default ReactTable;
