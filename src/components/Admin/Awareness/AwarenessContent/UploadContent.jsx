import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Grid from "@material-ui/core/Grid";
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
import formStyle from "../../../Form/Form.module.scss";
import Validation from "../../../Form/Validation";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ComboBox from "../../../Form/ComboBox";
import { InputLabel, FormHelperText } from "@material-ui/core";

export default function UploadContent(props) {
  const {
    editArticle,
    editKey,
    data,
    style,
    mode,
    status,
    onSubmit,
    onCancel,
  } = props;
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [body, setBody] = useState();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [postedArticle, setPostedArticle] = useState({});
  const [text, setText] = useState();
  const [substring, setSubstring] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [formData, setData] = useState(data);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GET_CATEGORY_LIST_API)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setData(data);
  }, [data]);

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
    setData({ ...formData, body: e });
    // setBody(e);
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

  // const handleSubmit = () => {
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
  //   // database.push(article);
  //   // retrieveArticle();
  // };

  // const handleReset = () => {
  //   setSelectedCategory(null);
  //   setTitle("");
  //   setVideoUrl("");
  //   setSelectedFile(null);
  //   setBody("");
  // };
  // const retrieveArticle = () => {
  //   database.on("value", (snapshot) => {
  //     setPostedArticle(snapshot.val());
  //     console.log(snapshot.val());
  //   });
  // };

  const handleChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // setData({ ...formData, selectedFile: selectedFile });
    // setData({ ...formData, selectedCategory: selectedCategory });
    // setData({ ...formData, body: body });
    return onSubmit(formData, selectedFile);
  };

  const handleCancel = () => {
    setData([]);
    onCancel();
  };

  return (
    <form className={formStyle.adminForm} style={style}>
      <div>
        {/* <Grid container justify="center">
          <Grid item xs={10} md={8} className={css.container}> */}
        {/* <Autocomplete
          id="category-combo-box"
          options={category}
          // value={formData ? formData.selectedCategory : null}
          defaultValue={formData ? formData.selectedCategory : null}
          getOptionLabel={(option) => option.name}
          onInputChange={(e, value) => {
            console.log(value);
          }}
          // onChange={(e, value) => {
          //   setSelectedCategory(value);
          //   //  formData.selectedCategory = value;
          // }}
          className={classes.text}
          renderInput={(params) => (
            <TextField required {...params} label="Category" />
          )}
        /> */}

        {/* <Autocomplete
          id="category-combo-box"
          options={category}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Category" />}
          onChange={console.log("onchange")}
          defaultValue={editArticle.selectedCategory}
        /> */}
        <div>
          <FormControl
            variant="outlined"
            color="primary"
            style={{ width: "300px" }}
            // className={className}
            // error={error}
          >
            <InputLabel id="category-combobox">Category</InputLabel>
            <Select
              key="categoryId"
              id="categoryId"
              name="categoryId"
              label="category"
              labelId="category-label"
              value={formData ? formData.categoryId : ""}
              onChange={handleChange}
              //  formData.selectedCategory = value;

              // {...options}
              // onChange={(e, value) => {
              //   console.log("on change " + e.target.value);
              //   setSelectedCategory(value);
              //   handleChange();
              //   //  formData.selectedCategory = value;
              // }}
            >
              <MenuItem value={null}>&nbsp;</MenuItem>
              {[...category].map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>{helperText}</FormHelperText> */}
          </FormControl>
        </div>
        {/* <div>
          <FormControl style={{ minWidth: "300px" }}>
            <Select
            inputProps={{
              inputRef: (ref) => {
                if (!ref) return;
                register({
                  name: "trinityPerson",
                  value: ref.value,
                });
              },
            }}
              //value={formData ? formData.selectedCategory : null}
              onChange={(e, value) => {
                setSelectedCategory(value);
              }}
            >
              {category.map((cat) => (
                <MenuItem> {cat.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> */}
        <TextField
          required
          className={classes.text}
          id="standard-basic-title"
          label="Title"
          name="title"
          value={formData ? formData.title : ""}
          // defaultValue={editArticle ? editArticle.title : null}
          onChange={handleChange}
        />
        <TextField
          className={classes.text}
          id="standard-basic-videourl"
          label="Video"
          name="video"
          value={formData ? formData.video : ""}
          // defaultValue={editArticle ? editArticle.video : null}
          onChange={handleChange}
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
            : formData
            ? formData.imageTitle
            : null}
        </div>
        <DropzoneDialog
          open={open}
          onSave={(file) => {
            setSelectedFile(file[0]);
            setOpen(false);
          }}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/gif"]}
          showPreviews={true}
          filesLimit={1}
          maxFileSize={5000000}
          onClose={handleClose}
        />
        <div>
          <ReactQuill
            onChange={handleEditorChange}
            defaultValue={formData ? formData.body : null}
            modules={modules}
            formats={formats}
            placeholder={"Write content here...."}
          />
        </div>
        {/* <Button
              variant="contained"
              size="small"
              onClick={handleSubmit}
              className={classes.button}
            >
              SAVE
            </Button> */}
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
        {/* </Grid>
        </Grid> */}
      </div>
      <div className={`${formStyle.buttons} ${formStyle.admin}`}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
          disableElevation
          disabled={status === "loading" ? "disabled" : ""}
        >
          {mode === "create" && "Create"}
          {mode === "update" && "Update"}
        </Button>

        <Button
          variant="outlined"
          // className='primaryButton'
          size="small"
          style={{ marginLeft: 16 }}
          onClick={handleCancel}
          disableElevation
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
