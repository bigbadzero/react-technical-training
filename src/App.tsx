import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Layout>
  );
}
export default App;
