import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../index.css'
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import {AboutUsScreen} from "./screen/AboutUsScreen.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element:  <App />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/about",
                element: <AboutUsScreen/>,
                errorElement: <ErrorPage/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
