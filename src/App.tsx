import { lazy } from 'react';
import { Route, Routes } from "react-router-dom"
const LoginPage = lazy(() => import("./Pages/login/Login"));
const ProtectedRoutes = lazy(() => import("./Pages/ProtectedRoutes"));
const HomeIndex = lazy(() => import("./Pages/Protected/Home/HomeIndex"));

const App = () => {

  const routeList = [
    { path: '/home', element: <HomeIndex /> },
  ]

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route element={<ProtectedRoutes />} >
          {
            routeList.map((rt) => <Route key={rt.path} path={rt.path} element={rt.element} />)
          }
        </Route>
      </Routes>
    </>
  )
}

export default App