import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import AwarenessCategoryList from "./AwarenessCategoryList";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { setCategory } from "./../services/categoryServices";

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
  const [successMessage, setSuccessMessage] = useState(false);
  const [descText, setDescText] = useState("");
  const [catText, setCatText] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setCategory(catText, descText).then(() => {
      setSuccessMessage(true);
      handleReset();
    });
  };

  const handleReset = () => {
    setCatText("");
    setDescText("");
    // setDisableButton(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
  };

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
              Category created!
            </Alert>
          </Snackbar>
        </Grid>
        <AwarenessCategoryList successMessage={successMessage} />
      </Grid>
    </div>
  );
}
