import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Updates from "./components/Updates/Updates";
import Map from "./components/WaterQuality/Map";
import Nav from "./components/Nav/Nav";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route path="/water-awareness">
            <Nav/>
            Water Awareness
          </Route>

          <Route path="/profile">
            <SignUp/>
          </Route>

          <Route path="/updates">
            <Nav/>
            <Updates />
          </Route>

          <Route path="/find-water">
            <Nav/>
            <Map />
          </Route>

          <Redirect to="/find-water" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
