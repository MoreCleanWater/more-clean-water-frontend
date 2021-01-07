import Grid from '@material-ui/core/Grid';
import UpdatesList from './UpdatesList/UpdatesList';
import './Updates.css';

function Updates() {
  return (
    <Grid 
      container
      justify="center"
      className="updates full-height"
    >
      <Grid item xs={10}>
        <UpdatesList />
      </Grid>
    </Grid>
  )
}

export default Updates;