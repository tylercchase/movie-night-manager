import React from 'react';
import './App.css';

import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/groups">Groups</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
