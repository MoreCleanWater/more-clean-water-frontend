import React from "react";
import { useState, useEffect } from "react";
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

// const rows = [
//   {
//     id: 1,
//     category: "Preventive",
//     description: "Strategies to preventive spread of disease",
//   },
//   { id: 2, category: "Safety", description: "Safety warnings" },
//   { id: 3, category: "General", description: "" },
//   { id: 4, category: "Hygiene", description: "" },
//   {
//     id: 5,
//     category: "Equality",
//     description: "All are entitled to get water",
//   },
//   { id: 6, category: "Women and children", description: "" },
// ];

// rows.push({ id: "7", category: "7asdad", description: "klkjl" });

export default function AwarenessCategoryList() {
  const [category, setCategory] = useState([]);
  let rows = [];

  useEffect(() => {
    let mounted = true;
    getCategory().then((items) => {
      if (mounted) {
        setCategory(items);
      }
    });
    return () => (mounted = false);
  }, []);

  console.log(category);
  rows = category.map((item) => (rows[item] = item));

  return (
    <Grid item xs={10} md={8} style={{ height: "60%", display: "flex" }}>
      <DataGrid rows={rows} columns={columns} autoPageSize />
    </Grid>
  );
}
