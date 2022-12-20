import React from "react";
import ReactDOM from "react-dom/client";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./styles/index.css";
import RouterFunction from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterFunction />
  </React.StrictMode>
);
