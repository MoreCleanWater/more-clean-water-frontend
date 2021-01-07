import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useState} from 'react';
import SignUp from "./components/SignUp/SignUp";
import Updates from "./components/Updates/Updates";
import Profile from "./components/Profile/Profile";
import Map from "./components/WaterQuality/Map";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.scss";
import { Grid } from "@material-ui/core";

function App() {
  const [form, setForm]  = useState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      county: '',
      postcode: ''
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
    console.log(form)
  }


  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route path="/water-awareness">
            <Nav/>  
            <Grid container alignItems="center" justify="center" className="full-height">
              Water Awareness
            </Grid>
          </Route>

          <Route path="/dashboard">
            <Nav/>  
            <Grid container alignItems="center" justify="center" className="full-height">
              Dashboard
            </Grid>
          </Route>

          <Route path="/signup">
            <SignUp form={form} setForm={setForm} onChange={handleChange}/>
          </Route>

          <Route path="/profile">
            <Nav/>  
            <Profile form={form} setForm={setForm} onChange={handleChange}/>
          </Route>

          <Route path="/updates">
            <Nav/>
            <Updates />
          </Route>

          <Route path="/find-water">
            <Nav/>
            <Map />
          </Route>

          <Route path="/">
            <LandingPage form={form} setForm={setForm} onChange={handleChange}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
