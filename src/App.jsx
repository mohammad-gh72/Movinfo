import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import RootPage from "./pages/RootPage";
import SearchResault from "./pages/SearchResault";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route index element={<RootPage />} />
          <Route path="search/:movieName/:page" element={<SearchResault />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
