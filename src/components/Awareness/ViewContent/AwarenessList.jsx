import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import AwarenessHeader from "./AwarenessHeader";
import AwarenessContent from "./AwarenessContent";

const useStyles = makeStyles({
  root: { paddingTop: "76px" },
  orange: { backgroundColor: "orange", justify: "center" },
});

function AwarenessList() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} direction="column">
      <Grid item xs={12}>
        <AwarenessHeader />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <AwarenessContent />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}

export default AwarenessList;
