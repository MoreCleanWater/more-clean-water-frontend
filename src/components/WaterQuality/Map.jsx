import { useEffect, useState } from "react";
import SamplePoints from "./SamplePoints";
import { Backdrop, CircularProgress } from "@material-ui/core";
import axios from "axios";

function Map() {
  // const [samplePoint, setSamplePoint] = useState([]);
  const [shortages, setShortages] = useState([]);
  const [unsafe, setUnsafe] = useState([]);
  const [workingStations, setWorkingStations] = useState([]);
  const [notWorkingStations, setNotWorkingStations] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     setLoading(true);
  //     const res = await fetch(process.env.REACT_APP_SAMPLING_POINTS);
  //     const { items } = await res.json();
  //     setSamplePoint(items);
  //     setLoading(false);
  //   };
  //   fetchLocations();
  // }, []);

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
          // console.log(stationsList);
          setWorkingStations(
            stationsList.data.filter((data) => data.isWorking === true)
          );
          setNotWorkingStations(
            stationsList.data.filter((data) => data.isWorking === false)
          );
          // console.log("workingStations " + workingStations);
          setShortages(shortagesList.data);
          setUnsafe(unsafeList.data);
          // console.log("Shortages list count " + shortages.length);
          // console.log("unsafe list count " + unsafe.length);
          // console.log("unsafe list count " + unsafe.length);
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
