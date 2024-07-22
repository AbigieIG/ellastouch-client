import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Services from "./pages/Services";
import BoookClass from "./pages/BoookClass";
import Classes from "./pages/Classes";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Login from "./pages/Login";
import Nlogin from "./pages/Nlogin";
import Register from "./pages/Register";
import Nregister from "./pages/Nregister";
import SkipLogin from "./pages/SkipLogin";
import Confirmation from "./pages/Confirmation";
import EditService from "./pages/EditService";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import Details from "./pages/bookDetails";
import Edit from "./pages/Edit";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/Error";
import { ReactNode, useEffect } from "react";


const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const active = localStorage.getItem("booking");
  const navigate = useNavigate();

  useEffect(() => {
    if (!active) {
      navigate("/");
    }
  }, [active, navigate]);

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/book-appointment/:id", element: <Booking /> },
      { path: "/services", element: <Services /> },
      { path: "/classes", element: <Classes /> },
      { path: "/book-classes", element: <BoookClass /> },
      { path: "/about-us", element: <About /> },
      { path: "/gallery", element: <Gallery /> },
      {
        path: "/login",
        element: (
          <ProtectedRouter>
            <Login />
          </ProtectedRouter>
        ),
      },
      { path: "/user-login", element: <Nlogin /> },
      {
        path: "/create-profile",
        element: (
          <ProtectedRouter>
            <Register />{" "}
          </ProtectedRouter>
        ),
      },
      { path: "/register", element: <Nregister /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "/book-details", element: <Details /> },
      { path: "/edit-ser/:id", element: <EditService /> },
      { path: "/user-page", element: <UserPage /> },
      { path: "/edit-user", element: <Edit /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <ErrorPage/> },
      {
        path: "/skip-login",
        element: (
          <ProtectedRouter>
            {" "}
            <SkipLogin />
          </ProtectedRouter>
        ),
      },
      {
        path: "/confirm",
        element: (
          <ProtectedRouter>
            {" "}
            <Confirmation />{" "}
          </ProtectedRouter>
        ),
      },
    ],
  },
  {
    path: "/about",
    element: <div>hello about</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
