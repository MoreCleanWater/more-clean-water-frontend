import Modal from "@material-ui/core/Modal";
import ContentCard from "./ContentCard";
import CardMedia from "@material-ui/core/CardMedia";
import cardStyle from 'styles/Cards.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid, IconButton } from "@material-ui/core";

export default function ContentModal(props) {
  const { open, postedArticle, handleModalClose } = props;
  
  //   const handleModalClose = () => {
  //     open = false;
  //   };

  // const body = (
  //   <div className={cardStyle.paper}>
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

  const mediaAreaRef = (el) => {
    if (!el) return;
    console.log(el.getBoundingClientRect().width); 
  }

  return (
    <Modal
      open={open}
      onClose={() => handleModalClose(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropProps={{invisible: true}}
    >
      <Grid container className={cardStyle.containerModal}>
        <IconButton 
          className={cardStyle.backButton}
          onClick={() => handleModalClose(false)}
        >
          <ArrowBackIcon/>
        </IconButton>
        
        <Grid container direction='column' xs={12} md={7} className={cardStyle.contentModal}>
          <div className={cardStyle.mediaArea} ref={el => mediaAreaRef(el)}>
            {postedArticle.image ? (
              <CardMedia
                className={cardStyle.media}
                image={postedArticle.image}
                title={postedArticle.title}
              />
            ) : null}
            
            {postedArticle.video ? (
              <CardMedia
                className={cardStyle.media}
                component="iframe"
                title={postedArticle.title}
                src={postedArticle.video}
                // style={{height: `${mediaArea.offsetWidth/3} px`}}
              />
            ) : null}
          </div>
          

            {postedArticle.body ? (
              <div className={cardStyle.text}
                dangerouslySetInnerHTML={{
                  __html: postedArticle.body,
                }}
              ></div>
            ) : null}
        </Grid>
      </Grid>
      {/* <ContentCard
        article={postedArticle}
        // uniquekey={key}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
      /> */}
    </Modal>
  );
}
