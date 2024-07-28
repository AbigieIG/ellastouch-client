import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import BookForm from "./pages/BookForm";
import Confirmation from "./pages/Confirmation";
import EditService from "./pages/EditService";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import Details from "./pages/bookDetails";
import Edit from "./pages/Edit";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/Error";
import User from "./pages/User";
import TrackBooking from "./pages/TrackBooking";
import {
  AdminRouter,
  UserRouther,
  ProtectedRouter,
  LoginRouther,
} from "./utils/protect";

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
      { path: "/track-booking", element: <TrackBooking /> },
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
      {
        path: "/user-login",
        element: (
          <LoginRouther>
            <Nlogin />
          </LoginRouther>
        ),
      },
      {
        path: "/create-profile",
        element: (
          <ProtectedRouter>
            <Register />{" "}
          </ProtectedRouter>
        ),
      },
      { path: "/register", element: <Nregister /> },
      {
        path: "/admin",
        element: (
          <AdminRouter >
            <AdminPage />{" "}
          </AdminRouter>
        ),
      },
      {
        path: "/bookings/:id",
        element: (
          <UserRouther>
            <Details />
          </UserRouther>
        ),
      },
      {
        path: "/edit-ser/:id",
        element: (
          <AdminRouter>
            <EditService />{" "}
          </AdminRouter>
        ),
      },
      {
        path: "/user-page",
        element: (
          <UserRouther>
            {" "}
            <UserPage />{" "}
          </UserRouther>
        ),
      },
      {
        path: "/user/:id",
        element: (
          <AdminRouter>
            {" "}
            <User />{" "}
          </AdminRouter>
        ),
      },
      {
        path: "/edit-user",
        element: (
          <UserRouther>
            {" "}
            <Edit />{" "}
          </UserRouther>
        ),
      },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <ErrorPage /> },
      {
        path: "/book-form",
        element: (
          <ProtectedRouter>
            {" "}
            <BookForm />
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
