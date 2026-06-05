import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Guide from './pages/Guide';
import GuideDetail from './pages/GuideDetail';
import Map from './pages/Map';
import Community from './pages/Community';
import Estimate from './pages/Estimate';
import Truck from './pages/Truck';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:itemName" element={<GuideDetail />} />
        <Route path="/map" element={<Map />} />
        <Route path="/community" element={<Community />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/truck" element={<Truck />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
