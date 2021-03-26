import { Switch, Route, Redirect } from "react-router-dom"
import HomePage from "./components/pages/HomePage/HomePage"
import TextBookPage from "./components/pages/TextBookPage/TextBookPage"
import GamesPage from "./components/pages/GamesPage/GamesPage"
import StatisticsPage from "./components/pages/StatisticsPage/StatisticsPage"
import SignUp from "./components/Register/Register"
import SignIn from "./components/SignIn/SignIn"
import ResponsiveNavbar from "./components/Navbar/ResponsiveNavbar"
import Savanna from "./components/games/Savanna/Savanna"

function App() {
  return (
    <div className="App">
      <ResponsiveNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/textbook/" component={TextBookPage} />
        <Route exact path="/games/" component={GamesPage} />
        <Route exact path="/statistics/" component={StatisticsPage} />
        <Route exact path="/register/" component={SignUp} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/savanna" component={Savanna} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  )
}

export default App
