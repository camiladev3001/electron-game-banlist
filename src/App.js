import { HashRouter, Route, Routes } from "react-router-dom"
import { Home } from './Home'
import { BanUser } from './BanUser'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ban-user" element={<BanUser />} />
        <Route path="/check-bans" element={<h1>Check bans here... <a href="#">go back</a></h1>} />
        <Route
          path="about"
          element={
            <h1>
              about <a href="#">go back</a>
            </h1>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
