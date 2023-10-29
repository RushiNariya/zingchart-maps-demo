// import './App.css';
// import MapOne from './components/MapOne';
// import MapThree from './components/MapThree';
// import MapTwo from './components/MapTwo';
// import ZingChart from 'zingchart-react';
import NewYork from './components/NewYork';
import Zingchart from './components/Zinchart';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* <MapOne /> */}
      {/* <MapTwo /> */}
      {/* <MapThree /> */}
      <Zingchart />
      {/* <NewYork /> */}
    </div>
  );
}

export default App;
