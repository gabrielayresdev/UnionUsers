import Home from "./Components/Home";
import SearchContextProvider from "./Contexts/SearchContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserPage from "./Components/UserPage";

function App() {
  return (
    <BrowserRouter>
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="usuario/:id" element={<UserPage />} />
        </Routes>
      </SearchContextProvider>
    </BrowserRouter>
  );
}

export default App;
