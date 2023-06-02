import React, { useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import {Create, Home} from './pages'
import {Navbar, Sidebar} from './components'

const Layout = () => {
  const [shown, setShown] = useState(false)

  return (
  <main className={`flex overflow-hidden w-full`}>
    <Sidebar shown={shown}/>
    <div className="flex flex-col w-full lg:pl-16 xl:pl-0">
      <Navbar shown={shown} setShown={setShown}/>
      <Outlet />
    </div>
  </main>
)}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/create",
        element: <Create />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
