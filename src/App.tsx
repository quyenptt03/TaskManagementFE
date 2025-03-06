import React from 'react';
import {Routes, Route} from "react-router";
import {HomePage, LoginPage, RegisterPage} from "./pages"

function App() {
  return (
    <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
  );
}

export default App;
