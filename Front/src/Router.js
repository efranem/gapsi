import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import App from "./pages/app/App";

function RouterFunction() {
  return (
    <HashRouter>
      <Routes>
        <Route index path="/" element={<Navigate replace to="home" />} />
        <Route path="proveedores" element={<App />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default RouterFunction;
