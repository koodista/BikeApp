import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
//import DataTableMay from "./components/DataTableMay";
import ReactTableMay from "./components/ReactTableMay";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/may" element={<ReactTableMay />} />
      <Route path="/may/filter" element={<ReactTableMay />} />
      <Route path="/may/sort" element={<ReactTableMay />} />
    </Routes>
  );
}

export default App;
