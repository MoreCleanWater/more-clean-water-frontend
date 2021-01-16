import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
  //   header: {
  //     "& .super-app-theme--header": {
  //       backgroundColor: "#BEF8FB",
  //       font: "bold",
  //     },
  //     height: "40%",
  //     font: "bold",
  //   },
}));

export default function AwarenessCategory() {
  const classes = useStyles();
  const [disableButton, setDisableButton] = useState(true);
  const [openMessage, setOpenMessage] = useState(false);

  const handleChangeEvent = (event) => {
    event.target.value !== null
      ? setDisableButton(false)
      : setDisableButton(true);
  };

  const saveCategory = () => {
    setOpenMessage(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
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
      flex: 0.25,
      renderCell: () => (
        <div>
          <EditIcon style={{ cursor: "pointer", color: "green" }} />
          <DeleteIcon style={{ cursor: "pointer", color: "red" }} />
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      category: "Preventive",
      description: "Strategies to preventive spread of disease",
    },
    { id: 2, category: "Safety", description: "Safety warnings" },
    { id: 3, category: "General", description: "" },
    { id: 4, category: "Hygiene", description: "" },
    {
      id: 5,
      category: "Equality",
      description: "All are entitled to get water",
    },
    { id: 6, category: "Women and children", description: "" },
  ];

  return (
    <div>
      <Grid
        container
        style={{ height: "100vh", width: "100vw" }}
        //</div>direction="column"
        alignContent="center"
        justify="space-around"
        spacing={5}
      >
        <Grid item xs={10} md={8}>
          <TextField
            required
            id="standard-basic-category"
            label="Category"
            className={classes.text}
            onChange={handleChangeEvent}
          />
          <TextField
            id="standard-basic-desc"
            label="Description"
            className={classes.text}
          />

          <Button
            variant="contained"
            disabled={disableButton}
            size="large"
            className={classes.button}
            onClick={saveCategory}
          >
            SAVE
          </Button>
          <Snackbar
            open={openMessage}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Category created!
            </Alert>
          </Snackbar>
        </Grid>
        <Grid item xs={10} md={8} style={{ height: "60%", display: "flex" }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </Grid>
      </Grid>
    </div>
  );
}
