import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from "react";
import UpdatesItem from './UpdatesItem/UpdatesItem';

function UpdatesList() {
  const [updates, setUpdates] = useState();

  useEffect(() => {
    fetch('updates.json')
    .then(res => res.json())
    .then((data) => {
      setUpdates(Array.from(data))
    })
  }, []);

  const markAsRead = id => {
    const newUpdates = [...updates];
    newUpdates.find(update => update.id === id).isReaded = true;
    setUpdates(newUpdates);
  }
  
  if (!updates) return (<div></div>);
  const unreadUpdates = updates.filter(update => !update.isReaded);

  return (
    <div>
      <ul className="updates-list">
          {unreadUpdates.map(update => 
            <UpdatesItem 
                key={update.id}
                id={update.id}
                title={update.title}
                description={update.description}
                markAsRead={markAsRead}
            />
          )}
      </ul>
      
      <div className="total">
        {unreadUpdates.length > 0 ? `Total updates: ${unreadUpdates.length}` : 
        <Grid 
          className="full-height-mobile no-items" 
          container 
          justify="center" 
          alignItems="center"> 
            Hooray! No updates!
        </Grid>}
      </div>
    </div>
  )
}

export default UpdatesList;
   

