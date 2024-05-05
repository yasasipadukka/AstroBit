import { BrowserRouter, Routes, Route } from "react-router-dom";
import Astropod from "./pages/Astropod";
import Marsrover from "./pages/Marsrover";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Earth from "./pages/Earth";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/APOD" element={<Astropod />} />
        <Route path="/Marsrover" element={<Marsrover />} />
        <Route path="/Earth" element={<Earth />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
