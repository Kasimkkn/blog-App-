import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
import './App.scss';
import Home from "./pages/Home";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ()=>{
  return (
    <>
     <Header/>
     <Outlet/>
     <Footer/>
  </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:
    [
      {
        path:"/",
      element:<Home/>
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;

