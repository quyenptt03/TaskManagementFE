import React from "react";
import { Routes, Route } from "react-router";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  Dashboard,
  TaskPage,
} from "./pages";
import { ProtectedRoute } from "./components";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
