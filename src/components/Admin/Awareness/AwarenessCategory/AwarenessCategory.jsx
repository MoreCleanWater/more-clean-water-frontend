import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { getCategories } from "./../../services/categoryServices";
import { saveCategory } from "./../../services/categoryServices";
import { deleteCategory } from "./../../services/categoryServices";

const useStyles = makeStyles(() => ({
  text: {
    width: "200px",
    paddingRight: "30px",
  },
  button: {
    backgroundColor: "white",
    width: "100px",
    height: "50px",
    "&:hover": {
      backgroundColor: "#A2EA2E",
    },
  },
}));

export default function AwarenessCategory() {
  const classes = useStyles();
  const [descText, setDescText] = useState("");
  const [catText, setCatText] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [category, setCategory] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);

  let rows = [];

  const handleSave = () => {
    saveCategory(catText, descText).then(() => {
      setAlertMessage("Category created successfully");
      setSuccessMessage(true);
      handleReset();
    });
  };

  const handleDelete = () => {
    deleteCategory(deletedRows[0].id).then(() => {
      setAlertMessage("Category deleted successfully");
      setSuccessMessage(true);
    });
  };

  const handleReset = () => {
    setCatText("");
    setDescText("");
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
  };

  const handleRowSelection = (e) => {
    console.log(e.data.id);
    // setDeletedRows([...deletedRows, ...rows.filter((r) => r.id === e.data.id)]);
    setDeletedRows(rows.filter((r) => r.id === e.data.id));
  };

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
      flex: 0.5,
      renderCell: () => (
        <div>
          {/* <EditIcon style={{ cursor: "pointer", color: "green" }} /> */}
          <DeleteIcon
            style={{ cursor: "pointer", color: "red" }}
            onClick={handleDelete}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCategories().then((items) => {
      setCategory(items);
    });
  }, [successMessage]);

  //console.log(category);
  if (typeof category !== "undefined" && category.length > 0)
    rows = category.map((item) => (rows[item] = item));

  return (
    <div>
      <Grid
        container
        style={{ height: "100vh", width: "100vw" }}
        alignContent="center"
        justify="space-around"
        spacing={5}
      >
        <Grid item xs={10} sm={8}>
          <TextField
            required
            id="standard-basic-category"
            label="Category name"
            value={catText}
            className={classes.text}
            onChange={(e) => {
              setCatText(e.target.value);
            }}
          />
          <TextField
            id="standard-basic-desc"
            label="Description"
            value={descText}
            className={classes.text}
            onChange={(e) => {
              setDescText(e.target.value);
            }}
          />

          <Button
            variant="contained"
            disabled={catText === ""}
            size="large"
            className={classes.button}
            onClick={handleSave}
          >
            SAVE
          </Button>
          <Snackbar
            open={successMessage}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              {alertMessage}
            </Alert>
          </Snackbar>
        </Grid>
        <Grid item xs={10} sm={8} style={{ height: "60%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize
            onRowSelected={handleRowSelection}
          />
        </Grid>
      </Grid>
    </div>
  );
}
