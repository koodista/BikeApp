import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import FilterComponent from "./utils/FilterComponent";

const DataTableStations = () => {
  const [bikeStations, setBikeStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState();
  const [page, setPage] = useState(0);
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
      `/api/bikestations?page=${page}&limit=${limit}&delay=1`
    );
    setBikeStations(response.data.data);
    setTotalPages(response.data.pages);
    setTotalRows(response.data.total);
    setCount(response.data.count);
    setLoading(false);
  };

  const handlePerRowsChange = async (limit, page) => {
    setPages(page);
    setLoading(true);

    const response = await axios.get(
      `/api/bikestations?page=${page}&limit=${limit}&delay=1`
    );

    setBikeStations(response.data.data);
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
    const data = bikeStations;
    data.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return b[column] > a[column] ? 1 : -1;
      }
    });

    setBikeStations(data);
  };

  const columns = [
    //{ name: "ID", selector: (row) => row._id },
    {
      name: "FID",
      selector: (row) => row.FID,
      sortable: true,
      sortField: "FID",
      filterable: true,
    },
    {
      name: "ID",
      selector: (row) => row.ID,
      sortable: true,
      sortField: "ID",
      filterable: true,
    },
    {
      name: "Bike Station Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
      filterable: true,
    },
    {
      name: "Bike Station Address",
      selector: (row) => row.address,
      sortable: true,
      sortField: "address",
      filterable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      sortField: "city",
      filterable: true,
    },
    {
      name: "Bike Capacity",
      selector: (row) => row.capacity,
      sortable: true,
      sortField: "capacity",
      filterable: true,
    },
    {
      name: "X-coordinates",
      selector: (row) => row.x.toFixed(6),
      sortable: true,
      sortField: "x",
      filterable: true,
    },
    {
      name: "Y-coodinates",
      selector: (row) => row.y.toFixed(6),
      sortable: true,
      sortField: "y",
      filterable: true,
    },
  ];
  // const handleFilter = () => {
  //   const filteredItems = bikeStations.filter(
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

  const filteredItems = bikeStations.filter(
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
        title="CITY BIKE STATIONS"
        columns={columns}
        data={filteredItems}
        progressPending={loading}
        pagination
        paginationServer
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationTotalRows={totalPages}
        paginationRowsPerPageOptions={[10, 30, 50, 100, 200, 457]}
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
        noDataComponent="No bike stations found"
      />
    </div>
  );
};

export default DataTableStations;
