import React from 'react';
import './App.css';

import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/" className='link'>Home</Link>
        <Link to="/groups" className='link'>Groups</Link>
      </nav>
      <Outlet></Outlet>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover></ToastContainer>
    </div>
  );
}

export default App;
