import Grid from '@material-ui/core/Grid';
import { useState } from "react";
import UpdatesItem from './UpdatesItem/UpdatesItem';

function UpdatesList() {
  const [updates, setUpdates] = useState([
    {
      id: "001",
      title: "Water shortage updates",
      description: "Description detailing water shortage", 
      isReaded: false
    },
    {
      id: "002",
      title: "Unsafe Area update",
      description: "Description detailing unsafe area", 
      isReaded: false
    },
    {
      id: "003",
      title: "New content update",
      description: "Description detailing the update", 
      isReaded: false
    }
  ]);

  const markAsRead = id => {
    const newUpdates = [...updates];
    newUpdates.find(update => update.id === id).isReaded = true;
    setUpdates(newUpdates);
  }
  
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
   

