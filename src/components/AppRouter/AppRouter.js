import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import AccountPage from "../Pages/Account/AccountPage";
import DriverDetailsPage from "../Pages/DriverDetails/DriverDetailsPage";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/LoginPage";
import SignUpPage from "../Pages/SignUp/SignUpPage";


function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route
          index
          path="/"
          element={<SignUpPage/>
          }
        />
        <Route
          path="/login"
          element={<LoginPage/>
          }
        />
        <Route
          path="/home"
          element={<Home/>
          }
        />
        <Route
          path="/driverdetails"
          element={<DriverDetailsPage/>
          }
        />
        <Route
          path="/account"
          element={<AccountPage/>
          }
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppRouter;
