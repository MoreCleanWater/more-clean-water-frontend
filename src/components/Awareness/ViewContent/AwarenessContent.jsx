import AwarenessCard from "./AwarenessCard";
import Grid from "@material-ui/core/Grid";
import awarenessList from './DataDump.js'

function AwarenessContent() {
  const getAwarenessCard = (awareness) => {
    return (
      <Grid item xs={12} md={4} lg={3} key={awareness.key}>
        <AwarenessCard {...awareness} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2} >
      {awarenessList.map((awareness) => getAwarenessCard(awareness))}
    </Grid>
  );
}

export default AwarenessContent;
