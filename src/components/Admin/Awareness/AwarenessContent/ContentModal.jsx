import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import ContentCard from "./ContentCard";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    height: "70%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "30px",
    overflow: "scroll",
    display: "block",
  },
}));

export default function ContentModal(props) {
  const { open, postedArticle, handleModalClose } = props;
  const classes = useStyles();
  //   const handleModalClose = () => {
  //     open = false;
  //   };

  // const body = (
  //   <div className={classes.paper}>
  //     <h2 id="simple-modal-title">{postedArticle.title}</h2>
  //     <div
  //       dangerouslySetInnerHTML={{
  //         __html: postedArticle.body,
  //       }}
  //     ></div>
  //     <div float="left">
  //       <img src={postedArticle.image} width="100" height="100"></img>
  //       {postedArticle.video ? (
  //         <video width="100" height="100" controls>
  //           <source src={postedArticle.video} type="video/mp4" />
  //         </video>
  //       ) : null}
  //     </div>
  //   </div>
  // );

  const body = (
    <div className={classes.paper}>
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

      {postedArticle.body ? (
        <div
          dangerouslySetInnerHTML={{
            __html: postedArticle.body.substr(0, 340),
          }}
        ></div>
      ) : null}
   </div>
  )

  return (
    <Modal
      open={open}
      onClose={() => handleModalClose(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
      {/* <ContentCard
        article={postedArticle}
        // uniquekey={key}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
      /> */}
    </Modal>
  );
}
