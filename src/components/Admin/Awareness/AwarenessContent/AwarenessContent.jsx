import formStyle from "styles/Form.module.scss";
import cardStyle from "styles/Cards.module.scss";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import UploadContent from "./UploadContent";
import { database } from "database/firebase";
import { storage } from "database/firebase";
import axios from "axios";
import ViewContent from "components/Awareness/ViewContent";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { LinearProgress } from "@material-ui/core";

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
    console.log("body " + data.body);
    console.log("video " + data.video);

    // upload new file
    const uploadImage = storage
      .ref(`/images/${selectedFile.name}`)
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

  const handleAlertClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
  };

  const handleReset = () => {
    setFormData([]);
  };

  const handleEdit = (k) => {
    console.log("key " + k);
    setMode("update");
    setKey(k);
    const useref = database.child(k);
    useref.on("value", (snapshot) => {
      setFormData(snapshot.val());
    });
  };

  const update = (data, selectedFile) => {
    console.log("inside update");
    setStatus("loading");

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
		<LinearProgress className={`linearProgress ${status==='loading' ? '' : 'hidden'}`}/>
		<Snackbar
			open={successMessage}
			autoHideDuration={4000}
			onClose={handleAlertClose}
		>
			<Alert onClose={handleAlertClose} severity="success">
			{alertMessage}
			</Alert>
		</Snackbar>
		<Grid container justify="center" className={formStyle.container}>
			<Grid item xs={10} md={8} className={`${formStyle.content} ${formStyle.awarenessContent}`}>
			<h2 className={`${formStyle.title} ${formStyle.admin}`}>
					Content
				</h2>
				
				<ViewContent
					style={{display: mode === 'retrieve' ? 'flex' : 'none'}} 
					postedArticle={postedArticle}
          setEditKey={handleEdit}
          isAdmin={true}
          className={cardStyle.admin}
				>
					<Button
						style={{
						display: mode === "retrieve" ? "flex" : "none",
						}}
						variant="contained"
						size="small"
						onClick={handleCreate}
						color="primary"
						disableElevation
					>
						Add
					</Button>
				</ViewContent>
				
				<UploadContent
					mode={mode}
					status={status}
					style={{ display: mode !== "retrieve" ? "flex" : "none" }}
					data={formData}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
				/>
			</Grid>
		</Grid>
    </div>
  );
}
