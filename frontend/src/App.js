import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Generator from "./pages/Generator";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="flex items-center justify-center dark:bg-slate-700">
        <div className="container h-50 h-screen w-screen overflow-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generateImage" element={<Generator />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
