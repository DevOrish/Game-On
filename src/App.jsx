import React from 'react';
import { NavBar } from './cmps/Nav-Bar'
import Router from './Router'
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router />
    </div>
  );
}

export default App;
