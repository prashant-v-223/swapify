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
import {
  ProtectedAuthPages,
  ProtectedPages,
} from "./components/ProtectedPages";
import { fetchAndStoreUserInfo } from "./store";
import FaqPage from "./pages/Faq";
import { useEffect } from "react";
import Aos from "aos";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RiskDisclaimer from "./pages/RiskDisclaimer";
import ContactUsPage from "./components/Contact";
const queryClient = new QueryClient();
const Root = () => {
  useEffect(() => {
    Aos.init();
  }, []);
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
      <Route element={<ProtectedAuthPages />}>
        <Route index element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>
      <Route element={<ProtectedPages />}>
        <Route
          loader={async () => {
            fetchAndStoreUserInfo();
            return null;
          }}
          path="/dashboard"
          element={<Home />}
        />
      </Route>
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/risk" element={<RiskDisclaimer />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<ContactUsPage />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
