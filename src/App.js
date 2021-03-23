import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import TextBookPage from "./components/pages/TextBookPage/TextBookPage";
import GamesPage from "./components/pages/GamesPage/GamesPage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";
import StatisticsPage from "./components/pages/StatisticsPage/StatisticsPage";
import IndexNavbar from "./components/Navbar/IndexNavbar";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <IndexNavbar />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/textbook/" component={TextBookPage} />
        <Route exact path="/games/" component={GamesPage} />
        <Route exact path="/Settings/" component={SettingsPage} />
        <Route exact path="/statistics/" component={StatisticsPage} />
        <Route exact path="/register/" component={SignUp} />
        <Route exact path="/signin/" component={SignIn} />
        <Redirect from="*" to="/" />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
