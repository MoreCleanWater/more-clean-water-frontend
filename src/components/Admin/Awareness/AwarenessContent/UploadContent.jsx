import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Grid } from "@material-ui/core";
import css from "../../Admin.module.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DropzoneDialog } from "material-ui-dropzone";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { database } from "../../../../firebase";
import { storage } from "../../../../firebase";
import _ from "lodash";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function UploadContent(props) {
  const { editArticle, editKey } = props;
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [postedArticle, setPostedArticle] = useState({});
  const [text, setText] = useState();
  const [substring, setSubstring] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GET_CATEGORY_LIST_API)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  const useStyles = makeStyles(() => ({
    text: {
      width: "500px",
      margin: "10px",
    },
    button: {
      backgroundColor: "white",
      width: "50px",
      margin: "10px",
      "&:hover": {
        backgroundColor: "#A2EA2E",
      },
    },
  }));
  const classes = useStyles();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
  ];

  const handleEditorChange = (e) => {
    // console.log("content " + content);
    // console.log("delta " + delta);
    // console.log("source " + source);
    // console.log("editor " + editor);

    setBody(e);
    //  setHtml(editor.getHTML());
    //  setText(editor.getText());
    //  setSubstring(editor.getHTML().substr(0,120));
    //  console.log("html " + editor.getHTML());
    // var temp = str.substr(0, 40);
    // if (temp.lastIndexOf("<") > temp.lastIndexOf(">")) {
    //   temp = editor.getHTML().substr(
    //     0,
    //     1 + editor.getHTML().indexOf(">", temp.lastIndexOf("<"))
    //   );
    // }
    // console.log("temp " + temp);
    // setText(temp);

    // console.log("text " + renderHTML(editor.getText().substr(1,10)));
    // console.log("length " + editor.getLength());

    // setBody(e);
    // console.log(body);
  };

  const handleAlertClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    //remove old image
    console.log("editArticle " + editArticle);
    if (editArticle) {
      //|| (editArticle && selectedFile.name !== editArticle.selectedFile.name)) {
      storage
        .refFromURL(editArticle.image)
        // .ref(`/images/${editArticle.title}`)
        .delete()
        .then(() => console.log("file deleted successfully"));
    }
    //upload new file
    const uploadImage = storage
      .ref(`/images/${selectedFile.name}`)
      // .ref(`/images/${editArticle ? editArticle.title : title}`)
      .put(selectedFile);
    uploadImage.on(
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(selectedFile.name)
          .getDownloadURL()
          .then((url) => {
            saveArticle(url);
          });
      }
    );
  };

  const saveArticle = (url) => {
    //update existing
    if (editArticle) {
      console.log(editArticle);
      database.child(`${editKey}`).set({
        categoryId: selectedCategory
          ? selectedCategory.id
          : editArticle.selectedCategory.id,
        categoryName: selectedCategory
          ? selectedCategory.name
          : editArticle.selectedCategory.name,
        selectedCategory: selectedCategory
          ? selectedCategory
          : editArticle.selectedCategory,
        title: title ? title : editArticle.title,
        body: body ? body : editArticle.body,
        image: url,
        imageTitle: selectedFile.name,
        video: videoUrl ? videoUrl : editArticle.video,
      });
    }
    //create new
    else {
      database.push({
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        selectedCategory: selectedCategory,
        title: title,
        body: body,
        image: url,
        imageTitle: selectedFile.name,
        video: videoUrl,
      });
    }

    setAlertMessage("Content uploaded successfully");
    setSuccessMessage(true);
    handleReset();
    // database.push(article);
    // retrieveArticle();
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setTitle("");
    setVideoUrl("");
    setSelectedFile(null);
    setBody("");
  };
  // const retrieveArticle = () => {
  //   database.on("value", (snapshot) => {
  //     setPostedArticle(snapshot.val());
  //     console.log(snapshot.val());
  //   });
  // };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={10} md={8} className={css.container}>
          <h2 className="center">Content</h2>
          <Autocomplete
            id="category-combo-box"
            options={category}
            defaultValue={editArticle ? editArticle.selectedCategory : ""}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => {
              setSelectedCategory(value);
            }}
            className={classes.text}
            renderInput={(params) => (
              <TextField required {...params} label="Category" />
            )}
          />
          <TextField
            required
            className={classes.text}
            id="standard-basic-title"
            label="Title"
            defaultValue={editArticle ? editArticle.title : null}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className={classes.text}
            id="standard-basic-videourl"
            label="Video"
            defaultValue={editArticle ? editArticle.video : null}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <div>
            <Button
              variant="contained"
              size="small"
              onClick={handleOpen}
              className={classes.button}
            >
              Image
            </Button>
            {selectedFile
              ? selectedFile.name
              : editArticle
              ? editArticle.imageTitle
              : null}
          </div>
          <DropzoneDialog
            open={open}
            onSave={(file) => {
              setSelectedFile(file[0]);
              setOpen(false);
            }}
            acceptedFiles={[
              "image/jpeg",
              "image/png",
              "image/bmp",
              "image/gif",
            ]}
            showPreviews={true}
            filesLimit={1}
            maxFileSize={5000000}
            onClose={handleClose}
          />
          <div>
            <ReactQuill
              onChange={handleEditorChange}
              defaultValue={editArticle ? editArticle.body : ""}
              modules={modules}
              formats={formats}
              placeholder={"Write content here...."}
            />
          </div>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            className={classes.button}
          >
            SAVE
          </Button>
          <Snackbar
            open={successMessage}
            autoHideDuration={4000}
            onClose={handleAlertClose}
          >
            <Alert onClose={handleAlertClose} severity="success">
              {alertMessage}
            </Alert>
          </Snackbar>
          {/* {postedArticle
            ? _.map(postedArticle, (item, key) => {
                return (
                  <div key={key}>
                    <h2>{item.title}</h2>
                    <p>{renderHTML(item.body)}</p>
                    <p>{item.text}</p>
                    <div dangerouslySetInnerHTML={{__html:item.substring}}></div>
                    <img src={item.image} width="500" height="600"></img>
                    <div>
                      <video width="320" height="240" controls>
                        <source src={item.video} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                );
              })
            : null} */}
        </Grid>
      </Grid>
    </div>
  );
}
