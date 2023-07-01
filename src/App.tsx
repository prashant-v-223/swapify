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
      <Route index element={<Home />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
