import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import adminStyle from "styles/Admin.module.scss";
import formStyle from "styles/Form.module.scss";
import { Backdrop, CircularProgress } from "@material-ui/core";
import axios from "axios";

export default function AwarenessCategory() {
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
            style={{ cursor: "pointer", color: "#78787c" }}
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


  if (category.length===0) 
        return (
            <Backdrop className='circularProgress' open={category.length===0}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )

  return (
    <div>
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
        
      <Grid container  justify="center" className={formStyle.container}>
        <Grid item xs={10} md={8} className={formStyle.content}>
          <form className={formStyle.adminForm} >
            <div className={`${formStyle.title} ${formStyle.admin}`}>
              <h2>
                  Awareness / Categories
              </h2>
              <Grid container className={formStyle.adminContent} justify="space-between" spacing={3}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    id="standard-basic-category"
                    label="Category name"
                    value={catText}
                    onChange={e => setCatText(e.target.value)}
                    variant='outlined'
                    className = {`${formStyle.formInput}`}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    id="standard-basic-desc"
                    label="Description"
                    value={descText}
                    onChange={e => setDescText(e.target.value)}
                    variant='outlined'
                    className = {`${formStyle.formInput}`}
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      disableElevation
                      disabled={catText === ""}
                      className = {`${formStyle.formInput}`}
                      onClick={handleSave}
                    >
                      SAVE
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>

          <div className={adminStyle.dataGrid}>
            <div className={adminStyle.content}>
              <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize
                onRowSelected={handleRowSelection}
                disableColumnSelector
                disableSelectionOnClick
                // disableDensitySelector
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
