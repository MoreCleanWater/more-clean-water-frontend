import { useEffect, useState } from 'react'
import SamplePoints from './SamplePoints'
import { Backdrop, CircularProgress, LinearProgress } from '@material-ui/core';

function Map () {

const [samplePoint, setSamplePoint] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchLocations = async () => {
    setLoading(true);
    const res = await fetch(process.env.REACT_APP_SAMPLING_POINTS);
    const { items } = await res.json();
    setSamplePoint(items);
    setLoading(false);
  }
  fetchLocations();
}, []);
  
return (
    <div className='fullHeight'>
         {!loading ? (
            <SamplePoints samplePoint={samplePoint} />
          ) : (
            <Backdrop className='circularProgress' open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
          )}
    </div>
)
}

export default Map