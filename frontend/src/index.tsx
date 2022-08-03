import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Movies from './routes/Movies';
import Group from './routes/Group';
import Groups from './routes/Groups';
import Manage from "./routes/Manage";


// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="movies" element={<Movies />}></Route>
        <Route path="groups" element={<Groups />}></Route>
        <Route path="/groups/:groupid" element={<Group />}></Route>
        <Route path="/groups/:groupid/manage" element={<Manage />}></Route>

      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
