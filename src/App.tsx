import React, {useLayoutEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import UserProfile from "./pages/user/UserProfile";
import Main from "./pages/main/Main";
import {useAppDispatch} from "./hook/redux";
import {actionCheckAuthUser} from "./redux/user/userStore";
import Header from "./components/header/Header";
import {actionGetAllNews} from "./redux/news/newsStore";
import './index.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  useLayoutEffect(() => {
    (async () => {
      await dispatch(actionCheckAuthUser());
      if (location.pathname == '/') {
        await dispatch(actionGetAllNews());
      }
    })()
  }, [])
  console.log('App')

  return (
    <>
      <div className="container">
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/user" element={<UserProfile/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
