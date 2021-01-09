import AwarenessCard from "./AwarenessCard";
import { Grid } from "@material-ui/core";
import awarenessList from './DataDump.js'

function AwarenessContent() {
  const getAwarenessCard = (awareness) => {
    return (
      <Grid item xs={12} sm={4}>
        <AwarenessCard {...awareness} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {awarenessList.map((awareness) => getAwarenessCard(awareness))}
    </Grid>
  );
}

export default AwarenessContent;
