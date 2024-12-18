import { lazy } from 'react';
import { Route, Routes } from "react-router-dom"
import Callback from './Pages/login/Callback';
import ProfilePage from './Pages/Protected/Home/ProfilePage';
import PlaylistPage from './Pages/Protected/Home/PlaylistPage';
import MyTracks from './Pages/Protected/Home/MyTracks';
const LoginPage = lazy(() => import("./Pages/login/Login"));
const ProtectedRoutes = lazy(() => import("./Pages/ProtectedRoutes"));
const HomeIndex = lazy(() => import("./Pages/Protected/Home/HomeIndex"));

const App = () => {

  const routeList = [
    { path: '/home', element: <HomeIndex /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/myPlaylist', element: <PlaylistPage /> },
    { path: '/myTracks', element: <MyTracks /> },
  ]

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/callback' element={<Callback />} />
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