import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./components/SignUp/SignUp";
import Updates from "./components/Updates/Updates";
import Admin from "./components/Admin/Admin";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminNav from "./components/Admin/AdminNav/AdminNav";
import Profile from "./components/Profile/Profile";
import Map from "./components/WaterQuality/Map";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import AwarenessList from "./components/Awareness/ViewContent/AwarenessList";
import AwarenessCategory from "./components/Admin/Awareness/AwarenessCategory/AwarenessCategory";
import AwarenessAddContent from "./components/Admin/Awareness/AwarenessContent/AwarenessAddContent";
import CountyList from "./components/CountyList";
import axios from 'axios';
import "./App.scss";

function App() {
  const [form, setForm] = useState({
    userid: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    county: "",
    postcode: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const [isDataLoaded, setDataLoaded] = useState('idle');

  useEffect(() => {
    setDataLoaded('loading');
    axios
    .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list')
    .then(response => {
      CountyList.data = response.data;
      if (isDataLoaded==='loaded') {
        Object.freeze(CountyList)
        setDataLoaded('loaded');
      }
    })
    .catch(error => console.log(error))
  }, [isDataLoaded]);
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/awareness">
            <Nav />
            <AwarenessList />
          </Route>

          <Route exact path="/signup">
            <SignUp form={form} setForm={setForm} onChange={handleChange} />
          </Route>

          <Route exact path="/profile">
            <Nav />
            <Profile form={form} setForm={setForm} onChange={handleChange} />
          </Route>

          <Route exact path="/updates">
            <Nav />
            <Updates />
          </Route>

          <Route exact path="/find-water">
            <Nav />
            <Map />
          </Route>

          <Route exact path="/admin/awareness">
            <AdminNav />
            <AwarenessList />
          </Route>

          <Route exact path="/admin/awareness-category">
            <AdminNav />
            <AwarenessCategory />
          </Route>

          <Route exact path="/admin/awareness-content">
            <AdminNav />
            <AwarenessAddContent />
          </Route>

          <Route exact path="/admin/users">
            <AdminNav />
            <AdminUsers />
          </Route>

          <Route exact path="/admin">
            <AdminNav />
            <Admin />
          </Route>

          <Route exact path="/">
            <LandingPage
              form={form}
              setForm={setForm}
              onChange={handleChange}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
