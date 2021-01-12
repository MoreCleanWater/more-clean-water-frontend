import React from "react";
import { useState } from "react";
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

const useStyles = makeStyles((theme) => ({
  S: { backgroundColor: "red", justify: "center" },
  P: { backgroundColor: "orange", justify: "center" },
  G: { backgroundColor: "green", justify: "center" },
  actionArea: {
    padding: "15px 15px 0px 15px",
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  card: {
    maxWidth: 345,
    borderRadius: 16,
    boxShadow: "none",
    backgroundColor: "#F9FCFF",
    position: "relative",
  },
  header: {
    padding: "8px",
  },

  media: () => ({
    width: "100%",
    height: "auto",
    paddingBottom: "75%",
  }),

  video: {
    height: "200px",
    width: "100%",
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function AwarenessCard(props) {
  const {
    title,
    subtitle,
    description,
    content,
    avatarType,
    imageUrl,
    videoUrl,
  } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const avatarStyle =
    avatarType === "P" ? classes.P : avatarType === "G" ? classes.G : classes.S;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <CardHeader
        avatar={<Avatar className={avatarStyle}>{avatarType}</Avatar>}
        action={
          <IconButton onClick={handleSettingsClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
      <Menu
        keepMounted
        id="settings-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Typography variant="caption" color="primary">
            Edit
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="caption" color="primary">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
      <CardActionArea className={classes.actionArea}>
        {imageUrl ? (
          <CardMedia className={classes.media} image={imageUrl} title={title} />
        ) : null}
        {videoUrl ? (
          <CardMedia
            className={classes.video}
            component="iframe"
            title={title}
            src={videoUrl}
          />
        ) : null}
        {description ? (
          <CardContent>
            <Typography
              //className="classes.description"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {description}
            </Typography>
          </CardContent>
        ) : null}
      </CardActionArea>
      <CardActions disableSpacing>
        {content ? (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        ) : null}
      </CardActions>
      {content ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              //className="classes.description"
              variant="body2"
              component="p"
            >
              {content}
            </Typography>
          </CardContent>
        </Collapse>
      ) : null}
    </Card>
  );
}

export default AwarenessCard;
