import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { DropzoneDialog } from "material-ui-dropzone";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import formStyle from "../../../Form/Form.module.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel } from "@material-ui/core";

export default function UploadContent(props) {
  const { data, style, mode, status, onSubmit, onCancel } = props;
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
    setData({ ...formData, body: e });
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

  const handleChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    return onSubmit(formData, selectedFile);
  };

  const handleCancel = () => {
    setData([]);
    onCancel();
  };

  return (
    <form className={formStyle.adminForm} style={style}>
      <div>
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
            >
              <MenuItem value={null}>&nbsp;</MenuItem>
              {[...category].map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
        <Snackbar
          open={successMessage}
          autoHideDuration={4000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="success">
            {alertMessage}
          </Alert>
        </Snackbar>
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
