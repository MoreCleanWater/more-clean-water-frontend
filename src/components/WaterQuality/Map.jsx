import { useEffect, useState } from "react";
import SamplePoints from "./SamplePoints";
import { Backdrop, CircularProgress } from "@material-ui/core";
import axios from "axios";
import "styles/Map.scss";

function Map() {
  const [shortages, setShortages] = useState([]);
  const [unsafe, setUnsafe] = useState([]);
  const [workingStations, setWorkingStations] = useState([]);
  const [notWorkingStations, setNotWorkingStations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .all([
        axios.get(
          "https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/list"
        ),
        axios.get(
          "https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/shortage/list"
        ),
        axios.get(
          "https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/dirty/list"
        ),
      ])
      .then(
        axios.spread((stationsList, shortagesList, unsafeList) => {
          setWorkingStations(
            stationsList.data.filter((data) => data.isWorking === true)
          );
          setNotWorkingStations(
            stationsList.data.filter((data) => data.isWorking === false)
          );
          setShortages(shortagesList.data);
          setUnsafe(unsafeList.data);
          setLoading(false);
        })
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="fullHeight">
      {!loading ? (
        <SamplePoints
          shortages={shortages}
          workingStations={workingStations}
          notWorkingStations={notWorkingStations}
          unsafe={unsafe}
        />
      ) : (
        <Backdrop className="circularProgress" open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default Map;
