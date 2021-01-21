import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
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
import "./App.scss";
import AwarenessAddContent from "./components/Admin/Awareness/AwarenessContent/AwarenessAddContent";

function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    county: "",
    postcode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/awareness">
            <Nav />
            <AwarenessList />
          </Route>

          <Route path="/signup">
            <SignUp form={form} setForm={setForm} onChange={handleChange} />
          </Route>

          <Route path="/profile">
            <Nav />
            <Profile form={form} setForm={setForm} onChange={handleChange} />
          </Route>

          <Route path="/updates">
            <Nav />
            <Updates />
          </Route>

          <Route path="/find-water">
            <Nav />
            <Map />
          </Route>

          <Route path="/admin/awareness">
            <AdminNav />
            <AwarenessList />
          </Route>

          <Route path="/admin/awareness-category">
            <AdminNav />
            <AwarenessCategory />
          </Route>

          <Route path="/admin/awareness-content">
            <AdminNav />
            <AwarenessAddContent />
          </Route>

          <Route path="/admin/users">
            <AdminNav />
            <AdminUsers />
          </Route>

          <Route path="/admin">
            <AdminNav />
            <Admin />
          </Route>

          <Route path="/">
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
