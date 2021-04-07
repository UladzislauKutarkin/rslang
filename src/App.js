import { Switch, Route, Redirect } from "react-router-dom"
import HomePage from "./components/pages/HomePage/HomePage"
import TextBookPage from "./components/pages/TextBookPage/TextBookPage"
import GamesPage from "./components/pages/GamesPage/GamesPage"
import StatisticsPage from "./components/pages/StatisticsPage/StatisticsPage"
import SignUp from "./components/Register/Register"
import SignIn from "./components/SignIn/SignIn"
import ResponsiveNavbar from "./components/Navbar/ResponsiveNavbar"
import Savanna from "./components/games/Savanna/Savanna"
import AudioCall from "./components/games/AudioCall/AudioCall"
import Sprint from "./components/games/Sprint/Sprint"

import WordBook from "./components/pages/TextBookPage/Vocabulary/WordBook/WordBook"
import Vocabulary from "./components/pages/TextBookPage/Vocabulary/Vocabulary"
import StudiedWords from "./components/pages/TextBookPage/Vocabulary/StudiedWords/StudiedWords"
import DeletedWords from "./components/pages/TextBookPage/Vocabulary/DeletedWords/DeletedWords"

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
        <Route exact path="/savanna/:page/:group/:page" component={Savanna} />
        <Route path="/audiocall" component={AudioCall} />
        <Route path="/sprint" component={Sprint} />
        <Route exact path="/vocabulary/" component={Vocabulary} />
        <Route exact path="/wordbook/" component={WordBook} />
        <Route exact path="/studied/" component={StudiedWords} />
        <Route exact path="/deleted/" component={DeletedWords} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  )
}

export default App
