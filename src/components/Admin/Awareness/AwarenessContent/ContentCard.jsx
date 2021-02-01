import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons//MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import renderHTML from "react-render-html";
import { Grid } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import UploadContent from "./UploadContent";
import ContentModal from "./ContentModal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  // S: { backgroundColor: "red", justify: "center" },
  // P: { backgroundColor: "orange", justify: "center" },
  // G: { backgroundColor: "green", justify: "center" },
  actionArea: {
    padding: "5px",
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  card: {
    //maxWidth: 345,
    width: "80%",
    height: "100%",
    borderRadius: 16,
    boxShadow: "none",
    // backgroundColor: "#F9FCFF",
    position: "relative",
  },
  header: {
    padding: "8px",
    backgroundColor: "#B5E2FF",
  },

  media: () => ({
    width: "50%",
    // justify: "center",
    // height: "50",
    paddingBottom: "30%",
    float: "left",
    margin: "5px",
  }),

  video: {
    height: "50%",
    width: "70%",
    float: "left",
    margin: "5px",
  },

  // paper: {
  //   position: "absolute",
  //   width: 400,
  //   backgroundColor: theme.palette.background.paper,
  //   border: "2px solid #000",
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing(2, 4, 3),
  //   margin: "100px",
  // },
}));

export default function ContentCard(props) {
  const { article, uniquekey, handleEdit, handleDelete } = props;
  const [postedArticle, setPostedArticle] = useState({});
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setPostedArticle(article);
  }, []);

  // const avatarStyle =
  //   avatarType === "P" ? classes.P : avatarType === "G" ? classes.G : classes.S;

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = (status) => {
    setOpen(status);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
    handleClose();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <div>
      <Card variant="outlined" className={classes.card}>
        <CardHeader
          className={classes.header}
          // avatar={<Avatar className={avatarStyle}>{avatarType}</Avatar>}
          action={
            <IconButton onClick={handleSettingsClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={postedArticle.title}
        />
        <Menu
          keepMounted
          id="settings-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            handleClose()
            handleEdit(uniquekey)}}>
            <Typography variant="caption" color="primary">
              Edit
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleDeleteOpen}>
            <Typography variant="caption" color="primary">
              Delete
            </Typography>
          </MenuItem>
        </Menu>
        <CardActionArea className={classes.actionArea}>
          {postedArticle.image ? (
            <CardMedia
              className={classes.media}
              image={postedArticle.image}
              title={postedArticle.title}
            />
          ) : null}

          {postedArticle.video ? (
            <CardMedia
              className={classes.video}
              component="iframe"
              title={postedArticle.title}
              src={postedArticle.video}
            />
          ) : null}

          <CardContent>
            {postedArticle.body ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: postedArticle.body.substr(0, 340),
                }}
              ></div>
            ) : null}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link
            component="button"
            variant="body2"
            style={{ marginLeft: "auto" }}
            onClick={handleModalOpen}
          >
            Read More...
          </Link>
        </CardActions>

        <ContentModal
          open={open}
          postedArticle={postedArticle}
          handleModalClose={handleModalClose}
        />

        <Dialog
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(uniquekey)}
              color="primary"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal> */}
      </Card>
    </div>
  );
}
