import Home from "./Components/Home/Home";
import SearchContextProvider from "./Contexts/SearchContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserPage from "./Components/UserPage/UserPage";

import styles from "./App.module.sass";
import NotFound from "./Components/Errors/ErrorPage";
import ErrorPage from "./Components/Errors/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <SearchContextProvider>
        <div className={styles.app}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="usuario/:id" element={<UserPage />} />
            <Route path="*" element={<ErrorPage error={null} />} />
          </Routes>
        </div>
      </SearchContextProvider>
    </BrowserRouter>
  );
}

export default App;
