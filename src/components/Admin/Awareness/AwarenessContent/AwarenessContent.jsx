import formStyle from "../../../Form/Form.module.scss";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import UploadContent from "./UploadContent";
import { database } from "../../../../firebase";
import { storage } from "../../../../firebase";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import ViewContent from "./ViewContent";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function AwarenessContent() {
  const [mode, setMode] = useState("retrieve");
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState([]);
  const [category, setCategory] = useState([]);
  const [postedArticle, setPostedArticle] = useState([]);

  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const [key, setKey] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStatus("loading");
    console.log("before load data");
    // to fetch list of contents
    database.on("value", (snapshot) => {
      // const obj = JSON.parse(JSON.stringify(snapshot.val()));
      setPostedArticle(snapshot.val());
    });

    // to fetch list of categories
    axios
      .get(process.env.REACT_APP_GET_CATEGORY_LIST_API)
      .then((response) => {
        setCategory(response.data);
        // setData(postedArticle);
        setMode("retrieve");
        setStatus("success");
      })
      .catch((error) => console.log(error));
    console.log("after load data");
  };

  // // to fetch list of categories
  // useEffect(() => {
  //   axios
  //     .get(process.env.REACT_APP_GET_CATEGORY_LIST_API)
  //     .then((response) => setCategory(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  const handleCreate = (e) => {
    console.log("returned value " + e);
    setMode("create");
  };

  const handleSubmit = (data, selectedFile) => {
    if (mode === "create") create(data, selectedFile);
    if (mode === "update") update(data, selectedFile);
  };

  const handleCancel = () => {
    setMode("retrieve");
    formData.title = "";
    setFormData([]);
  };

  const create = (data, selectedFile) => {
    console.log("inside create");
    setStatus("loading");

    console.log("selectedFile " + selectedFile);
    console.log("title " + data.title);
    console.log("selectedCategory " + data.categoryId);
    // console.log("selectedCategory " + selectedCategory.name);

    console.log("body " + data.body);
    console.log("video " + data.video);

    // upload new file
    const uploadImage = storage
      .ref(`/images/${selectedFile.name}`)
      // .ref(`/images/${editArticle ? editArticle.title : title}`)
      .put(selectedFile);
    uploadImage.on(
      (error) => {
        console.log(error);
        setStatus("error");
      },
      () => {
        storage
          .ref("images")
          .child(selectedFile.name)
          .getDownloadURL()
          .then((url) => {
            console.log("before push");

            database.push({
              categoryId: data.categoryId,
              //  categoryName: selectedCategory.name,
              // selectedCategory: selectedCategory,
              title: data.title ? data.title : "",
              body: data.body ? data.body : "",
              image: url,
              imageTitle: selectedFile.name,
              video: data.video ? data.video : "",
            });
            console.log("after push");

            setAlertMessage("Content uploaded successfully");
            setSuccessMessage(true);
            handleReset();
            loadData();
          });
      }
    );
  };
  //   //remove old image
  //   console.log("editArticle " + editArticle);
  //   if (editArticle) {
  //     //|| (editArticle && selectedFile.name !== editArticle.selectedFile.name)) {
  //     storage
  //       .refFromURL(editArticle.image)
  //       // .ref(`/images/${editArticle.title}`)
  //       .delete()
  //       .then(() => console.log("file deleted successfully"));
  //   }
  //   //upload new file
  //   const uploadImage = storage
  //     .ref(`/images/${selectedFile.name}`)
  //     // .ref(`/images/${editArticle ? editArticle.title : title}`)
  //     .put(selectedFile);
  //   uploadImage.on(
  //     (error) => {
  //       console.log(error);
  //       setStatus("error");
  //     },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(selectedFile.name)
  //         .getDownloadURL()
  //         .then((url) => {
  //           saveArticle(url);
  //         });
  //     }
  //   );
  // };

  // const saveArticle = (url) => {
  //   //update existing
  //   if (editArticle) {
  //     console.log(editArticle);
  //     database.child(`${editKey}`).set({
  //       categoryId: selectedCategory
  //         ? selectedCategory.id
  //         : editArticle.selectedCategory.id,
  //       categoryName: selectedCategory
  //         ? selectedCategory.name
  //         : editArticle.selectedCategory.name,
  //       selectedCategory: selectedCategory
  //         ? selectedCategory
  //         : editArticle.selectedCategory,
  //       title: title ? title : editArticle.title,
  //       body: body ? body : editArticle.body,
  //       image: url,
  //       imageTitle: selectedFile.name,
  //       video: videoUrl ? videoUrl : editArticle.video,
  //     });
  //   }
  //   //create new
  //   else {
  //     database.push({
  //       categoryId: selectedCategory.id,
  //       categoryName: selectedCategory.name,
  //       selectedCategory: selectedCategory,
  //       title: title,
  //       body: body,
  //       image: url,
  //       imageTitle: selectedFile.name,
  //       video: videoUrl,
  //     });
  //   }
  //   setAlertMessage("Content uploaded successfully");
  //   setSuccessMessage(true);
  //   handleReset();

  const handleAlertClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
  };

  const handleReset = () => {
    setFormData([]);
    // setSelectedCategory(null);
    // setTitle("");
    // setVideoUrl("");
    // setSelectedFile(null);
    // setBody("");
  };

  const handleEdit = (k) => {
    console.log("key " + k);
    setMode("update");
    setKey(k);
    const useref = database.child(k);
    useref.on("value", (snapshot) => {
      setFormData(snapshot.val());
      console.log("selectedFile " + formData.selectedFile);
      console.log("title " + formData.title);
      console.log("selectedCategory " + formData.selectedCategory);
      // console.log("selectedCategory id" + formData.selectedCategory.id);
      console.log("body " + formData.body);
      console.log("video " + formData.video);
    });
  };

  const update = (data, selectedFile) => {
    console.log("inside update");

    setStatus("loading");

    console.log("selectedFile " + selectedFile);
    console.log("title " + data.title);
    console.log("selectedCategory " + data.categoryId);
    // console.log("selectedCategory " + selectedCategory.name);

    console.log("body " + data.body);
    console.log("video " + data.video);

    console.log("key in update " + key);

    if (data) {
      //remove old image if a new image is selected
      if (selectedFile) {
        storage
          .refFromURL(data.image)
          // .ref(`/images/${editArticle.title}`)
          .delete()
          .then(() => {
            console.log("file deleted successfully");

            //upload new file
            const uploadImage = storage
              .ref(`/images/${selectedFile.name}`)
              // .ref(`/images/${editArticle ? editArticle.title : title}`)
              .put(selectedFile);
            uploadImage.on(
              (error) => {
                console.log(error);
                setStatus("error");
              },
              () => {
                storage
                  .ref("images")
                  .child(selectedFile.name)
                  .getDownloadURL()
                  .then((url) => {
                    updateArticle(data, selectedFile, url);
                  });
              }
            );
          });
      } else {
        updateArticle(data, null, null);
      }
    }
  };

  const updateArticle = (data, selectedFile, url) => {
    console.log("key in update");
    database.child(`${key}`).set({
      categoryId: data.categoryId,
      //  categoryName: selectedCategory.name,
      // selectedCategory: selectedCategory,
      title: data.title,
      body: data.body,
      image: url ? url : data.image,
      imageTitle: selectedFile ? selectedFile.name : data.imageTitle,
      video: data.video,
    });

    setAlertMessage("Content uploaded successfully");
    setSuccessMessage(true);
    handleReset();
    loadData();
  };

  return (
    <div>
      <Grid container justify="center" className={formStyle.container}>
        <Grid item xs={10} md={7} className={formStyle.content}>
          <h2 className={formStyle.admin}>Content</h2>
          <Button
            style={{
              float: "right",
              display: mode === "retrieve" ? "flex" : "none",
            }}
            variant="contained"
            size="small"
            onClick={handleCreate}
            color="primary"
            disableElevation
            // disabled={status === "loading" ? "disabled" : ""}
          >
            Add
          </Button>
          <div
            style={{
              display: mode === "retrieve" ? "flex" : "none",
              width: "100%",
            }}
          >
            <ViewContent
              postedArticle={postedArticle}
              setEditKey={handleEdit}
            />
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
          <UploadContent
            mode={mode}
            status={status}
            style={{ display: mode !== "retrieve" ? "flex" : "none" }}
            data={formData}
            // editArticle={null}
            // editKey={null}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Grid>
      </Grid>
    </div>
  );
}
