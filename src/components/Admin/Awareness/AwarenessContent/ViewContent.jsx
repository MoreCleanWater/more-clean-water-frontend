import { Grid } from "@material-ui/core";
import { database } from "../../../../firebase";
import { useState, useEffect } from "react";
import _ from "lodash";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import ContentCard from "./ContentCard";
import UploadContent from "./UploadContent";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

export default function ViewContent(props) {
  const { setMode, postedArticle, setEditKey } = props;
  // const [postedArticle, setPostedArticle] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [open, setOpen] = useState(false);
  // const [editKey, setEditKey] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  // to fetch list of categories
  // // useEffect(() => {
  // //   axios
  // //     .get(process.env.REACT_APP_GET_CATEGORY_LIST_API)
  // //     .then((response) => setCategory(response.data))
  // //     .catch((error) => console.log(error));
  // // }, []);

  // // // to fetch list of articles
  // // useEffect(() => {
  // //   database.on("value", (snapshot) => {
  // //     // const obj = JSON.parse(JSON.stringify(snapshot.val()));
  // //     setPostedArticle(snapshot.val());
  // //     // _.map(obj, (items) => {
  // //     //   const result = items.selectedCategory;
  // //     //   setCategory(result);
  // //     //   console.log("category fromm fb" + items.selectedCategory);
  // //     // });

  // //     // _.map(obj, (item, key) => {
  //     //   console.log("key " + key);
  //     //   console.log("item " + item);
  //     //   _.map(item, (val) => console.log("val " + val));
  //     // });

  //     //  snapshot.val().map((item) => console.log("item " + item));
  //     // setPostedArticle(obj);
  //     // _.map(postedArticle, (article, key) => console.log("article " + article));
  //   });
  // }, []);

  const handleAlertClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
  };

  const handleDelete = (k) => {
    console.log("hello " + k);
    database.child(`${k}`).remove();
    setAlertMessage("Content deleted successfully");
    setSuccessMessage(true);
  };

  const handleEdit = (k) => {
    //  console.log("hello " + k);
    return setEditKey(k);
  };

  // const handleEdit = (k) => {
  //   console.log("hello " + k);
  //   setEditKey(k);
  //   // setMode("edit");
  //   const useref = database.child(k);
  //   useref.on("value", (snapshot) => {
  //     setEditArticle(snapshot.val());
  //   });
  // };

  const getContentCard = (article, key) => {
    return (
      // <Grid item xs={12} md={6} key={key}>
      <ContentCard
        article={article}
        uniquekey={key}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      // </Grid>
    );
  };

  return (
    <div>
      {/* <Grid container direction="column">
        <Grid item container> */}
      <div>
        <Autocomplete
          id="category-combo-box"
          style={{ float: "right", width: "200px" }}
          options={category}
          // value={selectedCategory}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => {
            setSelectedCategory(value);
          }}
          renderInput={(params) => (
            <TextField required {...params} label="Category" />
          )}
        />
        {/* <Grid container spacing={2}> */}
        {postedArticle
          ? _.map(postedArticle, (article, key) => getContentCard(article, key))
          : null}
        {/* </Grid> */}
      </div>
      <Snackbar
        open={successMessage}
        autoHideDuration={4000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      {/* {/* </Grid>
      </Grid> */}
    </div>
  );
}
