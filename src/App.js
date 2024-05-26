import React, { } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesComponent from "./components/Route";
export default function App() {
    return (
    <BrowserRouter>
      <RoutesComponent/>
    </BrowserRouter>
  );
}
