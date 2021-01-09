import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  S: { backgroundColor: "red", justify: "center" },
  P: { backgroundColor: "orange", justify: "center" },
  G: { backgroundColor: "green", justify: "center" },
  media: {
    height: "200px",
    border: "2px solid white",
    padding: "5px",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
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
  const { title, subtitle, description, avatarType, imageUrl } = props;
  const classes = useStyles();

  // const [expanded, setExpanded] = React.useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar className={classes.P}>{avatarType}</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
      <CardMedia className={classes.media} image={imageUrl} title={title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
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
      </CardActions> */}
    </Card>
  );
}

export default AwarenessCard;
