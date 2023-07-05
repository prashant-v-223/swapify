import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import { Toaster } from "react-hot-toast";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Main />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgot />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
