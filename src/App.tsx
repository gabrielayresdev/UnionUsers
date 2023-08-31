import Home from "./Components/Home";
import SearchContextProvider from "./Contexts/SearchContext";

function App() {
  return (
    <SearchContextProvider>
      <Home />
    </SearchContextProvider>
  );
}

export default App;
