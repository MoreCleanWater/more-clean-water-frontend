import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DropzoneDialog } from "material-ui-dropzone";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { database } from "../../../../database/firebase";
import { storage } from "../../../../database/firebase";
import adminStyle from "styles/Admin.module.scss";
import formStyle from "styles/Form.module.scss";
import { Backdrop, CircularProgress } from "@material-ui/core";
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
      <Grid container justify="center" className={formStyle.container}>
        <Grid item xs={10} md={8} className={formStyle.content}>
          <form className={formStyle.adminForm} >
            <div className={`${formStyle.title} ${formStyle.admin}`}>
              <h2>
                Awareness / Add Content
              </h2>
              <Grid container className={formStyle.adminContent} justify="space-between" spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    // className={classes.text}
                    className = {`${formStyle.formInput}`}
                    variant='outlined'
                    id="standard-basic-title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    className = {`${formStyle.formInput}`}
                    id="category-combo-box"
                    options={category}
                    // value={selectedCategory}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => {
                      setSelectedCategory(value);
                    }}
                    // className={classes.text}
                    renderInput={(params) => (
                      <TextField required {...params} variant='outlined' label="Category" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    // className={classes.text}
                    className = {`${formStyle.formInput}`}
                    variant='outlined'
                    id="standard-basic-videourl"
                    label="Video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    className = {`${formStyle.formInput}`}
                    style={{height:'3.5rem'}}
                    variant="outlined"
                    size="small"
                    color="primary"
                    disableElevation
                    onClick={handleOpen}
                  >
                    Select image
                  </Button>
                  {selectedFile ? selectedFile.name : ""}
                </Grid>
              </Grid>
            </div>


            <div className={adminStyle.textEditor}>
              
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
                
                <ReactQuill
                  onChange={handleEditorChange}
                  value={body}
                  modules={modules}
                  formats={formats}
                  placeholder={"Add content here....."}
                />
                
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSubmit}
                  color="primary"
                  disableElevation
                  style={{marginTop: '5rem'}}
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
              
            </div>
          </form>

        </Grid>
      </Grid>


    </div>
  );
}
