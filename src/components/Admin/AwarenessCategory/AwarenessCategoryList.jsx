import React from "react";
import { useState, useEffect, useRef } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { getCategory } from "./../services/categoryServices";

const columns = [
  { field: "id", hide: true },
  {
    field: "category",
    headerClassName: "super-app-theme--header",
    headerName: <strong>Category</strong>,
    flex: 0.5,
  },
  { field: "description", headerName: <strong>Description</strong>, flex: 1 },
  {
    field: "actions",
    headerName: <strong>Actions</strong>,
    flex: 0.25,
    renderCell: () => (
      <div>
        <EditIcon style={{ cursor: "pointer", color: "green" }} />
        <DeleteIcon style={{ cursor: "pointer", color: "red" }} />
      </div>
    ),
  },
];

export default function AwarenessCategoryList(successMessage) {
  const [category, setCategory] = useState([]);
  let rows = [];
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (category.length && !successMessage) {
      return;
    }
    try {
      getCategory().then((items) => {
        if (mounted.current) {
          setCategory(items);
        }
      });
      return () => (mounted.current = false);
    } catch (error) {
      console.log("error" + error);
    }
  }, [successMessage, category]);

  if (category !== null && category.length > 0)
    rows = category.map((item) => (rows[item] = item));

  return (
    <Grid item xs={10} md={8} style={{ height: "60%", display: "flex" }}>
      <DataGrid rows={rows} columns={columns} autoPageSize />
    </Grid>
  );
}
