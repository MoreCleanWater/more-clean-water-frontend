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
// import _ from "lodash";
// import renderHTML from "react-render-html";

export default function UploadContent() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [postedArticle, setPostedArticle] = useState({});

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GET_CATEGORY_LIST_API)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  const useStyles = makeStyles(() => ({
    text: {
      width: "300px",
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
    setBody(e);
    console.log(body);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    const uploadImage = storage.ref(`/images/${title}`).put(selectedFile);
    uploadImage.on(
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(title)
          .getDownloadURL()
          .then((url) => {
            saveArticle(url);
          });
      }
    );
  };

  const saveArticle = (url) => {
    var dataRef = database.child(`${title}`);
    dataRef.set({
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      title: title,
      body: body,
      image: url,
      video: videoUrl,
    });
    // database.push(article);
    // retrieveArticle();
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
          <h2 className="center">Article</h2>
          <Autocomplete
            id="category-combo-box"
            options={category}
            // value={selectedCategory}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className={classes.text}
            id="standard-basic-videourl"
            label="Video"
            value={videoUrl}
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
            {selectedFile ? selectedFile.name : ""}
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
              value={body}
              modules={modules}
              formats={formats}
              placeholder={"Add content here....."}
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
          {/* {postedArticle
            ? _.map(postedArticle, (item, key) => {
                return (
                  <div key={key}>
                    <h2>{item.title}</h2>
                    <p>{renderHTML(item.body)}</p>
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
