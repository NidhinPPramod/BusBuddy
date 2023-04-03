import React from "react";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import AccountPage from "../Pages/Account/AccountPage";
import HomePage from "../Pages/Home/HomePage";
import LocationPage from "../Pages/Location/LocationPage";
import LoginPage from "../Pages/Login/LoginPage";
import SignUpPage from "../Pages/SignUp/SignUpPage";
import EditPage from "../Pages/Edit/EditPage";


function AppRouter() {

  const {currentUser}=useAuth()
  
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<SignUpPage />} />
          {/** PROTECTED ROUTES*/}
          <Route path="/home" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
