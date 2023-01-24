import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import FilterComponent from "./utils/FilterComponent";

const DataTableJune = () => {
  const [bikeJourneysJune, setBikeJourneysJune] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState();
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(30);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(true);

  const fetchData = async (page, limit) => {
    setLoading(true);
    const response = await axios.get(
      `/api/bikejourneysjune?page=${page}&limit=${limit}&delay=1`
    );
    setBikeJourneysJune(response.data.data);
    setTotalPages(response.data.pages);
    setTotalRows(response.data.total);
    setCount(response.data.count);
    setLoading(false);
  };

  const handlePerRowsChange = async (limit, page) => {
    setPages(page);
    setLoading(true);

    const response = await axios.get(
      `/api/bikejourneysjune?page=${page}&limit=${limit}&delay=1`
    );

    setBikeJourneysJune(response.data.data);
    setPageSize(limit);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    handlePerRowsChange(pageSize, page);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (column, sortDirection) => {
    const data = bikeJourneysJune;
    data.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return b[column] > a[column] ? 1 : -1;
      }
    });

    setBikeJourneysJune(data);
  };

  const columns = [
    //{ name: "ID", selector: (row) => row._id },
    {
      name: "Departure Time",
      selector: (row) => row.departure,
      sortable: true,
      sortField: "departure",
      filterable: true,
    },
    {
      name: "Return Time",
      selector: (row) => row.return,
      sortable: true,
      sortField: "return",
      filterable: true,
    },
    {
      name: "Departure Station Id",
      selector: (row) => row.departureStationId,
      sortable: true,
      sortField: "departureStationId",
      filterable: true,
    },
    {
      name: "Departure Station",
      selector: (row) => row.departureStationName,
      sortable: true,
      sortField: "departureStationName",
      filterable: true,
    },
    {
      name: "Return Station Id",
      selector: (row) => row.returnStationId,
      sortable: true,
      sortField: "returnStationId",
      filterable: true,
    },
    {
      name: "Return Station",
      selector: (row) => row.returnStationName,
      sortable: true,
      sortField: "returnStationName",
      filterable: true,
    },
    {
      name: "Distance(km)",
      selector: (row) => (row.distance / 1000).toFixed(3),
      sortable: true,
      sortField: "distance",
      filterable: true,
    },
    {
      name: "Duration(min)",
      selector: (row) => (row.duration / 60).toFixed(2),
      sortable: true,
      sortField: "duration",
      filterable: true,
    },
  ];
  // const handleFilter = () => {
  //   const filteredItems = bikeJourneysJune.filter(
  //     (item) =>
  //       JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
  //       -1
  //   );
  //   setFilteredItems(filteredItems);
  // };
  // const handlePageChange = (page) => {
  //   handlePerRowsChange(pageSize, page);
  // };
  // const subHeaderComponent = useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText("");
  //     }
  //   };
  //   return (
  //     <FilterComponent
  //       onFilter={(e) => {
  //         setFilterText(e.target.value);
  //         handleFilter();
  //       }}
  //       onClear={handleClear}
  //       filterText={filterText}
  //     />
  //   );
  // }, [filterText, resetPaginationToggle]);

  const filteredItems = bikeJourneysJune.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div style={{ height: "100px" }}>
      <DataTable
        title="CITY BIKE JOURNEYS JUNE"
        columns={columns}
        data={filteredItems}
        progressPending={loading}
        pagination
        paginationServer
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationTotalRows={totalPages}
        paginationRowsPerPageOptions={[10, 30, 50, 100, 500, 5000, 19648]}
        paginationPerPage={pageSize}
        // paginationComponentOptions={{
        //   rowsPerPageText: "Rows per page:",
        //   rangeSeparatorText: " rows of total rows",
        // }}
        fixedHeader
        fixedHeaderScrollHeight="500px" //auto
        responsive="true"
        theme="default" //dark
        onSort={handleSort}
        defaultSortField="departure"
        striped
        //onFilter={handleFilter}
        //page={page - 1}
        //pages={totalPages}
        //perPage={100}
        filterable
        subHeader
        subHeaderComponent={subHeaderComponent}
        sortable
        noDataComponent="No bike journeys found"
      />
    </div>
  );
};

export default DataTableJune;
