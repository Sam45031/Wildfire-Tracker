import Map from './components/Map';
import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setloading(true);
      const res = await fetch(
        'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
      );
      const { events } = await res.json();

      setEventData(events);
      setloading(false);
    };

    fetchEvents();
    console.log(eventData);
  }, []);

  return (
    <div>
      <Header />
      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default App;

// index.css already has access to app.js by default.
