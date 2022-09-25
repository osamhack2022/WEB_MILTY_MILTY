import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import "./App.less";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/info" render={() => <Info userInfo={userInfo} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
