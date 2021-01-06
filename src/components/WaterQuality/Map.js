import { useEffect, useState } from "react";
import SamplePoints from "./SamplePoints";
import Loader from "./LocationMarker/Loader";

function Map() {
  const [samplePoint, setSamplePoint] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_SAMPLING_POINTS);
      const { items } = await res.json();
      setSamplePoint(items);
      setLoading(false);
    };
    fetchLocations();
  }, []);

  return (
    <div>
      {!loading ? <SamplePoints samplePoint={samplePoint} /> : <Loader />}
    </div>
  );
}

export default Map;
