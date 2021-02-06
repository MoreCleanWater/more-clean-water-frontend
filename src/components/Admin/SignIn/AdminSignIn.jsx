import { useEffect, useState } from "react";
import formStyle from "styles/Form.module.scss";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { auth } from "database/firebase";
import AdminNav from "../AdminNav/AdminNav";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

export default function AdminSignIn() {
  const [adminId, setAdminId] = useState(localStorage.getItem('adminId'));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleLogin = () => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    auth.signOut();
    setAdminId('')
  };

  const handleListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
        localStorage.setItem('adminId', user.email);
      } else {
        setCurrentUser("")
        localStorage.removeItem('adminId');
      };
    });
  };

  useEffect(() => {
    handleListener();
  }, []);


  if (adminId) return <Redirect to="/admin/users"/>

  return (
    <div>
      <LinearProgress className={`linearProgress ${loading ? '' : 'hidden'}`}/>
      {currentUser ? (
        <AdminNav handleLogout={handleLogout} />
      ) : (
        <Grid justify="center" className={formStyle.container}>
          <Grid item xs={10} md={5} className={`${formStyle.content} `}>
            <h2 className={formStyle.title}>Sign in</h2>
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
      )}
    </div>
  );
}
