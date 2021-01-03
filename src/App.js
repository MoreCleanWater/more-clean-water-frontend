import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import BottomMenu from "./components/BottomMenu/BottomMenu";
import BottomMenuItem from "./components/BottomMenu/BottomMenuItem/BottomMenuItem";
import Updates from "./components/Updates/Updates";
import Map from "./components/WaterQuality/Map";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <BottomMenu>
          <NavLink to="/water-awareness">
            <BottomMenuItem icon="info" title="Water Awareness" />
          </NavLink>

          <NavLink to="/find-water">
            <BottomMenuItem icon="room" title="Find Water" />
          </NavLink>

          <NavLink to="/updates">
            <BottomMenuItem icon="notifications" title="Updates" />
          </NavLink>
        </BottomMenu>

        <Switch>
          <Route path="/water-awareness">Water Awareness</Route>

          <Route path="/find-water">
            <Map />
          </Route>

          <Route path="/updates">
            <Updates />
          </Route>

          <Route path="/">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
