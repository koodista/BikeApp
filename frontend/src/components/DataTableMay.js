import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const DataTableMay = () => {
  const [bikeJourneysMay, setBikeJourneysMay] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(30);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);

  //useEffect(() => {
  const fetchData = async (page, limit) => {
    setLoading(true);
    const response = await axios.get(
      `/api/bikejourneys/may?page=${page}&limit=${limit}&delay=1`
    );
    setBikeJourneysMay(response.data.data); //.map(bj => ({ ...bj, id: bj._id }))
    setTotalPages(response.data.pages);
    setTotalRows(response.data.total);
    setCount(response.data.count);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handlePerRowsChange = async (limit, page) => {
    setLoading(true);

    const response = await axios.get(
      `/api/bikejourneys/may?page=${page}&limit=${limit}&delay=1`
    );

    setBikeJourneysMay(response.data.data);
    setPageSize(limit);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (column, sortDirection) => {
    // Get the array of data to be sorted
    const data = bikeJourneysMay;

    // Sort the data by the column and sort direction
    data.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return b[column] > a[column] ? 1 : -1;
      }
    });

    // Update the array of sorted data
    setBikeJourneysMay(data);
  };

  //The following is an example of the filtering function:

  // const handleFilter = (column, filterValue) => {
  //    // Get the array of data to be filtered
  //    const data = [...bikeJourneysMay];

  //    // Filter the data by the column and filter value
  //    const filteredData = data.filter(row => {
  //      return row[column].includes(filterValue);
  //    });

  const columns = [
    //{ name: "ID", selector: (row) => row._id },
    {
      name: "Departure Time",
      selector: (row) => row.departure,
      sortable: true,
      sortField: "departure",
    },
    {
      name: "Return Time",
      selector: (row) => row.return,
      sortable: true,
      sortField: "return",
    },
    {
      name: "Departure Station Id",
      selector: (row) => row.departureStationId,
      sortable: true,
      sortField: "departureStationId",
    },
    {
      name: "Departure Station",
      selector: (row) => row.departureStationName,
      sortable: true,
      sortField: "departureStationName",
    },
    {
      name: "Return Station Id",
      selector: (row) => row.returnStationId,
      sortable: true,
      sortField: "returnStationId",
    },
    {
      name: "Return Station",
      selector: (row) => row.returnStationName,
      sortable: true,
      sortField: "returnStationName",
    },
    {
      name: "Distance(km)",
      selector: (row) => (row.distance / 1000).toFixed(3),
      sortable: true,
      sortField: "distance",
    },
    {
      name: "Duration(min)",
      selector: (row) => (row.duration / 60).toFixed(2),
      sortable: true,
      sortField: "duration",
    },
  ];

  return (
    <div style={{ height: "100px" }}>
      <DataTable
        title="Bikejourneys May 2021"
        columns={columns}
        data={bikeJourneysMay}
        progressPending={loading}
        pagination
        paginationServer
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationTotalRows={totalPages}
        paginationRowsPerPageOptions={[30]}
        paginationPerPage={pageSize}
        // paginationComponentOptions={{
        //   rowsPerPageText: "Rows per page:",
        //   rangeSeparatorText: " rows of total rows",
        // }}
        fixedHeader
        fixedHeaderScrollHeight="500px" //auto
        responsive="true"
        theme="dark"
        onSort={handleSort}
        //onFilter={handleFilter}
        //page={page - 1}
        //pages={totalPages}
        //perPage={100}
        //filterable
        sortable
        noDataComponent="No bike journeys found"
      />
    </div>
  );
};

export default DataTableMay;
