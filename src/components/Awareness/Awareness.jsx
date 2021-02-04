import cardStyle from "styles/Cards.module.scss";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import { database } from "database/firebase";
import axios from "axios";
import ViewContent from "./ViewContent";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { LinearProgress } from "@material-ui/core";

export default function AwarenessContent() {
  const [status, setStatus] = useState("idle");
  const [postedArticle, setPostedArticle] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStatus("loading");
    console.log("before load data");
    // to fetch list of contents
    database.on("value", (snapshot) => {
      setPostedArticle(snapshot.val());
    });

    // to fetch list of categories
    axios
      .get(process.env.REACT_APP_GET_CATEGORY_LIST_API)
      .then((response) => {
        // setData(postedArticle);
        setStatus("success");
      })
      .catch((error) => console.log(error));
    console.log("after load data");
  };

  return (
    <div>
		<LinearProgress className={`linearProgress ${status==='loading' ? '' : 'hidden'}`}/>
		{/* <Snackbar
			open={successMessage}
			autoHideDuration={4000}
			onClose={handleAlertClose}
		>
			<Alert onClose={handleAlertClose} severity="success">
			{alertMessage}
			</Alert>
		</Snackbar>
     */}

		<Grid container justify="center" className={cardStyle.container}>
			<Grid item xs={11} md={8}>
			 
				<ViewContent
					// style={{display: mode === 'retrieve' ? 'flex' : 'none'}} 
					postedArticle={postedArticle}
          isAdmin={false}
				>
				</ViewContent>
				
			</Grid>
		</Grid>
    </div>
  );
}
