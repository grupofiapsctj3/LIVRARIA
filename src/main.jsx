import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Livros from './pages/Livros/Livros.jsx';
import Error from './pages/Error/Error.jsx';

/* exemplo de código não dinamico
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
   
  }
])
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Livros",
        element: <Livros />,}
    ]
   
  }
])

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )