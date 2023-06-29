
import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './components/Home'
import BattleArenaPage from './components/BattleArenaPage';
import BattleTeamPage from './components/BattleTeamPage';
import TrophiesPage from './components/TrophiesPage';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { act } from 'react-dom/test-utils';

function App() {
  const [cohort, setCohort] = useState([])
  const [userList, setUserList] = useState([])
  const [activeUser, setActiveUser] = useState({})
  const [opponents, setOpponents] = useState([]);
  const handleLogInUser = (activeUser) => setActiveUser(activeUser)

  const handleUpdateActUser = (newUser) => {
    setActiveUser(newUser)
    setUserList(current=>[...current, newUser])
  }

  const handleTeamUpdate = (teamList) => {
    if (teamList.length < 3 || teamList.length > 3) alert('need 3 coders only')
    else if (activeUser.name) setActiveUser(current => ({ ...current, fighterList: teamList }))
    else alert('no one is signed in')
  }

  useEffect(() => {
    fetch("http://localhost:3000/fighters")
      .then(r => r.json())
      .then(coder => setCohort(coder))
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(r => r.json())
      .then(user => setUserList(user))
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/fighters")
      .then(r => r.json())
      .then(opponents => setOpponents(opponents))
  }, [])

  return (
    <div className="App">
      <h1>Title of Our App</h1>
      <Login userList={userList} handleLogInUser={handleLogInUser} activeUser={activeUser} />
      <Navbar />
      <Switch>
        <Route path="/teamPage">
          <BattleTeamPage
            cohort={cohort} activeUser={activeUser} handleUpdateActUser={handleUpdateActUser} handleTeamUpdate={handleTeamUpdate} />
        </Route>
        <Route path="/arena">
          <BattleArenaPage activeUser={activeUser} opponents={opponents}/>
        </Route>
        <Route path="/trophies">
          <TrophiesPage />
        </Route>
        <Route exact path="/">
          <Home cohort={cohort} activeUser={activeUser} opponents={opponents}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
