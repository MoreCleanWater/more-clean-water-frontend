import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./components/SignIn/SignUp";
import SignIn from "./components/SignIn/SignIn";
import UpdatesList from "./components/Updates/Updates";
import AdminUsers from "./components/Admin/Users/Users";
import AdminWaterStations from "./components/Admin/WaterStations/WaterStations";
import AdminNav from "./components/Admin/AdminNav/AdminNav";
import Profile from "./components/Profile/Profile";
import Map from "./components/WaterQuality/Map";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import Awareness from "components/Awareness/Awareness";
import AwarenessCategory from "./components/Admin/Awareness/AwarenessCategory/AwarenessCategory";
import AwarenessContent from "./components/Admin/Awareness/AwarenessContent/AwarenessContent";
import axios from "axios";
import "./App.scss";
import Events from "./components/Admin/Events/Events";
import AdminSignIn from "./components/Admin/SignIn/AdminSignIn";

function App() {

  const [countyData, setCountyData] = useState(JSON.parse(localStorage.getItem('countyList')));

  useEffect(() => {
    // console.log(countyData)
    if (countyData) return;
    axios
      .get("https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list")
      .then((response) => {
        if (response.data) {
          response.data.sort((a, b) => (a.county > b.county ? 1 : -1));
          localStorage.setItem('countyList', JSON.stringify(response.data));
          // console.log(response.data)
          setCountyData(JSON.parse(localStorage.getItem('countyList')));
        }
          
      })
      .catch((error) => console.log(error));
  }, [countyData]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/awareness">
            <Nav />
            <Awareness />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/signin">
            <SignIn />
          </Route>

          <Route exact path="/profile">
            <Nav />
            <Profile />
          </Route>

          <Route exact path="/alerts">
            <Nav />
            <UpdatesList />
          </Route>

          <Route exact path="/find-water">
            <Nav />
            <Map />
          </Route>

          <Route exact path="/admin/awareness-category">
            <AdminNav />
            <AwarenessCategory />
          </Route>

          <Route exact path="/admin/awareness-content">
            <AdminNav />
            <AwarenessContent />
          </Route>

          <Route exact path="/admin/users">
            <AdminNav />
            <AdminUsers />
          </Route>

          <Route exact path="/admin/water-stations">
            <AdminNav />
            <AdminWaterStations />
          </Route>

          <Route exact path="/admin/events">
            <AdminNav />
            <Events />
          </Route>

          <Route exact path="/admin">
            <AdminSignIn />
          </Route>

          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
