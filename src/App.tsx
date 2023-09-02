import Home from "./Components/Home";
import SearchContextProvider from "./Contexts/SearchContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserPage from "./Components/UserPage/UserPage";

import styles from "./App.module.sass";

function App() {
  return (
    <BrowserRouter>
      <SearchContextProvider>
        <div className={styles.app}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="usuario/:id" element={<UserPage />} />
          </Routes>
        </div>
      </SearchContextProvider>
    </BrowserRouter>
  );
}

export default App;
