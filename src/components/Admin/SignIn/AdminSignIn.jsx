import { useEffect, useState } from "react";
import formStyle from "styles/Form.module.scss";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { auth } from "database/firebase";
import AdminNav from "../AdminNav/AdminNav";
import { Redirect } from "react-router-dom";
import { LinearProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(false);

  const handleLogin = () => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        setError(true);
        // console.log(err)
      });
  };

  const handleListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('adminId', user.email);
        setCurrentUser(user);
        setLoading(false);
        setError(false);
      } else {
        setCurrentUser("")
        localStorage.removeItem('adminId');
      };
    });
  };

  useEffect(() => {
    handleListener();
  }, []);

  const handleCloseSnackBar = (event, reason) => {
      if (reason === 'clickaway') return;
      setError(false);
  };


  if (currentUser) return <Redirect to="/admin/users"/>

  
  return (
    <div>
      <Snackbar
          open={error}
          autoHideDuration={2000}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          onClose={handleCloseSnackBar}
      >
          <Alert severity="error" >
              Wrong email/password
          </Alert>
      </Snackbar>
      <LinearProgress className={`linearProgress ${loading ? '' : 'hidden'}`}/>
     
        <Grid justify="center" className={formStyle.container}>
          <Grid item xs={10} md={5} className={`${formStyle.content} `}>
            <h2 className={formStyle.title}>Admin console</h2>
            <form className={formStyle.signInForm}>
              <TextField
                required
                type="email"
                value={email}
                className={`${formStyle.formInput}`}
                variant="outlined"
                id="standard-basic-email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className={`${formStyle.formInput}`}
                required
                variant="outlined"
                type="password"
                value={password}
                id="standard-basic-password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className={formStyle.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={handleLogin}
                  disabled={loading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
    </div>
  );
}
