import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DropzoneDialog } from "material-ui-dropzone";
import { getCategories } from "./../../services/categoryServices";
import { saveContent } from "./../../services/categoryServices";
import DeleteIcon from "@material-ui/icons/Delete";
import css from "../../Admin.module.scss";

//const allCategories = [{ name: "Preventive" }, { name: "Hygiene" }];

const useStyles = makeStyles(() => ({
  text: {
    width: "300px",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "white",
    width: "100px",
    height: "50px",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#A2EA2E",
    },
  },
}));

export default function AwarenessAddContent() {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    getCategories().then((items) => {
      setCategory(items);
    });
  }, []);

  // const handleSave = () => {
  //   //setFiles(file);
  //   console.log(files);
  //   setOpen(false);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleFileHandler = (event) => {
  //   if (event.target.files[0]) {
  //     setSelectedFile(event.target.files[0]);
  //     setIsFilePicked(true);
  //   }
  //   console.log(selectedFile);
  // };

  // const handleDelete = () => {
  //   setSelectedFile(null);
  //   setIsFilePicked(false);
  // };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);
    formData.append("File", selectedFile);
    formData.append("File", selectedFile);
    formData.append("File", selectedFile);
    formData.append("File", selectedFile);
    saveContent(formData);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={10} md={8} className={css.container}>
        <h2 className="center">Content</h2>

        <Autocomplete
          id="category-combo-box"
          options={category}
          getOptionLabel={(option) => option.category}
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
          value=""
          // onChange={(e) => {
          //   setTitle(e.target.value);
          // }}
        />
        <TextField
          className={classes.text}
          id="standard-basic-subtitle"
          label="Subtitle"
          value=""
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleOpen}
          className={classes.button}
        >
          Upload
        </Button>

        <DropzoneDialog
          open={open}
          onSave={(file) => {
            setFiles(file);
            console.log(files);
            setOpen(false);
          }}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/gif"]}
          showPreviews={true}
          filesLimit={1}
          maxFileSize={5000000}
          onClose={handleClose}
        />

        {/* <div style={{ marginTop: "30px" }}>
          <input
            type="file"
            name="file"
            accept=".jpg"
            style={{ color: "transparent" }}
            onChange={handleFileHandler}
          />

          {isFilePicked ? (
            <span>
              Filename: {selectedFile.name}
              <DeleteIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={handleDelete}
              />
            </span>
          ) : null}
        </div> */}

        <TextareaAutosize
          style={{ width: "600px", marginTop: "40px" }}
          aria-label="description"
          rowsMin={5}
          placeholder="Description"
        />
        <TextareaAutosize
          style={{ width: "600px", marginTop: "40px" }}
          aria-label="content"
          rowsMin={5}
          placeholder="Detailed content"
        />
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            className={classes.button}
            onClick={handleSubmit}
            disableElevation
          >
            SAVE
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
