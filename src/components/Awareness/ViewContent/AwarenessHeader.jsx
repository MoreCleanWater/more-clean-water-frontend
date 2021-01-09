import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  typographyStyles: {
    flex: 1,
  },
});

function AwarenessHeader() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.typographyStyles}>
          Facts and statistics about water, toilets and hygiene
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AwarenessHeader;
