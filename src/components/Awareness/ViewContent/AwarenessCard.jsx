import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  S: { backgroundColor: "red", justify: "center" },
  P: { backgroundColor: "orange", justify: "center" },
  G: { backgroundColor: "green", justify: "center" },
  actionArea: {
    padding: "35px 35px",
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  card: {
    inWidth: 256,
    borderRadius: 16,
    boxShadow: "none",
    "&:hover": {
      boxShadow: `0 6px 12px 0 
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  },
  header: {
    "&:hover": {
      boxShadow: `0 6px 12px 0 
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  },
  // media: {
  //   height: "200px",
  //   border: "2px solid white",
  //   padding: "5px",
  //   display: "block",
  //   maxWidth: "100%",
  //   maxHeight: "100%",
  // },

  media: () => ({
    width: "100%",
    height: 0,
    paddingBottom: "75%",
    // backgroundColor: bgColor,
  }),
  // expand: {
  //   transform: "rotate(0deg)",
  //   marginLeft: "auto",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: "rotate(180deg)",
  // },
}));

function AwarenessCard(props) {
  const { title, subtitle, description, avatarType, imageUrl } = props;
  const classes = useStyles();

  // const [expanded, setExpanded] = React.useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const avatarStyle =
    avatarType === "P" ? classes.P : avatarType === "G" ? classes.G : classes.S;

  return (
    <Card variant="outlined" className={classes.card}>
      <CardActionArea className={classes.actionArea}>
        <CardHeader
          className={classes.header}
          avatar={<Avatar className={avatarStyle}>{avatarType}</Avatar>}
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
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
      </CardActionArea>
    </Card>
  );
}

export default AwarenessCard;
