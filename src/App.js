import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./components/SignIn/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Updates from "./components/Updates/Updates";
import Admin from "./components/Admin/Admin";
import AdminUsers from "./components/Admin/Users/Users";
import AdminWaterStations from "./components/Admin/WaterStations/WaterStations";
import AdminNav from "./components/Admin/AdminNav/AdminNav";
import Profile from "./components/Profile/Profile";
import Map from "./components/WaterQuality/Map";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import AwarenessList from "./components/Awareness/ViewContent/AwarenessList";
import AwarenessCategory from "./components/Admin/Awareness/AwarenessCategory/AwarenessCategory";
import AwarenessContent from "./components/Admin/Awareness/AwarenessContent/AwarenessContent";
import axios from "axios";
import "./App.scss";

function App() {
  const [countyData, setCountyData] = useState();

  useEffect(() => {
    axios
      .get(
        "https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list"
      )
      .then((response) => {
        if (response.data)
          response.data.sort((a, b) => (a.county > b.county ? 1 : -1));
        setCountyData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/awareness">
            <Nav />
            <AwarenessList />
          </Route>

          <Route exact path="/signup">
            <SignUp countyData={countyData} />
          </Route>

          <Route exact path="/signin">
            <SignIn />
          </Route>

          <Route exact path="/profile">
            <Nav />
            <Profile countyData={countyData} />
          </Route>

          <Route exact path="/updates">
            <Nav />
            <Updates />
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

          <Route exact path="/admin">
            <AdminNav />
            <Admin />
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
