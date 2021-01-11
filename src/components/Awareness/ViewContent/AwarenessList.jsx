import React from "react";
import Grid from "@material-ui/core/Grid";
import AwarenessHeader from "./AwarenessHeader";
import AwarenessContent from "./AwarenessContent";

function AwarenessList() {
  return (
    <Grid container style={{ paddingTop: "76px" }} direction="column">
      <Grid item xs={12}>
        <AwarenessHeader />
      </Grid>
      <div style={{ paddingTop: "10px" }}></div>
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          <AwarenessContent />
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AwarenessList;
