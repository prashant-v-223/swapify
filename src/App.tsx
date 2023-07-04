import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import React from "react";
import Main from "./pages/Main";

const Root = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Main />} />
      <Route path="dashboard" element={<Home/>} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
