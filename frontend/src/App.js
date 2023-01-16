import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DataTableMay from "./components/DataTableMay";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/may" element={<DataTableMay />} />
      <Route path="/may/filter" element={<DataTableMay />} />
      <Route path="/may/sort" element={<DataTableMay />} />
    </Routes>
  );
}

export default App;
