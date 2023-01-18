import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";

function DataGridForBikeJourneys() {
  //   const [data, setData] = useState([]);
  //   const [rowCountState, setRowCountState] = useState(rowCount);

  //   const getBikejourneyData = async () => {
  //     await axios.get("/api/bikejourneys/may").then((res) => {
  //       setData(res.data.data);
  //     });
  //   };

  //   useEffect(() => {
  //     getBikejourneyData();
  //   }, []);
  const [bikeJourneysMay, setBikeJourneysMay] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(30);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState();
  const [rowCountState, setRowCountState] = useState(totalPages);
  const [currentPage, setCurrentPage] = useState();

  const fetchData = async (page, limit) => {
    setLoading(true);
    const response = await axios.get(
      `/api/bikejourneysmay?page=${page}&limit=${limit}&delay=1`
    );
    setBikeJourneysMay(response.data.data);
    setTotalPages(response.data.pages);
    setTotalRows(response.data.total);
    setCount(response.data.count);
    setLoading(false);
  };

  const handlePerRowsChange = async (limit, page) => {
    setPages(page);
    setLoading(true);

    const response = await axios.get(
      `/api/bikejourneysmay?page=${page}&limit=${limit}&delay=1`
    );

    setBikeJourneysMay(response.data.data);
    setPageSize(limit);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    handlePerRowsChange(pageSize, page);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalPages !== undefined ? totalPages : prevRowCountState
    );
  }, [totalPages, setRowCountState]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "departure",
      headerName: "Departure",
      type: "date",
      width: 150,
      editable: true,
    },
    {
      field: "return",
      headerName: "Return",
      type: "date",
      width: 150,
      editable: true,
    },
    {
      field: "departureStationId",
      headerName: "DepartureStationId",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "departureStationName",
      headerName: "DepartureStationName",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "returnStationId",
      headerName: "ReturnStationId",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "returnStationName",
      headerName: "ReturnStationName",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "distance",
      headerName: "Distance",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  // const rows = bikeJourneysMay.map((row) => ({
  //   id: row.id,
  //   departure: row.departure,
  //   return: row.return,
  //   departureStationId: row.departureStationId,
  //   departureStationName: row.departureStationName,
  //   returnStationId: row.returnStationId,
  //   returnStationName: row.returnStationName,
  //   distance: (row.distance / 1000).toFixed(3),
  //   duration: (row.duration / 60).toFixed(2),
  // }));

  // console.log(rows);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={bikeJourneysMay}
            getRowId={(rows) => rows._id}
            paginationMode="server"
            pagination
            rowCount={rowCountState}
            rowsPerPageOptions={[30, 50, 100]}
            //page={page}
            pageSize={pageSize}
            onPageSizeChange={handlePerRowsChange}
            onPageChange={handlePageChange}

            //keepNonExistentRowsSelected
          />
        </div>
      </div>
    </div>
  );
}

export default DataGridForBikeJourneys;
