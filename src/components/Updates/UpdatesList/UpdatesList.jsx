import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from "react";
import UpdatesItem from './UpdatesItem/UpdatesItem';
import axios from 'axios';
import { LinearProgress } from '@material-ui/core';

function UpdatesList() {
  const userId = useState(localStorage.getItem('userId'));

  const [updates, setUpdates] = useState([]);
  const [status, setStatus] = useState('idle');
  const alerts = [
    {type: 'shortage', title: 'Water shortage', description: 'A Water shortage was detected in your area'},
    {type: 'dirty', title: 'Dirty water', description: 'Dirty water sources was detected in your area'}
  ]

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStatus('loading');
    axios
    .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/alert/' + userId)
    .then(response => {
        const loadedData = response.data.map((i, index) => ({
          ...i, 
          id: String(index), 
          title: alerts.find(a => a.type === i.alertType).title,
          description: alerts.find(a => a.type === i.alertType).description
          // county: i.countyId && county.data.find(c => i.countyId === c.countyId).county
      }));
      console.log(loadedData)
        setUpdates(loadedData)
        setStatus('idle');
    })
    .catch(error => {
        setStatus('error');
        console.log(error)
    })
}

  const markAsRead = id => {
    const newUpdates = [...updates];
    newUpdates.find(update => update.id === id).isReaded = true;
    setUpdates(newUpdates);
  }
  
  // if (!updates) return (<div></div>);
  const unreadUpdates = updates.filter(update => !update.isReaded);

  return (
    <div>
      <LinearProgress className={`linearProgress ${status==='loading' ? '' : 'hidden'}`}/>
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
          className="fullHeightMobile no-items" 
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
   

