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
import axios from "axios";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [category, setCategory] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);

  let rows = [];

  const handleSave = () => {
    axios
      .post(process.env.REACT_APP_POST_CATEGORY_API, {
        name: catText,
        description: descText,
      })
      .then(() => {
        setAlertMessage("Section is created successfully");
        setSuccessMessage(true);
        handleReset();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setErrorAlert(true);
        console.log(error + " error");
      });
  };

  const handleDelete = () => {
    axios
      .delete(process.env.REACT_APP_DELETE_CATEGORY_API + deletedRows[0].id)
      .then(() => {
        setAlertMessage("Section is deleted successfully");
        setSuccessMessage(true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setErrorAlert(true);
        console.log(error + " error");
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

  const handleErrorClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorAlert(false);
  };

  const handleRowSelection = (e) => {
    console.log(e.data.id);
    setDeletedRows(rows.filter((r) => r.id === e.data.id));
  };

  const columns = [
    { field: "id", hide: true },
    {
      field: "name",
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
    axios
      .get(process.env.REACT_APP_GET_CATEGORY_LIST_API)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, [successMessage]);

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
          <Snackbar
            open={errorAlert}
            autoHideDuration={4000}
            onClose={handleErrorClose}
          >
            <Alert onClose={handleErrorClose} severity="error">
              {errorMessage}
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
