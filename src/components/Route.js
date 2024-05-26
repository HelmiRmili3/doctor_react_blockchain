import React from "react";
import { Route, Routes } from "react-router-dom";
import { DoctorProvider } from "../contexts/doctor_context";
import DashboardPage from "../pages/doctor_page";
import LoginPage from "../pages/login_page";
import RequireAuth from "./require_auth";
import UserDashboard from "../pages/patient_page";
import { PatientProvider } from "../contexts/patient_context";

export default function RoutesComponent() {
  return (
    <>
      <Routes>
        <Route path="" element={<LoginPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route element={<RequireAuth/>}>
          <Route
            path="/patient"
            element={
              <PatientProvider>
                <UserDashboard/>
              </PatientProvider>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <DoctorProvider>
                <DashboardPage />
              </DoctorProvider>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}
