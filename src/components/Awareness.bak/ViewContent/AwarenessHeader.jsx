import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  typographyStyles: {
    flex: 1,
    fontFamily: "Raleway",
    color: "#288FEE;",
  },
  root: {
    backgroundColor: "#F8FAFC",
    justify: "center",
  },
});

function AwarenessHeader() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.typographyStyles}>
          Facts and statistics about water, toilets and hygiene
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AwarenessHeader;
