import React from "react";
import { Routes, Route } from "react-router";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  Dashboard,
  TaskPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<TaskPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
