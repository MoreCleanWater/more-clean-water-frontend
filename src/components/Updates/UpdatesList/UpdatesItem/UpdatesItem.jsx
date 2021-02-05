import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import './UpdatesItem.css';
import cardStyle from 'styles/Cards.module.scss';

function UpdatesItem({id, title, description, markAsRead}) {

  const handleClick = e => {
    markAsRead(id)
  };

  return (

    <Card className={cardStyle.updateRoot}>
      <CardContent className={cardStyle.updateContent}>
        <Typography className={cardStyle.updateTitle} gutterBottom>
        {title + ' alert'}
        </Typography>
        <Typography className={cardStyle.updateDescription}>
        {description}
        </Typography>
      </CardContent>

      <CardActions onClick={handleClick} style={{position:'relative'}}>
        <Button size="small" className={cardStyle.dismissButton}>Dismiss</Button>
      </CardActions>
    </Card>
    
    // <li className="update-item" onClick={handleClick}>
    //     <h2 className="update__title">
    //         {title}
    //     </h2>

    //     <p className="update__description">
    //         {description}
    //     </p>
    // </li>
  )
}

export default UpdatesItem;
